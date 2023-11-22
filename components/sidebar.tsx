import { useDesigner } from '@/hooks/useDesigner';
import { ElementsSidebar } from '@/components/elements-sidebar';
import { PropertiesEditorSidbar } from '@/components/properties-editor-sidebar';

export const Sidebar = () => {
	const { selectedElement } = useDesigner();

	return (
		<aside className="w-[400px] h-full max-w-[400px] p-4 flex flex-col flex-grow gap-2 border-l-2 border-muted bg-background overflow-y-auto">
			{!selectedElement ? <ElementsSidebar /> : <PropertiesEditorSidbar />}
		</aside>
	);
};
