'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { idGenerator } from '@/lib/idGenerator';
import { Sidebar } from '@/components/sidebar';
import { ElementsType, FormElements } from '@/components/form-elements';
import { DesignerElementWrapper } from '@/components/designer-element-wrapper';

export const Designer = () => {
	const { elements, addElement, selectedElement, setSelectedElement } =
		useDesigner();

	const droppable = useDroppable({
		id: 'designer-drop-area',
		data: {
			isDesignerDropArea: true,
		},
	});

	useDndMonitor({
		onDragEnd: (event: DragEndEvent) => {
			const { active, over } = event;

			if (!active || !over) {
				return;
			}

			const isDesignerButton = active.data?.current?.isDesignerButton;

			if (isDesignerButton) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(
					idGenerator(),
				);
				addElement(0, newElement);
			}
		},
	});

	return (
		<div className="w-full h-full flex">
			<div
				onClick={() => {
					if (selectedElement) {
						setSelectedElement(null);
					}
				}}
				className="w-full p-4"
			>
				<div
					ref={droppable.setNodeRef}
					className={cn(
						'h-full max-w-[920px] m-auto flex flex-col flex-grow flex-1 items-center justify-start bg-background overflow-y-auto',
						droppable.isOver && 'ring-2 ring-primary/20',
					)}
				>
					{!droppable.isOver && elements.length === 0 && (
						<p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
							Drop here
						</p>
					)}
					{droppable.isOver && elements.length === 0 && (
						<div className="w-full p-4">
							<div className="h-[120px] rounded-md bg-primary/20"></div>
						</div>
					)}
					{elements.length > 0 && (
						<div className="w-full flex flex-col gap-2 p-4">
							{elements.map(element => (
								<DesignerElementWrapper key={element.id} element={element} />
							))}
						</div>
					)}
				</div>
			</div>
			<Sidebar />
		</div>
	);
};
