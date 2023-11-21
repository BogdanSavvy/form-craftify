'use client';

import { MdTextFields } from 'react-icons/md';

import {
	ElementsType,
	FormElementType,
	FormElementsInstance,
} from '@/components/form-elements';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

const type: ElementsType = 'TextField';

const extraAttributes = {
	label: 'Text Field',
	description: 'Description',
	reaquired: false,
	placeholder: 'Value ...',
};

export const TextFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	formComponent: () => <div>Form Compponent</div>,
	propertiesComponent: () => <div>Properties Compponent</div>,
	designerButton: {
		label: 'Text field',
		icon: MdTextFields,
	},
	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
};

type CustomInstance = FormElementsInstance & {
	extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
	elementInstance,
}: {
	elementInstance: FormElementsInstance;
}) {
	const element = elementInstance as CustomInstance;

	const { label, description, reaquired, placeholder } =
		element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label>
				{label}
				{reaquired && '*'}
			</Label>
			<Input readOnly disabled placeholder={placeholder} />
			{description && (
				<p className="text-muted-foreground text-[0.8rem]">{description}</p>
			)}
		</div>
	);
}
