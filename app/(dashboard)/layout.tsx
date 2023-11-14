import Logo from '@/components/logo';
import ThemeSwither from '@/components/theme-switcher';
import { UserButton } from '@clerk/nextjs';

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
			<nav className="flex justify-between items-center border-b border-border h-[80px] px-4 py-2">
				<Logo />
				<div className="flex gap-4">
					<ThemeSwither />
					<UserButton afterSignOutUrl="/sign-in" />
				</div>
			</nav>
			<main className="flex flex-grow w-full">{children}</main>
		</div>
	);
}
