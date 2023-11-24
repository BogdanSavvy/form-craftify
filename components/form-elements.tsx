import { TextFieldElement } from '@/components/fields/text-field';
import { TitleFieldElement } from '@/components/fields/title-field';
import { SubTitleFieldElement } from '@/components/fields/subtitle-field';
import { ParagraphFieldElement } from '@/components/fields/paragraph-field';
import { SeparatorFieldElement } from '@/components/fields/separator-field';
import { SpacerFieldElement } from '@/components/fields/spacer-field';
import { NumberFieldElement } from './fields/number-field';
import { TextAreaElement } from './fields/textarea-field';
import { DateFieldElement } from './fields/date-field.tsx';
import { SelectFieldElement } from './fields/select-field';
import { CheckBoxFieldElement } from './fields/checkbox-field';

export type ElementsType =
	| 'TextField'
	| 'TitleField'
	| 'SubTitleField'
	| 'ParagraphField'
	| 'SeparatorField'
	| 'SpacerField'
	| 'NumberField'
	| 'TextAreaField'
	| 'DateField'
	| 'SelectField'
	| 'CheckBoxField'

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
	NumberField: NumberFieldElement,
	TextAreaField: TextAreaElement,
	DateField: DateFieldElement,
	SelectField: SelectFieldElement,
	CheckBoxField: CheckBoxFieldElement
};
