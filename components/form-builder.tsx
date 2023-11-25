'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ImSpinner } from 'react-icons/im';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import Confetti from 'react-confetti';
import {
	DndContext,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { Form } from '@prisma/client';

import { useDesigner } from '@/hooks/useDesigner';
import { Designer } from '@/components/designer';
import { PreviewButton } from '@/components/preview-button';
import { SaveButton } from '@/components/save-button';
import { PublishButton } from '@/components/publish-button';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import DragOverlayProvider from '@/providers/drag-overlay-provider';

export const FormBuilder = ({ form }: { form: Form }) => {
	const { setElements, setSelectedElement } = useDesigner();
	const [isReady, setIsReady] = useState(false);

	const mouseSensor = useSensor(MouseSensor, {
		activationConstraint: {
			distance: 10,
		},
	});
	const touchSensor = useSensor(TouchSensor, {
		activationConstraint: {
			delay: 300,
			tolerance: 5,
		},
	});

	const sensors = useSensors(mouseSensor, touchSensor);

	useEffect(() => {
		if (isReady) {
			return;
		}

		const elements = JSON.parse(form.content);

		setSelectedElement(null);
		setElements(elements);
		const readyTimeout = setTimeout(() => setIsReady(true), 500);

		return () => clearTimeout(readyTimeout);
	}, [form, setElements, setSelectedElement]);

	if (!isReady) {
		return (
			<div className="w-full h-full flex flex-col items-center justify-center">
				<ImSpinner className="w-12 h-12 animate-spin" />
			</div>
		);
	}

	const shareUrl = `${window.location.origin}/submit/${form.shareURL}`;

	if (form.published) {
		return (
			<>
				<Confetti
					width={window.innerWidth}
					height={window.innerHeight}
					recycle={false}
					numberOfPieces={1000}
				/>
				<div className="w-full h-full flex flex-col items-center justify-center">
					<div className="max-w-lg">
						<h1 className="text-center font-bold text-4xl text-primary border-b pb-2 mb-10">
							🎊🎉 Form Published 🎉🎊
						</h1>
						<h2 className="text-2xl">Share this form</h2>
						<h3 className="text-xl text-muted-foreground border-b pb-10">
							Anyone with the link can view and submit the form
						</h3>
						<div className="w-full flex flex-col items-center gap-2 border-b pb-4 my-4">
							<Input className="w-full" readOnly value={shareUrl} />
							<Button
								onClick={() => {
									navigator.clipboard.writeText(shareUrl);
									toast({
										title: 'Copied!',
										description: 'Link copied to clipboard',
									});
								}}
								className="w-full mt-2"
							>
								Copy link
							</Button>
						</div>
						<div className="flex justify-between">
							<Button variant="link" asChild>
								<Link href="/" className="gap-2">
									<BsArrowLeft />
									Go back home
								</Link>
							</Button>
							<Button variant="link" asChild>
								<Link href={`/forms/${form.id}`} className="gap-2">
									Form details
									<BsArrowRight />
								</Link>
							</Button>
						</div>
					</div>
				</div>
			</>
		);
	}

	return (
		<DndContext sensors={sensors}>
			<main className="w-full flex flex-col">
				<nav className="flex flex-col items-center justify-between gap-3 border-b-2 p-4 sm:flex-row">
					<h2 className="truncate font-medium">
						<span className="text-muted-foreground">Form: </span>
						{form.name}
					</h2>
					<div className="flex items-center gap-2">
						<PreviewButton />
						{!form.published && (
							<>
								<SaveButton formId={form.id} />
								<PublishButton formId={form.id} />
							</>
						)}
					</div>
				</nav>
				<div className="w-full h-[200px] flex flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
					<Designer />
				</div>
			</main>
			<DragOverlayProvider />
		</DndContext>
	);
};
