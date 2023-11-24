'use client';

import { RiSeparator } from 'react-icons/ri';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
	ElementsType,
	FormElementType,
} from '@/components/form-elements';

const type: ElementsType = 'SeparatorField';

export const SeparatorFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Separator',
		icon: RiSeparator,
	},

	construct: (id: string) => ({
		id,
		type,
	}),
	validate: () => true,
};

function DesignerComponent() {
	return (
		<div className="w-full flex flex-col gap-2">
			<Label className="text-muted-foreground">Separator</Label>
			<Separator />
		</div>
	);
}

function PropertiesComponent() {
	return <p>No Properties for this element</p>;
}

function FormComponent() {
	return <Separator />;
}
