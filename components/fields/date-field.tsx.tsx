'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MdTextFields } from 'react-icons/md';

import { useDesigner } from '@/hooks/useDesigner';
import { cn } from '@/lib/utils';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
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
import { BsFillCalendarDateFill, BsFillCalendarDayFill } from 'react-icons/bs';
import { Button } from '../ui/button';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { format } from 'date-fns';
import { Calendar } from '../ui/calendar';

const type: ElementsType = 'DateField';

const extraAttributes = {
	label: 'Date Field',
	description: 'Pick a date',
	required: false,
};

const propertiesSchema = z.object({
	label: z.string().min(2).max(50),
	description: z.string().max(200),
	required: z.boolean().default(false),
});

type propertiesFormShemaType = z.infer<typeof propertiesSchema>;

export const DateFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Date field',
		icon: BsFillCalendarDateFill,
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
			<Button
				variant="outline"
				className="w-full justify-start text-left font-normal "
			>
				<CalendarIcon className="mr-2 h-4 w-4" />
				<span>Pick a date</span>
			</Button>
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

	const [date, setDate] = useState<Date | undefined>(
		defaultValue ? new Date(defaultValue) : undefined,
	);
	const [error, setErorr] = useState(false);

	useEffect(() => {
		setErorr(isInvalid === true);
	}, [isInvalid]);

	const { label, description, required, placeholder } = element.extraAttributes;

	return (
		<div className="w-full flex flex-col gap-2">
			<Label className={cn(error && 'text-red-500')}>
				{label}
				{required && '*'}
			</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							'w-full justify-start text-left font-normal',
							!date && 'text-muted-foreground',
							error && 'border-red-500',
						)}
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? format(date, 'PPP') : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0" align="start">
					<Calendar
						mode="single"
						initialFocus
						selected={date}
						onSelect={date => {
							setDate(date);
							if (!submitValue) {
								return;
							}
							const value = date?.toUTCString() || '';

							const valid = DateFieldElement.validate(element, value);
							setErorr(!valid);
							submitValue(element.id, value);
						}}
					/>
				</PopoverContent>
			</Popover>
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
