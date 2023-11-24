import Link from 'next/link';
import { Form } from '@prisma/client';
import { formatDistance } from 'date-fns';
import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { BiRightArrowAlt } from 'react-icons/bi';
import { FaEdit } from 'react-icons/fa';

import { GetForms } from '@/actions/form';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const FormCards = async () => {
	const forms = await GetForms();

	return (
		<>
			{forms.map(form => (
				<FormCard key={form.id} form={form} />
			))}
		</>
	);
};

const FormCard = ({ form }: { form: Form }) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-row items-center justify-between gap-2">
					<span className="flex items-center justify-between gap-2">
						{form.name}
					</span>
					{form.published ? (
						<Badge>Published</Badge>
					) : (
						<Badge variant="destructive">Draft</Badge>
					)}
				</CardTitle>
				<CardDescription className="flex items-center justify-between text-muted-foreground text-sm">
					{formatDistance(form.createdAt, new Date(), {
						addSuffix: true,
					})}
					{form.published && (
						<span className="flex items-center gap-2">
							<LuView className="text-muted-foreground" />
							<span>{form.visits.toLocaleString()}</span>
							<FaWpforms className="text-muted-foreground" />
							<span>{form.submissions.toLocaleString()}</span>
						</span>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[20px] truncate text-sm text-muted-foreground">
				{form.description || 'None'}
			</CardContent>
			<CardFooter>
				{form.published ? (
					<Button asChild className="w-full mt-2 gap-4">
						<Link href={`/forms/${form.id}`}>
							View submissions <BiRightArrowAlt />
						</Link>
					</Button>
				) : (
					<Button asChild variant="secondary" className="w-full mt-2 gap-4">
						<Link href={`/builder/${form.id}`}>
							Edit form <FaEdit />
						</Link>
					</Button>
				)}
			</CardFooter>
		</Card>
	);
};
