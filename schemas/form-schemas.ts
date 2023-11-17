import * as z from 'zod';

export type formShemaType = z.infer<typeof formSchema>;

export const formSchema = z.object({
	name: z.string().min(3),
	description: z.string().optional(),
});
