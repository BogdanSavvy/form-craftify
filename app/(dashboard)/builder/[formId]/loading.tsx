import { ImSpinner } from 'react-icons/im';

export default function loading() {
	return (
		<div className="w-full h-full flex items-center justify-center">
			<ImSpinner className="w-12 h-12 animate-spin" />
		</div>
	);
}
