'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect } from 'react';
import { BiError } from 'react-icons/bi';
import { TiArrowBackOutline } from 'react-icons/ti';

export default function Error({ error }: { error: Error }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div className="w-full h-full flex flex-col items-center justify-center gap-4">
			<h2 className="text-destructive text-4xl flex flex-row gap-2 items-center">
				Something went wrong
				<BiError className="w-10 h-10" />
			</h2>
			<Button variant="secondary" asChild className="gap-2">
				<Link href="/">
					Back to home <TiArrowBackOutline className="w-4 h-4" />
				</Link>
			</Button>
		</div>
	);
}
