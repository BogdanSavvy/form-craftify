import { useState } from 'react';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';

import { useDesigner } from '@/hooks/useDesigner';
import { SidebarButtonDragOverlay } from '@/components/sidebar-button';
import { ElementsType, FormElements } from '@/components/form-elements';

function DragOverlayProvider() {
	const { elements } = useDesigner();

	const [draggedElement, setDraggedElement] = useState<Active | null>(null);

	useDndMonitor({
		onDragStart: event => {
			setDraggedElement(event.active);
		},
		onDragCancel: () => {
			setDraggedElement(null);
		},
		onDragEnd: () => {
			setDraggedElement(null);
		},
	});

	if (!draggedElement) {
		return null;
	}

	let node = <div>No Drag Overlay</div>;

	const isSidebarButton = draggedElement?.data?.current?.isDesignerButton;
	if (isSidebarButton) {
		const type = draggedElement.data?.current?.type as ElementsType;
		node = <SidebarButtonDragOverlay formElement={FormElements[type]} />;
	}

	const isDesignerElement = draggedElement.data?.current?.isDesignerElement;
	if (isDesignerElement) {
		const elementId = draggedElement.data?.current?.elementId;
		const element = elements.find(el => el.id === elementId);

		if (!element) {
			node = <div>Element not found</div>;
		} else {
			const DesignerElementComponent =
				FormElements[element.type].designerComponent;

			node = (
				<div className="w-full h-[120px] flex border rounded-md bg-accent opacity-60 py-2 px-4 pointer-events-none">
					<DesignerElementComponent elementInstance={element} />
				</div>
			);
		}
	}

	return <DragOverlay>{node}</DragOverlay>;
}

export default DragOverlayProvider;
