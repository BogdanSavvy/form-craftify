import { GetFormContentByUrl } from '@/actions/form';
import { FormElementsInstance } from '@/components/form-elements';
import { FormSubmit } from '@/components/form-submit';

export default async function SubmitFormPage({
	params,
}: {
	params: { formUrl: string };
}) {
	const form = await GetFormContentByUrl(params.formUrl);

	if (!form) {
		throw new Error('Form is not found');
	}

	const formContent = JSON.parse(form.content) as FormElementsInstance[];

	return <FormSubmit formUrl={params.formUrl} content={formContent} />;
}
