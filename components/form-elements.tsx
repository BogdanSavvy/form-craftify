import { TextFieldElement } from '@/components/fields/text-field';

export type ElementsType = 'TextField';

export type SubmitFunction = (key: string, value: string) => void;

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
	formComponent: React.FC<{
		elementInstance: FormElementsInstance;
		submitValue?: (key: string, value: string) => void;
		isInvalid?: boolean;
		defaultValue?: string;
	}>;
	propertiesComponent: React.FC<{
		elementInstance: FormElementsInstance;
	}>;

	designerButton: {
		label: string;
		icon: React.ElementType;
	};

	construct: (id: string) => FormElementsInstance;
	validate: (
		formElement: FormElementsInstance,
		currentValue: string,
	) => boolean;
};

type FormElementsType = {
	[key in ElementsType]: FormElementType;
};

export const FormElements: FormElementsType = {
	TextField: TextFieldElement,
};
