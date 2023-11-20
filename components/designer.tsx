'use client';

import { useDroppable } from '@dnd-kit/core';

import { Sidebar } from '@/components/sidebar';

export const Designer = () => {
	const droppable = useDroppable({
		id: 'designer-drop-area',
		data: {
			isDesignerDropArea: true,
		},
	});

	return (
		<div className="w-full h-full flex">
			<div className="w-full p-4">
				<div className="h-full max-w-[920px] m-auto flex flex-col flex-grow flex-1 items-center justify-start bg-background overflow-y-auto">
					<p className="flex flex-grow items-center text-3xl font-bold text-muted-foreground">
						Drop here
					</p>
				</div>
			</div>
			<Sidebar />
		</div>
	);
};
