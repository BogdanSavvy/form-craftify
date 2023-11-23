import Logo from '@/components/logo';
import ThemeSwither from '@/components/theme-switcher';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-screen min-w-full flex flex-col min-h-screen bg-background ">
			<nav className="flex justify-between items-center border-b border-border h-[80px] px-4 py-2">
				<Logo />
				<ThemeSwither />
			</nav>
			<main className="flex flex-grow w-full">{children}</main>
		</div>
	);
}
