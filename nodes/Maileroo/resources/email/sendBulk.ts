import type { INodeProperties } from 'n8n-workflow';
import { additionalEmailFields } from '../../shared/fields';

const operations: Array<'sendBulk'> = ['sendBulk'];

const showOnlyForSendBulk = {
	resource: ['email'],
	operation: ['sendBulk'],
};

export const emailSendBulkDescription: INodeProperties[] = [
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		required: true,
		description: 'Shared subject line. Supports template variables such as {{ first_name }}.',
		displayOptions: {
			show: showOnlyForSendBulk,
		},
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'Messages',
		name: 'messages',
		type: 'json',
		default: '[]',
		required: true,
		description:
			'JSON array of message objects (max 500). Each item must include from and to.',
		displayOptions: {
			show: showOnlyForSendBulk,
		},
		routing: {
			send: {
				type: 'body',
				property: 'messages',
				value: '={{typeof $value === "string" ? JSON.parse($value) : $value}}',
			},
		},
	},
	{
		displayName: 'Content Type',
		name: 'bulkContentType',
		type: 'options',
		options: [
			{
				name: 'HTML',
				value: 'html',
			},
			{
				name: 'Plain Text',
				value: 'plain',
			},
			{
				name: 'HTML and Plain Text',
				value: 'both',
			},
			{
				name: 'Template ID',
				value: 'template',
			},
		],
		default: 'html',
		description: 'Shared body for every message',
		displayOptions: {
			show: showOnlyForSendBulk,
		},
	},
	{
		displayName: 'HTML',
		name: 'html',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		description: 'Shared HTML body. Supports template variables.',
		displayOptions: {
			show: {
				...showOnlyForSendBulk,
				bulkContentType: ['html', 'both'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'html',
			},
		},
	},
	{
		displayName: 'Plain Text',
		name: 'plain',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		description: 'Shared plain text body. Supports template variables.',
		displayOptions: {
			show: {
				...showOnlyForSendBulk,
				bulkContentType: ['plain', 'both'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'plain',
			},
		},
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'number',
		default: 0,
		required: true,
		description: 'Shared Maileroo template ID for every message',
		displayOptions: {
			show: {
				...showOnlyForSendBulk,
				bulkContentType: ['template'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'template_id',
			},
		},
	},
	additionalEmailFields(operations),
];
