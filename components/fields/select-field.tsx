'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { RxDropdownMenu } from 'react-icons/rx';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';


const type: ElementsType = 'SelectField';

const extraAttributes = {
	label: 'Select Field',
	description: 'Description',
	required: false,
	placeholder: 'Select one',
	options: [],
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
	placeholder: z.string().max(50),
	options: z.array(z.string()).default([]),
});

type propertiesFormShemaType = z.infer<typeof propertiesSchema>;

export const SelectFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Select field',
		icon: RxDropdownMenu,
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

	const { label, description, required, placeholder } = element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label>
				{label}
				{required && '*'}
			</Label>
			<Select>
				<SelectTrigger className="w-full">
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
			</Select>
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

	const { updateElement, setSelectedElement } = useDesigner();

	const form = useForm<propertiesFormShemaType>({
		resolver: zodResolver(propertiesSchema),
		mode: 'onSubmit',
		defaultValues: {
			label: element.extraAttributes.label,
			description: element.extraAttributes.description,
			required: element.extraAttributes.required,
			placeholder: element.extraAttributes.placeholder,
			options: element.extraAttributes.options,
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

		toast({
			title: 'Success',
			description: 'Properties saved successfully',
		});

		setSelectedElement(null);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(applyChanges)} className="space-y-3">
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
				<Separator />
				<FormField
					control={form.control}
					name="options"
					render={({ field }) => (
						<FormItem>
							<div className="flex items-center justify-between">
								<FormLabel>Options</FormLabel>
								<Button
									variant="outline"
									className="gap-2"
									onClick={event => {
										event.preventDefault();
										form.setValue('options', field.value.concat('New option'));
									}}
								>
									<AiOutlinePlus />
								</Button>
							</div>
							<div className="flex flex-col gap-2">
								{form.watch('options').map((option, index) => (
									<div
										key={index}
										className="flex items-center justify-between gap-1"
									>
										<Input
											placeholder=""
											value={option}
											onChange={event => {
												field.value[index] = event.target.value;
												field.onChange(field.value);
											}}
										/>
										<Button
											variant="ghost"
											size="icon"
											onClick={event => {
												event.preventDefault();

												const newOptions = [...field.value];
												newOptions.splice(index, 1);
												field.onChange(newOptions);
											}}
										>
											<AiOutlineClose />
										</Button>
									</div>
								))}
							</div>
							<FormDescription>Add new options</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Separator />
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
				<Separator />
				<Button type="submit" className="w-full">
					Save
				</Button>
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

	const { label, description, required, placeholder, options } =
		element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label className={cn(error && 'text-red-500')}>
				{label}
				{required && '*'}
			</Label>
			<Select
				defaultValue={value}
				onValueChange={value => {
					setValue(value);

					if (!submitValue) {
						return;
					}

					const valid = SelectFieldElement.validate(element, value);
					setErorr(!valid);
					submitValue(element.id, value);
				}}
			>
				<SelectTrigger className={cn('w-full', error && 'border-red-500')}>
					<SelectValue placeholder={placeholder} />
				</SelectTrigger>
				<SelectContent>
					{options.map(option => (
						<SelectItem key={option} value={option}>
							{option}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
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
