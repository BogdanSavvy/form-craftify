import { Button } from '@/components/ui/button';

interface ActionButtonProps {
	tag: string;
	icon: React.ReactElement;
	className?: string;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
	tag,
	icon,
	className,
}) => {
	return (
		<Button variant="outline" className={className}>
			{icon}
			{tag}
		</Button>
	);
};
