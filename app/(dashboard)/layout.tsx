import { UserButton } from "@clerk/nextjs";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="flex flex-col min-h-screen min-w-full bg-background max-h-screen">
			<nav>
				NAVIGATION
				<UserButton afterSignOutUrl="/sign-in" />
			</nav>
			<main className="flex flex-grow w-full">{children}</main>
		</div>
	);
}
