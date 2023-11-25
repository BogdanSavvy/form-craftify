import { UserButton } from '@clerk/nextjs';
import { RxHamburgerMenu } from 'react-icons/rx';

import Logo from '@/components/logo';
import ThemeSwither from '@/components/theme-switcher';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const NavBar = () => {
	return (
		<nav className="flex justify-between items-center border-b border-border h-[80px] px-4 py-2">
			<Logo />
			<div className=" gap-4 hidden sm:flex">
				<ThemeSwither />
				<UserButton afterSignOutUrl="/sign-in" />
			</div>

			<div className="gap-4 px-2 flex items-center sm:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger>
						<RxHamburgerMenu className="w-8 h-8" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="flex gap-4 p-6 mx-4">
						<ThemeSwither />
						<UserButton afterSignOutUrl="/sign-in" />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</nav>
	);
};
