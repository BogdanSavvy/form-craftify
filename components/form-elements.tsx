import { TextFieldElement } from '@/components/fields/text-field';

export type ElementsType = 'TextField';

export type FormElementsInstance = {
	id: string;
	type: ElementsType;
	extraAttributes?: Record<string, any>;
};

export type FormElementType = {
	type: ElementsType;
	designerComponent: React.FC<{
		elementInstance: FormElementsInstance;
	}>;
	formComponent: React.FC;
	propertiesComponent: React.FC;

	designerButton: {
		label: string;
		icon: React.ElementType;
	};

	construct: (id: string) => FormElementsInstance;
};

type FormElementsType = {
	[key in ElementsType]: FormElementType;
};

export const FormElements: FormElementsType = {
	TextField: TextFieldElement,
};
