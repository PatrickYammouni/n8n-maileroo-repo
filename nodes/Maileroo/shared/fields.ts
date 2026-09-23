import type { INodeProperties } from 'n8n-workflow';

type EmailOperation = 'send' | 'sendTemplate' | 'sendBulk';

const showFor = (operations: EmailOperation[]) => ({
	resource: ['email'],
	operation: operations,
});

const recipientValues: INodeProperties[] = [
	{
		displayName: 'Email',
		name: 'address',
		type: 'string',
		placeholder: 'name@example.com',
		default: '',
		required: true,
	},
	{
		displayName: 'Name',
		name: 'displayName',
		type: 'string',
		default: '',
		description: 'Optional display name shown to the recipient',
	},
];

const recipientListExpression =
	'={{($value.recipient || []).map(({address, displayName}) => displayName ? {address, display_name: displayName} : {address})}}';

function recipientsField(
	displayName: string,
	name: 'to' | 'cc' | 'bcc' | 'reply_to',
	operations: EmailOperation[],
	required = false,
): INodeProperties {
	return {
		displayName,
		name,
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Email',
		default: {},
		required,
		description: required
			? 'Recipient email addresses'
			: `Optional ${displayName.toLowerCase()} email addresses`,
		displayOptions: {
			show: showFor(operations),
		},
		options: [
			{
				name: 'recipient',
				displayName: 'Email',
				values: recipientValues,
			},
		],
		routing: {
			send: {
				type: 'body',
				property: name,
				value: recipientListExpression,
			},
		},
	};
}

export function fromFields(operations: EmailOperation[]): INodeProperties[] {
	return [
		{
			displayName: 'From Email',
			name: 'fromEmail',
			type: 'string',
			default: '',
			required: true,
			placeholder: 'you@yourdomain.com',
			description: 'Must use a domain verified in your Maileroo account',
			displayOptions: {
				show: showFor(operations),
			},
			routing: {
				send: {
					type: 'body',
					property: 'from',
					value: '={{ Object.assign({ address: $value }, $parameter.fromName ? { display_name: $parameter.fromName } : {}) }}',
				},
			},
		},
		{
			displayName: 'From Name',
			name: 'fromName',
			type: 'string',
			default: '',
			description: 'Optional sender display name',
			displayOptions: {
				show: showFor(operations),
			},
		},
	];
}

export const toField = (operations: EmailOperation[]) =>
	recipientsField('To', 'to', operations, true);

export function additionalEmailFields(operations: EmailOperation[]): INodeProperties {
	const includeSchedule = operations.some((operation) => operation !== 'sendBulk');

	const options: INodeProperties[] = [
		{
			displayName: 'BCC',
			name: 'bcc',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			placeholder: 'Add BCC',
			default: {},
			options: [
				{
					name: 'recipient',
					displayName: 'Email',
					values: recipientValues,
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'bcc',
					value: recipientListExpression,
				},
			},
		},
		{
			displayName: 'CC',
			name: 'cc',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			placeholder: 'Add CC',
			default: {},
			options: [
				{
					name: 'recipient',
					displayName: 'Email',
					values: recipientValues,
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'cc',
					value: recipientListExpression,
				},
			},
		},
		{
			displayName: 'Reply To',
			name: 'replyTo',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			placeholder: 'Add Reply To',
			default: {},
			options: [
				{
					name: 'recipient',
					displayName: 'Email',
					values: recipientValues,
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'reply_to',
					value: recipientListExpression,
				},
			},
		},
		{
			displayName: 'Tracking',
			name: 'tracking',
			type: 'boolean',
			default: true,
			description: 'Whether to enable open and click tracking',
			routing: {
				send: {
					type: 'body',
					property: 'tracking',
				},
			},
		},
		{
			displayName: 'Tags',
			name: 'tags',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			placeholder: 'Add Tag',
			default: {},
			description: 'Key-value tags for categorizing the email',
			options: [
				{
					name: 'tag',
					displayName: 'Tag',
					values: [
						{
							displayName: 'Key',
							name: 'key',
							type: 'string',
							default: '',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							default: '',
						},
					],
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'tags',
					value: '={{Object.fromEntries(($value.tag || []).map(({key, value}) => [key, value]))}}',
				},
			},
		},
		{
			displayName: 'Headers',
			name: 'headers',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			placeholder: 'Add Header',
			default: {},
			description: 'Custom email headers such as X-Campaign',
			options: [
				{
					name: 'header',
					displayName: 'Header',
					values: [
						{
							displayName: 'Name',
							name: 'name',
							type: 'string',
							default: '',
							placeholder: 'X-Custom-Header',
						},
						{
							displayName: 'Value',
							name: 'value',
							type: 'string',
							default: '',
						},
					],
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'headers',
					value: '={{Object.fromEntries(($value.header || []).map(({name, value}) => [name, value]))}}',
				},
			},
		},
		{
			displayName: 'Attachments',
			name: 'attachments',
			type: 'fixedCollection',
			typeOptions: {
				multipleValues: true,
			},
			placeholder: 'Add Attachment',
			default: {},
			description: 'Use base64 content, or an expression such as {{ $binary.data.data }}',
			options: [
				{
					name: 'attachment',
					displayName: 'Attachment',
					values: [
						{
							displayName: 'File Name',
							name: 'fileName',
							type: 'string',
							default: '',
							required: true,
							placeholder: 'invoice.pdf',
						},
						{
							displayName: 'Content',
							name: 'content',
							type: 'string',
							typeOptions: {
								rows: 3,
							},
							default: '',
							required: true,
							description: 'Base64-encoded file content',
						},
						{
							displayName: 'Content Type',
							name: 'contentType',
							type: 'string',
							default: '',
							placeholder: 'application/pdf',
							description: 'MIME type. Maileroo guesses this if omitted.',
						},
						{
							displayName: 'Inline',
							name: 'inline',
							type: 'boolean',
							default: false,
							description: 'Whether to embed the file as an inline image',
						},
					],
				},
			],
			routing: {
				send: {
					type: 'body',
					property: 'attachments',
					value:
						'={{($value.attachment || []).map(({fileName, content, contentType, inline}) => { const item = { file_name: fileName, content }; if (contentType) { item.content_type = contentType; } if (inline) { item.inline = true; } return item; })}}',
				},
			},
		},
		{
			displayName: 'Reference ID',
			name: 'referenceId',
			type: 'string',
			default: '',
			description: 'Optional 24-character hex ID. Maileroo generates one if omitted.',
			routing: {
				send: {
					type: 'body',
					property: 'reference_id',
				},
			},
		},
	];

	if (includeSchedule) {
		options.push({
			displayName: 'Scheduled At',
			name: 'scheduledAt',
			type: 'string',
			default: '',
			placeholder: '2026-09-24T15:30:00Z',
			description: 'RFC 3339 timestamp or natural language such as "in 2 hours"',
			routing: {
				send: {
					type: 'body',
					property: 'scheduled_at',
				},
			},
		});
	}

	return {
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: showFor(operations),
		},
		options,
	};
}
