import { NavBar } from '@/components/nav-bar';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
			<NavBar />
			<main className="flex flex-grow w-full">
				{children}
			</main>
		</div>
	);
}
