'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LuSeparatorHorizontal } from 'react-icons/lu';

import {
	ElementsType,
	FormElementType,
	FormElementsInstance,
} from '@/components/form-elements';
import { Label } from '@/components/ui/label';
import { useDesigner } from '@/hooks/useDesigner';
import { Slider } from '@/components/ui/slider';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '../ui/input';

const type: ElementsType = 'SpacerField';

const extraAttributes = {
	height: 20, //* px
};

const propertiesSchema = z.object({
	height: z.number().min(5).max(200),
});

type propertiesFormShemaType = z.infer<typeof propertiesSchema>;

export const SpacerFieldElement: FormElementType = {
	type,
	designerComponent: DesignerComponent,
	propertiesComponent: PropertiesComponent,
	formComponent: FormComponent,

	designerButton: {
		label: 'Spacer',
		icon: LuSeparatorHorizontal,
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

	const { height } = element.extraAttributes;

	return (
		<div className="w-full flex flex-col items-center gap-2">
			<Label className="text-muted-foreground">Spacer: {height}px</Label>
			<LuSeparatorHorizontal className="h-8 w-8" />
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
			height: element.extraAttributes.height,
		},
	});

	useEffect(() => {
		form.reset(element.extraAttributes);
	}, [element, form]);

	const applyChanges = (values: propertiesFormShemaType) => {
		const { height } = values;

		updateElement(element.id, {
			...element,
			extraAttributes: {
				height,
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
					name="height"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Height (px): {form.watch('height')}</FormLabel>
							<FormControl className="pt-2 hidden sm:flex">
								<Slider
									defaultValue={[field.value]}
									min={5}
									max={200}
									step={1}
									onValueChange={value => {
										field.onChange(value[0]);
									}}
								/>
							</FormControl>
							<FormControl className="pt-2 sm:hidden">
								<Input
									type="number"
									value={field.value}
									onChange={event => {
										field.onChange(Number(event.target.value));
									}}
									className="py-2"
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

	const { height } = element.extraAttributes;

	return <div style={{ height, width: '100%' }}></div>;
}
