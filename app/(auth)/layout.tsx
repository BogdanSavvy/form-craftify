import Logo from '@/components/logo';
import ThemeSwither from '@/components/theme-switcher';

export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className="w-full h-screen flex flex-col items-center justify-center">
			<div className="pb-10">
				<Logo />
			</div>
			{children}
		</main>
	);
}
