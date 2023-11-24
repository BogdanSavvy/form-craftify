'use server';

import { currentUser } from '@clerk/nextjs';

import prisma from '@/lib/prisma';
import { formSchema, formShemaType } from '@/schemas/form-schemas';

export async function GetFormStats() {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	const stats = await prisma.form.aggregate({
		where: {
			userId: user.id,
		},
		_sum: {
			visits: true,
			submissions: true,
		},
	});

	const visits = stats._sum.visits || 0;
	const submissions = stats._sum.submissions || 0;

	let submissionRate = 0;

	if (visits > 0) {
		submissionRate = (submissions / visits) * 100;
	}

	const bounceRate = 100 - submissionRate;

	return {
		visits,
		submissions,
		submissionRate,
		bounceRate,
	};
}

export async function CreateForm(data: formShemaType) {
	const validation = formSchema.safeParse(data);

	if (!validation.success) {
		throw new Error('Form is not valid!');
	}

	const user = await currentUser();
	if (!user) {
		throw new Error('Unauthorized');
	}

	const newForm = await prisma.form.create({
		data: {
			userId: user.id,
			name: data.name,
			description: data.description,
		},
	});

	if (!newForm) {
		throw new Error('Something went wrong, can`t create a new form');
	}

	return newForm.id;
}

export async function GetForms() {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	return await prisma.form.findMany({
		where: {
			userId: user.id,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
}

export async function GetFormById(formId: number) {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	return await prisma.form.findUnique({
		where: {
			userId: user.id,
			id: formId,
		},
	});
}

export async function UpdateFormContent(formId: number, json: string) {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	return await prisma.form.update({
		where: {
			userId: user.id,
			id: formId,
		},
		data: {
			content: json,
		},
	});
}

export async function PublishForm(formId: number) {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	return await prisma.form.update({
		where: {
			userId: user.id,
			id: formId,
		},
		data: {
			published: true,
		},
	});
}

export async function GetFormContentByUrl(formUrl: string) {
	return await prisma.form.update({
		select: {
			content: true,
		},
		where: {
			shareURL: formUrl,
		},
		data: {
			visits: {
				increment: 1,
			},
		},
	});
}

export async function SubmitForm(formUrl: string, content: string) {
	return await prisma.form.update({
		where: {
			shareURL: formUrl,
			published: true,
		},
		data: {
			submissions: {
				increment: 1,
			},
			formSubmissions: {
				create: {
					content,
				},
			},
		},
	});
}

export async function GetFormWithSubmissons(formId: number) {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	return await prisma.form.findUnique({
		where: {
			userId: user.id,
			id: formId,
		},
		include: {
			formSubmissions: true,
		},
	});
}

export async function DeleteFormById(formId: number) {
	const user = await currentUser();

	if (!user) {
		throw new Error('Unauthorized');
	}

	await prisma.formSubmissions.deleteMany({
		where: {
			formId,
		},
	});

	return await prisma.form.deleteMany({
		where: {
			userId: user.id,
			id: formId,
		},
	});
}
