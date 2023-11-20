'use client';

import { MdPreview } from 'react-icons/md';
import { HiSaveAs } from 'react-icons/hi';
import { MdOutlinePublic } from 'react-icons/md';
import { DndContext } from '@dnd-kit/core';

import { Form } from '@prisma/client';
import { ActionButton } from '@/components/action-button';
import { Designer } from '@/components/designer';

export const FormBuilder = ({ form }: { form: Form }) => {
	return (
		<DndContext>
			<main className="w-full flex flex-col">
				<nav className="flex items-center justify-between gap-3 border-b-2 p-4">
					<h2 className="truncate font-medium">
						<span className="text-muted-foreground">Form: </span>
						{form.name}
					</h2>
					<div className="flex items-center gap-2">
						<ActionButton
							tag="Preview"
							icon={<MdPreview className="w-6 h-6" />}
							className="gap-2"
						/>
						{!form.published && (
							<>
								<ActionButton
									tag="Save"
									icon={<HiSaveAs className="w-4 h-4" />}
									className="gap-2"
								/>
								<ActionButton
									tag="Publish"
									icon={<MdOutlinePublic className="w-4 h-4" />}
									className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400"
								/>
							</>
						)}
					</div>
				</nav>
				<div className="w-full h-[200px] flex flex-grow items-center justify-center relative overflow-y-auto bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
					<Designer />
				</div>
			</main>
		</DndContext>
	);
};
