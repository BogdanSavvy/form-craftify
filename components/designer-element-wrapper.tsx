import { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { BiSolidTrash } from 'react-icons/bi';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { FormElements, FormElementsInstance } from '@/components/form-elements';
import { Button } from '@/components/ui/button';

export const DesignerElementWrapper = ({
	element,
}: {
	element: FormElementsInstance;
}) => {
	const [isMouseOver, setIsMouseOver] = useState<boolean>(false);

	const topHalf = useDroppable({
		id: element.id + '-top',
		data: {
			type: element.type,
			elementId: element.id,
			isTopHalfOfElement: true,
		},
	});

	const bottomHalf = useDroppable({
		id: element.id + '-bottom',
		data: {
			type: element.type,
			elementId: element.id,
			isBottomHalfOfElement: true,
		},
	});

	const { removeElement, setSelectedElement } = useDesigner();

	const draggable = useDraggable({
		id: element.id + '-drag-handler',
		data: {
			type: element.type,
			elementId: element.id,
			isDesignerElement: true,
		},
	});

	const DesignerElement = FormElements[element.type].designerComponent;

	if (draggable.isDragging) {
		return null;
	}

	return (
		<div
			ref={draggable.setNodeRef}
			{...draggable.listeners}
			{...draggable.attributes}
			onMouseEnter={() => {
				setIsMouseOver(true);
			}}
			onMouseLeave={() => {
				setIsMouseOver(false);
			}}
			onClick={event => {
				event.stopPropagation();
				setSelectedElement(element);
			}}
			className="relative h-[120px] flex flex-col text-foreground rounded-md ring-1 ring-accent ring-inset hover:cursor-pointer "
		>
			<div
				ref={topHalf.setNodeRef}
				className="absolute w-full h-1/2 rounded-t-md"
			/>
			<div
				ref={bottomHalf.setNodeRef}
				className="absolute w-full h-1/2 bottom-0 rounded-b-md"
			/>
			{isMouseOver && (
				<>
					<div className="absolute h-full right-0 z-10">
						<Button
							variant="destructive"
							onClick={event => {
								event.stopPropagation();
								removeElement(element.id);
							}}
							className="h-full border rounded-md rounded-l-none bg-red-500"
						>
							<BiSolidTrash className="w-6 h-6" />
						</Button>
					</div>
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse">
						<p className="text-muted-foreground text-sm">
							Click for change properties or drag to move
						</p>
					</div>
				</>
			)}
			{topHalf.isOver && (
				<div className="absolute top-0 w-full h-[7px] rounded-md rounded-b-none bg-primary" />
			)}
			<div
				className={cn(
					'w-full h-[120px] flex items-center rounded-md bg-accent/40 opacity-100 px-4 py-2 pointer-events-none',
					isMouseOver && 'opacity-30',
				)}
			>
				<DesignerElement elementInstance={element} />
			</div>
			{bottomHalf.isOver && (
				<div className="absolute bottom-0 w-full h-[7px] rounded-md rounded-t-none bg-primary" />
			)}
		</div>
	);
};
