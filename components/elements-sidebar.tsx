import { SidebarButton } from '@/components/sidebar-button';
import { FormElements } from '@/components/form-elements';
import { Separator } from './ui/separator';

export const ElementsSidebar = () => {
	return (
		<div className="flex flex-col gap-2">
			<p className="text-sm text-foreground/70">Drag and drop elements</p>
			<Separator className="my-2" />
			<div className="grid grid-cols-1 gap-2 place-items-center md:grid-cols-2">
				<p className="text-sm text-muted-foreground col-span-1 place-self-start my-2 md:col-span-2">
					Layout Elements
				</p>
				<SidebarButton formElement={FormElements.TitleField} />
				<SidebarButton formElement={FormElements.SubTitleField} />
				<SidebarButton formElement={FormElements.ParagraphField} />
				<SidebarButton formElement={FormElements.SeparatorField} />
				<SidebarButton formElement={FormElements.SpacerField} />
				<p className="text-sm text-muted-foreground col-span-1 place-self-start my-2 md:col-span-2">
					Form Elements
				</p>
				<SidebarButton formElement={FormElements.TextField} />
				<SidebarButton formElement={FormElements.NumberField} />
				<SidebarButton formElement={FormElements.TextAreaField} />
				<SidebarButton formElement={FormElements.DateField} />
				<SidebarButton formElement={FormElements.SelectField} />
				<SidebarButton formElement={FormElements.CheckBoxField} />
			</div>
		</div>
	);
};
