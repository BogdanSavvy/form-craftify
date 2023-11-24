import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { LuView } from 'react-icons/lu';
import { TbArrowBounce } from 'react-icons/tb';

import { GetFormById } from '@/actions/form';
import { LinkShare } from '@/components/link-share';
import { StatsCard } from '@/components/stats-cards';
import { VisitButton } from '@/components/visit-button';
import { SubmissionsTable } from '@/components/submission-table';
import { DeleFormButton } from '@/components/delete-form-button';

export default async function FormDetailsPage({
	params,
}: {
	params: { formId: string };
}) {
	const form = await GetFormById(Number(params.formId));

	if (!form) {
		throw new Error('Form not found!');
	}

	const { visits, submissions } = form;

	let submissionRate = 0;

	if (visits > 0) {
		submissionRate = (submissions / visits) * 100;
	}

	const bounceRate = 100 - submissionRate;

	return (
		<>
			<div className="border-t border-b border-muted py-10">
				<div className="flex justify-between container">
					<h1 className=" text-4xl font-bold truncate">{form.name}</h1>
					<div className="flex gap-2 items-center justify-center">
						<VisitButton shareUrl={form.shareURL} />
						<DeleFormButton formId={form.id} />
					</div>
				</div>
			</div>
			<div className="border-b border-muted py-4">
				<div className="container flex items-center justify-center gap-2">
					<LinkShare shareUrl={form.shareURL} />
				</div>
			</div>
			<div className="w-full container grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
				<StatsCard
					title="Total visits"
					value={visits.toLocaleString() || ''}
					helperText="All time for visits"
					icon={<LuView className="text-blue-600" />}
					loading={false}
					className="shadow-md shadow-blue-600"
				/>
				<StatsCard
					title="Total submissions"
					value={submissions.toLocaleString() || ''}
					helperText="All time for visits"
					icon={<FaWpforms className="text-fuchsia-600" />}
					loading={false}
					className="shadow-md shadow-fuchsia-600"
				/>
				<StatsCard
					title="Submissions rate"
					value={submissionRate.toLocaleString() + '%' || ''}
					helperText="Visits that result in form submission"
					icon={<HiCursorClick className="text-green-600" />}
					loading={false}
					className="shadow-md shadow-green-600"
				/>
				<StatsCard
					title="Bounce rate"
					value={bounceRate.toLocaleString() + '%' || ''}
					helperText="Visits that leaves without interacting"
					icon={<TbArrowBounce className="text-red-600" />}
					loading={false}
					className="shadow-md shadow-red-600"
				/>
			</div>
			<div className="container py-10">
				<SubmissionsTable formId={form.id} />
			</div>
		</>
	);
}
