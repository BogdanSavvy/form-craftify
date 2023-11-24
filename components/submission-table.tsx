import { format, formatDistance } from 'date-fns';

import { GetFormWithSubmissons } from '@/actions/form';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { ElementsType, FormElementsInstance } from '@/components/form-elements';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

type Row = { [key: string]: string } & {
	submittedAt: Date;
};

type Column = {
	id: string;
	label: string;
	required: string;
	type: ElementsType;
};

export const SubmissionsTable = async ({ formId }: { formId: number }) => {
	const form = await GetFormWithSubmissons(formId);

	if (!form) {
		throw new Error('Form no found');
	}

	const formElements = JSON.parse(form.content) as FormElementsInstance[];

	const columns: Column[] = [];

	formElements.forEach(element => {
		switch (element.type) {
			case 'TextField':
			case 'NumberField':
			case 'TextAreaField':
			case 'DateField':
			case 'SelectField':
			case 'CheckBoxField':
				columns.push({
					id: element.id,
					label: element.extraAttributes?.label,
					required: element.extraAttributes?.type,
					type: element.type,
				});
				break;
			default:
				break;
		}
	});

	const rows: Row[] = [];

	form.formSubmissions.forEach(submission => {
		const content = JSON.parse(submission.content);
		rows.push({
			...content,
			submittedAt: submission.createdAt,
		});
	});

	return (
		<>
			<h1 className="text-2xl font-bold my-4">Submissions</h1>
			<div className="rounded-md border">
				<Table>
					<TableHeader>
						<TableRow>
							{columns.map(column => (
								<TableHead key={column.id} className="uppercase">
									{column.label}
								</TableHead>
							))}
							<TableHead className="text-muted-foreground text-right uppercase">
								Submitted at
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{rows.map((row, index) => (
							<TableRow key={index}>
								{columns.map(column => (
									<RowCell
										key={column.id}
										type={column.type}
										value={row[column.id]}
									/>
								))}
								<TableCell className="text-muted-foreground text-right">
									{formatDistance(row.submittedAt, new Date(), {
										addSuffix: true,
									})}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
};

function RowCell({ type, value }: { type: ElementsType; value: string }) {
	let node: React.ReactNode = value;

	switch (type) {
		case 'DateField':
			if (!value) break;
			const date = new Date(value);
			node = <Badge variant="outline">{format(date, 'dd,MM,yyyy')}</Badge>;
			break;
		case 'CheckBoxField':
			const checked = value === 'true';
			node = <Checkbox checked={checked} disabled />;
	}

	return <TableCell>{node}</TableCell>;
}
