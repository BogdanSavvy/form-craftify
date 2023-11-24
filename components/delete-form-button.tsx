'use client';

import { useState, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { BiSolidTrash } from 'react-icons/bi';
import { FaSpinner } from 'react-icons/fa';

import { DeleteFormById } from '@/actions/form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
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

export const DeleFormButton = ({ formId }: { formId: number }) => {
	const [isMounted, setIsMounted] = useState(false);
	const [loading, startTransition] = useTransition();
	const router = useRouter();

	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return null;
	}

	const deleteForm = async () => {
		try {
			await DeleteFormById(formId);
			toast({
				title: 'Success',
				description: 'Form deleted successfully',
			});
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong',
				variant: 'destructive',
			});
		} finally {
			router.push('/');
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger>
				<Button variant="destructive">
					<BiSolidTrash className="w-6 h-6" />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
					<AlertDialogDescription>
						This action can not be undone! After deleting the form, you will
						lose access to it, all data about the completion of this form and
						also statistics.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={loading}
						onClick={event => {
							event.preventDefault();
							startTransition(deleteForm);
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
