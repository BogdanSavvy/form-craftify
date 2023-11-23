'use client';

import { useCallback, useRef, useState, useTransition } from 'react';
import { HiCursorClick } from 'react-icons/hi';
import { ImSpinner2 } from 'react-icons/im';

import { SubmitForm } from '@/actions/form';
import { FormElements, FormElementsInstance } from '@/components/form-elements';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export const FormSubmit = ({
	formUrl,
	content,
}: {
	formUrl: string;
	content: FormElementsInstance[];
}) => {
	const formValues = useRef<{ [key: string]: string }>({});
	const formErrors = useRef<{ [key: string]: boolean }>({});

	const [renderKey, setRenderKey] = useState(Math.floor(Math.random() * 100));

	const [submitted, setSubmitted] = useState(false);
	const [pending, startTransition] = useTransition();

	const validateForm: () => boolean = useCallback(() => {
		for (const field of content) {
			const currentValue = formValues.current[field.id] || '';
			const valid = FormElements[field.type].validate(field, currentValue);

			if (!valid) {
				formErrors.current[field.id] = true;
			}
		}

		if (Object.keys(formErrors.current).length > 0) {
			return false;
		}

		return true;
	}, [content]);

	const submitValue = (key: string, value: string) => {
		formValues.current[key] = value;
	};

	const submitForm = async () => {
		formErrors.current = {};
		const isValidForm = validateForm();

		if (!isValidForm) {
			//? We`r triggering rerender our form
			setRenderKey(Math.floor(Math.random() * 100));

			toast({
				title: 'Error',
				description: 'Please check the form for errors',
				variant: 'destructive',
			});

			return;
		}

		try {
			const content = JSON.stringify(formValues.current);
			await SubmitForm(formUrl, content);
			setSubmitted(true);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong, can not submit the form',
				variant: 'destructive',
			});
		}
	};

	if (submitted) {
		return (
			<div className="w-full h-full flex items-center justify-center p-8">
				<div className="w-full max-w-[720px] flex flex-col flex-grow gap-4 bg-background rounded-lg border shadow-xl shadow-blue-600 p-8 overflow-y-auto">
					<h1 className="text-2xl font-bold">Form Submitted</h1>
					<p className="text-muted-foreground">
						Thank you for submitting the form, you can close this page now.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="w-full h-full flex items-center justify-center p-8">
			<div
				key={renderKey}
				className="w-full h-full max-w-[720px] flex flex-col flex-grow justify-between gap-4 bg-background rounded-lg border shadow-xl shadow-blue-600 p-8 overflow-y-auto"
			>
				<div className="flex flex-col gap-4">
					{content.map(element => {
						const FormElement = FormElements[element.type].formComponent;
						return (
							<FormElement
								key={element.id}
								elementInstance={element}
								submitValue={submitValue}
								isInvalid={formErrors.current[element.id]}
								defaultValue={formValues.current[element.id]}
							/>
						);
					})}
				</div>
				<Button
					onClick={() => {
						startTransition(submitForm);
					}}
					disabled={pending}
					className="mt-8"
				>
					{!pending ? (
						<>
							<HiCursorClick className="mr-2" /> Submit
						</>
					) : (
						<ImSpinner2 className="animate-ping" />
					)}
				</Button>
			</div>
		</div>
	);
};
