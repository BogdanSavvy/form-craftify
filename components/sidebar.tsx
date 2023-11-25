import { useDesigner } from '@/hooks/useDesigner';
import { ElementsSidebar } from '@/components/elements-sidebar';
import { PropertiesEditorSidbar } from '@/components/properties-editor-sidebar';

export const Sidebar = () => {
	const { selectedElement } = useDesigner();

	return (
		<aside className="w-[200px] h-full max-w-[400px] p-2 flex flex-col flex-grow gap-2 border-l-2 border-muted bg-background overflow-y-auto sm:w-[400px]">
			{!selectedElement ? <ElementsSidebar /> : <PropertiesEditorSidbar />}
		</aside>
	);
};
