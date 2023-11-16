import { Suspense } from 'react';

import { GetFormStats } from '@/actions/form';
import { StatsCards } from '@/components/stats-cards';
import { Separator } from '@/components/ui/separator';

export default function Home() {
	return (
		<section className="container pt-4">
			<Suspense fallback={<StatsCards loading={true} />}>
				<CardStatsWrapper />
			</Suspense>
			<Separator className='my-6' />
			<h2 className='font-bold text-4xl col-span-2'>
				Your Forms
			</h2>
			<Separator className='my-6' />
		</section>
	);
}

async function CardStatsWrapper() {
	const stats = await GetFormStats();
	return <StatsCards loading={false} data={stats} />;
}
