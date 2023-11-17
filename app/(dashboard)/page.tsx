import { Suspense } from 'react';

import { GetFormStats } from '@/actions/form';
import { StatsCards } from '@/components/stats-cards';
import { Separator } from '@/components/ui/separator';
import { CreateFormButton } from '@/components/create-form-button';
import { FormCards } from '@/components/form-cards';
import { Skeleton } from '@/components/ui/skeleton';

export default function Home() {
	return (
		<section className="container pt-4">
			<Suspense fallback={<StatsCards loading={true} />}>
				<CardStatsWrapper />
			</Suspense>
			<Separator className="my-6" />
			<h2 className="font-bold text-4xl col-span-2">Your Forms</h2>
			<Separator className="my-6" />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				<CreateFormButton />
				<Suspense
					fallback={[1, 2, 3, 4, 5].map(num => (
						<Skeleton
							key={num}
							className="h-[190px] w-full border-2 border-primary-/20"
						/>
					))}
				>
					<FormCards />
				</Suspense>
			</div>
		</section>
	);
}

async function CardStatsWrapper() {
	const stats = await GetFormStats();
	return <StatsCards loading={false} data={stats} />;
}
