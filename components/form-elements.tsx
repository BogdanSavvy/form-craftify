import { TextFieldElement } from '@/components/fields/text-field';
import { TitleFieldElement } from '@/components/fields/title-field';
import { SubTitleFieldElement } from '@/components/fields/subtitle-field';
import { ParagraphFieldElement } from '@/components/fields/paragraph-field';
import { SeparatorFieldElement } from '@/components/fields/separator-field';
import { SpacerFieldElement } from '@/components/fields/spacer-field';

export type ElementsType =
	| 'TextField'
	| 'TitleField'
	| 'SubTitleField'
	| 'ParagraphField'
	| 'SeparatorField'
	| 'SpacerField';

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
	TitleField: TitleFieldElement,
	SubTitleField: SubTitleFieldElement,
	ParagraphField: ParagraphFieldElement,
	SeparatorField: SeparatorFieldElement,
	SpacerField: SpacerFieldElement,
};
