'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BsTextParagraph } from 'react-icons/bs';

import { useDesigner } from '@/hooks/useDesigner';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
	ElementsType,
	FormElementType,
	FormElementsInstance,
} from '@/components/form-elements';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

const type: ElementsType = 'ParagraphField';

const extraAttributes = {
	text: 'Text here',
};

const propertiesSchema = z.object({
	text: z.string().min(2).max(300),
});

type propertiesFormShemaType = z.infer<typeof propertiesSchema>;

export const ParagraphFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Paragraph',
		icon: BsTextParagraph,
	},

	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	validate: () => true,
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

	const { text } = element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label className="text-muted-foreground">Paragraph field</Label>
			<p>{text}</p>
		</div>
	);
}

function PropertiesComponent({
	elementInstance,
}: {
	elementInstance: FormElementsInstance;
}) {
	const element = elementInstance as CustomInstance;

	const { updateElement } = useDesigner();

	const form = useForm<propertiesFormShemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onBlur',
		defaultValues: {
			text: element.extraAttributes.text,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormShemaType) => {
		const { text } = values;
		updateElement(element.id, {
			...element,
			extraAttributes: {
				text,
			},
		});
	};

	return (
		<Form {...form}>
			<form
				onBlur={form.handleSubmit(applyChanges)}
				onSubmit={event => {
					event.preventDefault();
				}}
				className="space-y-3"
			>
				<FormField
					control={form.control}
					name="text"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Text</FormLabel>
							<FormControl>
								<Textarea
									rows={5}
									{...field}
									onKeyDown={event => {
										if (event.key === 'Enter') {
											event.currentTarget.blur();
										}
									}}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

function FormComponent({
	elementInstance,
}: {
	elementInstance: FormElementsInstance;
}) {
	const element = elementInstance as CustomInstance;

	const { text } = element.extraAttributes;

	return <p>{text}</p>;
}
