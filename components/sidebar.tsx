import { FormElements } from '@/components/form-elements';
import { SidebarButton } from '@/components/sidebar-button';

export const Sidebar = () => {
	return (
		<aside className="w-[400px] h-full max-w-[400px] p-4 flex flex-col flex-grow gap-2 border-l-2 border-muted bg-background overflow-y-auto">
			Elements
			<SidebarButton formElement={FormElements.TextField} />
		</aside>
	);
};
