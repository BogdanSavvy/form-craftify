import { LuView } from 'react-icons/lu';
import { FaWpforms } from 'react-icons/fa';
import { HiCursorClick } from 'react-icons/hi';
import { TbArrowBounce } from 'react-icons/tb';

import { GetFormStats } from '@/actions/form';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Skeleton } from './ui/skeleton';

interface StatsCardsProps {
	data?: Awaited<ReturnType<typeof GetFormStats>>;
	loading: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ data, loading }) => {
	return (
		<div className="w-full grid grid-cols-1 gap-4 pt-8 md:grid-cols-2 lg:grid-cols-4">
			<StatsCard
				title="Total visits"
				value={data?.visits.toLocaleString() || ''}
				helperText="All time for visits"
				icon={<LuView className="text-blue-600" />}
				loading={loading}
				className="shadow-md shadow-blue-600"
			/>
			<StatsCard
				title="Total submissions"
				value={data?.visits.toLocaleString() || ''}
				helperText="All time for visits"
				icon={<FaWpforms className="text-fuchsia-600" />}
				loading={loading}
				className="shadow-md shadow-fuchsia-600"
			/>
			<StatsCard
				title="Submissions rate"
				value={data?.visits.toLocaleString() + '%' || ''}
				helperText="Visits that result in form submission"
				icon={<HiCursorClick className="text-green-600" />}
				loading={loading}
				className="shadow-md shadow-green-600"
			/>
			<StatsCard
				title="Bounce rate"
				value={data?.visits.toLocaleString() + '%' || ''}
				helperText="Visits that leaves without interacting"
				icon={<TbArrowBounce className="text-red-600" />}
				loading={loading}
				className="shadow-md shadow-red-600"
			/>
		</div>
	);
};

interface StatsCardProps {
	title: string;
	value: string;
	helperText: string;
	icon: React.ReactNode;
	loading: boolean;
	className: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
	title,
	value,
	helperText,
	icon,
	loading,
	className,
}) => {
	return (
		<Card className={className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle className="font-medium text-sm text-muted-foreground">
					{title}
				</CardTitle>
				{icon}
			</CardHeader>
			<CardContent>
				<div className="font-bold text-2xl">
					{loading ? (
						<Skeleton>
							<span className="opacity-0">0</span>
						</Skeleton>
					) : (
						value
					)}
					<p className="text-xs text-muted-foreground pt-1{">{helperText}</p>
				</div>
			</CardContent>
		</Card>
	);
};
