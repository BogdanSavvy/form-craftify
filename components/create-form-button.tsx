'use client';

import { BsFileEarmarkPlus } from 'react-icons/bs';
import { ImSpinner2 } from 'react-icons/im';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { CreateForm } from '@/actions/form';
import { formSchema, formShemaType } from '@/schemas/form-schemas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/components/ui/use-toast';
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';

export const CreateFormButton = () => {
	const form = useForm<formShemaType>({
		resolver: zodResolver(formSchema),
	});

	const router = useRouter();

	const onSubmit = async (values: formShemaType) => {
		try {
			const formId = await CreateForm(values);

			toast({
				title: 'Success',
				description: 'Form created successfully',
				variant: 'default',
			});

			router.push(`/builder/${formId}`);
		} catch (error) {
			toast({
				title: 'Error',
				description: 'Something went wrong, try again later.',
				variant: 'destructive',
			});
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					className="group h-[190px] flex flex-col items-center justify-center gap-4 border border-dashed border-primary/20 hover:border-primary hover:cursor-pointer"
				>
					<BsFileEarmarkPlus className="h-8 w-8 text-muted-foreground group-hover:text-primary" />{' '}
					<p className="font-bold text-xl text-muted-foreground group-hover:text-primary">
						Create new form
					</p>
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Create form</DialogTitle>
					<DialogDescription>
						Create a new form to start collecting responses
					</DialogDescription>
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
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
										<Textarea rows={5} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</form>
				</Form>
				<DialogFooter>
					<Button
						onClick={form.handleSubmit(onSubmit)}
						disabled={form.formState.isSubmitting}
						className="w-full"
					>
						{!form.formState.isSubmitting ? (
							<span>Save</span>
						) : (
							<ImSpinner2 className="animate-spin" />
						)}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
