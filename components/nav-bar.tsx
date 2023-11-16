import { UserButton } from '@clerk/nextjs';

import Logo from '@/components/logo';
import ThemeSwither from '@/components/theme-switcher';

export const NavBar = () => {
	return (
		<nav className="flex justify-between items-center border-b border-border h-[80px] px-4 py-2">
			<Logo />
			<div className="flex gap-4">
				<ThemeSwither />
				<UserButton afterSignOutUrl="/sign-in" />
			</div>
		</nav>
	);
};
