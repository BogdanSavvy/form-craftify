import { useTransition } from 'react';
import { HiSaveAs } from 'react-icons/hi';
import { FaSpinner } from 'react-icons/fa';

import { UpdateFormContent } from '@/actions/form';
import { useDesigner } from '@/hooks/useDesigner';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';

export const SaveButton = ({ formId }: { formId: number }) => {
	const { elements } = useDesigner();
	const [loading, startTransition] = useTransition();

	const updateFormContent = async () => {
		try {
			const jsonElements = JSON.stringify(elements);
			await UpdateFormContent(formId, jsonElements);
			toast({
				title: 'Success',
				description: 'Your form hase been sabed',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong!',
				variant: 'destructive',
			});
		}
	};

	return (
		<Button
			disabled={loading}
			onClick={() => {
				startTransition(updateFormContent);
			}}
			variant="outline"
			className="gap-2"
		>
			<HiSaveAs className="w-4 h-4" />
			Save 
			{loading && <FaSpinner className="animate-spin" />}
		</Button>
	);
};
