import { useDraggable } from '@dnd-kit/core';

import { cn } from '@/lib/utils';
import { FormElementType } from '@/components/form-elements';
import { Button } from '@/components/ui/button';

export const SidebarButton = ({
	formElement,
}: {
	formElement: FormElementType;
}) => {
	const { label, icon: Icon } = formElement.designerButton;

	const draggable = useDraggable({
		id: `designer-button-${formElement.type}`,
		data: {
			type: formElement.type,
			isDesignerButton: true,
		},
	});

	return (
		<Button
			ref={draggable.setNodeRef}
			variant="outline"
			className={cn(
				'w-[100px] h-[90px] flex-col gap-2 cursor-grab sm:w-[120px] sm:h-[120px]',
				draggable.isDragging && 'ring-2 ring-primary',
			)}
			{...draggable.listeners}
			{...draggable.attributes}
		>
			<Icon className="w-8 h-8 text-primary cursor-grab" />
			<p className="text-xs">{label}</p>
		</Button>
	);
};

export const SidebarButtonDragOverlay = ({
	formElement,
}: {
	formElement: FormElementType;
}) => {
	const { label, icon: Icon } = formElement.designerButton;

	return (
		<Button
			variant="outline"
			className="w-[120px] h-[120px] flex-col gap-2 cursor-grab sm:w-[120px] sm:h-[120px]"
		>
			<Icon className="w-8 h-8 text-primary cursor-grab" />
			<p className="text-xs">{label}</p>
		</Button>
	);
};
