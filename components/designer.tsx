'use client';

import { DragEndEvent, useDndMonitor, useDroppable } from '@dnd-kit/core';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { idGenerator } from '@/lib/idGenerator';
import { Sidebar } from '@/components/sidebar';
import { ElementsType, FormElements } from '@/components/form-elements';
import { DesignerElementWrapper } from '@/components/designer-element-wrapper';

export const Designer = () => {
	const {
		elements,
		addElement,
		selectedElement,
		setSelectedElement,
		removeElement,
	} = useDesigner();

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

			const isDropedOverDesignerDropArea =
				over.data?.current?.isDesignerDropArea;

			//? first condition of dropping elements in DesignerComponent
			if (isDesignerButton && isDropedOverDesignerDropArea) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(
					idGenerator(),
				);
				addElement(0, newElement);
				return;
			}

			const isDropedOverDesignerElementTopHalf =
				over.data?.current?.isTopHalfOfElement;
			const isDropedOverDesignerElementBottomHalf =
				over.data?.current?.isBottomHalfOfElement;

			const isDropedOverDesignerElement =
				isDropedOverDesignerElementTopHalf ||
				isDropedOverDesignerElementBottomHalf;

			//? second condition of dropping elements in DesignerComponent
			if (isDesignerButton && isDropedOverDesignerElement) {
				const type = active.data?.current?.type;
				const newElement = FormElements[type as ElementsType].construct(
					idGenerator(),
				);

				const overId = over.data?.current?.elementId;

				const overElementIndex = elements.findIndex(el => el.id === overId);
				if (overElementIndex === -1) {
					throw new Error('Element not found');
				}

				let indexForNewElement = overElementIndex;
				if (isDropedOverDesignerElementBottomHalf) {
					indexForNewElement = overElementIndex + 1;
				}

				addElement(indexForNewElement, newElement);
				return;
			}

			//? third condition of dropping elements in DesignerComponent
			const isDraggingElement = active.data?.current?.isDesignerElement;

			if (isDraggingElement && isDropedOverDesignerElement) {
				const activeId = active.data?.current?.elementId;
				const overId = over.data?.current?.elementId;

				const activeElementIndex = elements.findIndex(el => el.id == activeId);
				const overElementIndex = elements.findIndex(el => el.id == overId);

				if (activeElementIndex === -1 || overElementIndex == -1) {
					throw new Error('element not found');
				}

				const activeElement = { ...elements[activeElementIndex] };
				removeElement(activeId);

				let indexForNewElement = overElementIndex;
				if (isDropedOverDesignerElementBottomHalf) {
					indexForNewElement = overElementIndex + 1;
				}

				addElement(indexForNewElement, activeElement);
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
				className="w-full p-1 sm:p-4"
			>
				<div
					ref={droppable.setNodeRef}
					className={cn(
						'h-full max-w-[920px] m-auto flex flex-col flex-grow flex-1 items-center justify-start rounded-xl bg-background overflow-y-auto',
						droppable.isOver && 'ring-2 ring-primary ring-inset',
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
						<div className="w-full flex flex-col gap-2 p-2 sm:p-4">
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
