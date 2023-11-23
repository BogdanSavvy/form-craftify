import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { MdOutlinePublic } from 'react-icons/md';
import { FaSpinner } from 'react-icons/fa';

import { PublishForm } from '@/actions/form';
import { Button } from '@/components/ui/button';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';

export const PublishButton = ({ formId }: { formId: number }) => {
	const [loading, startTransition] = useTransition();
	const router = useRouter();

	const publishForm = async () => {
		try {
			await PublishForm(formId);

			toast({
				title: 'Success',
				description: 'Form is available to the public',
			});

			router.refresh();
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			});
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button className="gap-2 text-white bg-gradient-to-r from-indigo-400 to-cyan-400">
					<MdOutlinePublic className="w-4 h-4" />
					Publish
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action can not be undone! After publishing you will not be able
						to edit rhis form. <br />
						<br />
						<span className="font-medium">
							By publishing this form you will make it available to the public
							and you will be able to collect submissins
						</span>
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={event => {
							event.preventDefault();
							startTransition(publishForm);
						}}
					>
						Proceed
						{loading && <FaSpinner className="animate-spin ml-1" />}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
