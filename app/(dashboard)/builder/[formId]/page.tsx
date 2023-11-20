import { GetFormById } from '@/actions/form';
import { FormBuilder } from '@/components/form-builder';

export default async function BuilderPage({
	params,
}: {
	params: { formId: string };
}) {
	const form = await GetFormById(Number(params.formId));

	if (!form) {
		throw new Error('Form not found!');
	}

	return <FormBuilder form={form} />;
}
