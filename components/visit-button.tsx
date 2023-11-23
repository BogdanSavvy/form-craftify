'use client';

import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';

export const VisitButton = ({ shareUrl }: { shareUrl: string }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
      setMounted(true);
	}, []);
   
   if (!mounted) {
      return null;
   }

	const shareLink = `${window.location.origin}/submit/${shareUrl}`;

	return (
		<Button
			onClick={() => {
				window.open(shareLink, '_blank');
			}}
			className="w-[200px] "
		>
			Visit
		</Button>
	);
};
