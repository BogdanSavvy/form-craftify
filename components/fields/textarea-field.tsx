'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { BsTextareaResize } from 'react-icons/bs';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
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

const type: ElementsType = 'TextAreaField';

const extraAttributes = {
	label: 'Text area',
	description: 'Description',
	required: false,
	placeholder: 'Type here ...',
	rows: 3,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
	placeholder: z.string().max(50),
	rows: z.number().min(1).max(10),
});

type propertiesFormShemaType = z.infer<typeof propertiesSchema>;

export const TextAreaElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Text area field',
		icon: BsTextareaResize,
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
			return currentValue.length > 0;
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

	const { label, description, required, placeholder, rows } =
		element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label className="pt-2">
				{label}
				{required && '*'}
			</Label>
			<Textarea readOnly disabled placeholder={placeholder} />
			{description && (
				<p className="text-muted-foreground text-[0.8rem]">{description}</p>
			)}
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
			placeholder: element.extraAttributes.placeholder,
			rows: element.extraAttributes.rows,
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
					name="placeholder"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Placeholder</FormLabel>
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
							<FormDescription>The placeholder of the field.</FormDescription>
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
				<FormField
					control={form.control}
					name="rows"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Rows {form.watch('rows')}</FormLabel>
							<FormControl>
								<Slider
									defaultValue={[field.value]}
									min={1}
									max={10}
									onValueChange={value => {
										field.onChange(value[0]);
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

	const [value, setValue] = useState(defaultValue || '');
	const [error, setErorr] = useState(false);

	useEffect(() => {
		setErorr(isInvalid === true);
	}, [isInvalid]);

	const { label, description, required, placeholder, rows } =
		element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label className={cn(error && 'text-red-500')}>
				{label}
				{required && '*'}
			</Label>
			<Textarea
				rows={rows}
				placeholder={placeholder}
				onChange={event => {
					setValue(event.target.value);
				}}
				onBlur={event => {
					if (!submitValue) {
						return;
					}

					const valid = TextAreaElement.validate(element, event.target.value);
					setErorr(!valid);

					if (!valid) {
						return;
					}

					submitValue(element.id, event.target.value);
				}}
				value={value}
				className={cn(error && 'border-red-500')}
			/>
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
	);
}
