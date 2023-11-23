'use client';

import { useEffect, useState } from 'react';
import { ImShare } from 'react-icons/im';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';

export const LinkShare = ({ shareUrl }: { shareUrl: string }) => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return null;
	}

	const shareLink = `${window.location.origin}/submit/${shareUrl}`;

	return (
		<div className=" flex flex-grow items-center gap-4">
			<Input readOnly value={shareLink} />
			<Button
				onClick={() => {
					navigator.clipboard.writeText(shareLink);
					toast({
						title: 'Copied',
						description: 'Link copied to clipboard',
					});
				}}
				className="w-[250px]"
			>
				<ImShare className="w-4 h-4 mr-2" />
				Share link
			</Button>
		</div>
	);
};
