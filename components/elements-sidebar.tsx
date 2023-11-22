import { SidebarButton } from '@/components/sidebar-button';
import { FormElements } from '@/components/form-elements';

export const ElementsSidebar = () => {
	return (
		<div className="flex flex-col gap-2">
			Elements
			<SidebarButton formElement={FormElements.TextField} />
		</div>
	);
};
