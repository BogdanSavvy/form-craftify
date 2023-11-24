'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { IoMdCheckbox } from 'react-icons/io';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
	ElementsType,
	FormElementType,
	FormElementsInstance,
	SubmitFunction,
} from '@/components/form-elements';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

const type: ElementsType = 'CheckBoxField';

const extraAttributes = {
	label: 'Checkbox Field',
	description: 'Description',
	required: false,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
});

type propertiesFormShemaType = z.infer<typeof propertiesSchema>;

export const CheckBoxFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Checkbox field',
		icon: IoMdCheckbox,
	},

	construct: (id: string) => ({
		id,
		type,
		extraAttributes,
	}),
	validate: (
		formElement: FormElementsInstance,
		currentValue: string,
	): boolean => {
		const element = formElement as CustomInstance;
		if (element.extraAttributes.required) {
			return currentValue === 'true';
		}

		return true;
	},
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

	const { label, description, required } = element.extraAttributes;
	const id = `checknox-${element.id}`;

	return (
		<div className="flex items-top space-x-2">
			<Checkbox id={id}></Checkbox>
			<div className="grid gap-1.5 leading-none">
				<Label htmlFor={id}>
					{label}
					{required && '*'}
				</Label>
				{description && (
					<p className="text-muted-foreground text-[0.8rem]">{description}</p>
				)}
			</div>
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
			label: element.extraAttributes.label,
			description: element.extraAttributes.description,
			required: element.extraAttributes.required,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormShemaType) => {
		updateElement(element.id, {
			...element,
			extraAttributes: {
				...values,
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
					name="label"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Label</FormLabel>
							<FormControl>
								<Input
									{...field}
									onKeyDown={event => {
										if (event.key === 'Enter') {
											event.currentTarget.blur();
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								The label of the field <br />
								it will be displayed above the field.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input
									{...field}
									onKeyDown={event => {
										if (event.key === 'Enter') {
											event.currentTarget.blur();
										}
									}}
								/>
							</FormControl>
							<FormDescription>
								The description of the field <br />
								it will be displayed below the field.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="required"
					render={({ field }) => (
						<FormItem className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
							<div className="space-y-0.5">
								<FormLabel>Required</FormLabel>
								<FormDescription>
									The description of the field <br />
									it will be displayed below the field.
								</FormDescription>
							</div>
							<FormControl>
								<Switch
									checked={field.value}
									onCheckedChange={field.onChange}
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
	submitValue,
	isInvalid,
	defaultValue,
}: {
	elementInstance: FormElementsInstance;
	submitValue?: SubmitFunction;
	isInvalid?: boolean;
	defaultValue?: string;
}) {
	const element = elementInstance as CustomInstance;

	const [value, setValue] = useState<boolean>(
		defaultValue === 'true' ? true : false,
	);
	const [error, setErorr] = useState(false);

	useEffect(() => {
		setErorr(isInvalid === true);
	}, [isInvalid]);

	const { label, description, required, placeholder } = element.extraAttributes;

	const id = `checknox-${element.id}`;

	return (
		<div className="flex items-top space-x-2">
			<Checkbox
				id={id}
				checked={value}
				onCheckedChange={checked => {
					let value = false;
					if (checked === true) {
						value = true;
					}
					setValue(value);

					if (!submitValue) {
						return;
					}

					const stringValue = value ? 'true' : 'false';
					const valid = CheckBoxFieldElement.validate(element, stringValue);

					setErorr(!valid);
					submitValue(element.id, stringValue);
				}}
				className={cn(error && 'border-red-500')}
			/>
			<div className="grid gap-1.5 leading-none">
				<Label htmlFor={id} className={cn(error && 'text-red-500')}>
					{label}
					{required && '*'}
				</Label>
				{description && (
					<p
						className={cn(
							'text-muted-foreground text-[0.8rem]',
							error && 'text-red-500',
						)}
					>
						{description}
					</p>
				)}
			</div>
		</div>
	);
}
