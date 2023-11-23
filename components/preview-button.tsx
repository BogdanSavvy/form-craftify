import { MdPreview } from 'react-icons/md';

import { useDesigner } from '@/hooks/useDesigner';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { FormElements } from '@/components/form-elements';

export const PreviewButton = () => {
	const { elements } = useDesigner();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="outline" className="gap-2">
					<MdPreview className="w-6 h-6" />
					Preview
				</Button>
			</DialogTrigger>
			<DialogContent className="w-screen h-screen max-w-full max-h-screen flex flex-col flex-grow-0 gap-0 p-0">
				<div className="px-4 py-4 border-b">
					<p className="text-lg font-bold text-muted-foreground">
						Form Preview
					</p>
					<p className="text-sm text-muted-foreground">
						This is how your form look like to your users
					</p>
				</div>
				<div className="flex flex-col flex-grow items-center justify-center overflow-y-auto p-4 bg-accent bg-[url(/paper.svg)] dark:bg-[url(/paper-dark.svg)]">
					<div className="w-full h-full max-w-[720px] flex flex-col flex-grow gap-4 bg-background rounded-2xl overflow-y-auto p-8">
						{elements.map(element => {
							const FormComponent = FormElements[element.type].formComponent;

							return (
								<FormComponent key={element.id} elementInstance={element} />
							);
						})}
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
