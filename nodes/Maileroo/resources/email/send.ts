import type { INodeProperties } from 'n8n-workflow';
import { additionalEmailFields, fromFields, toField } from '../../shared/fields';

const operations: Array<'send'> = ['send'];

const showOnlyForSend = {
	resource: ['email'],
	operation: ['send'],
};

export const emailSendDescription: INodeProperties[] = [
	...fromFields(operations),
	toField(operations),
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		required: true,
		description: 'Email subject line (max 255 characters)',
		displayOptions: {
			show: showOnlyForSend,
		},
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'Email Format',
		name: 'emailFormat',
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
		],
		default: 'html',
		description: 'Maileroo requires HTML, plain text, or both',
		displayOptions: {
			show: showOnlyForSend,
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
		description: 'HTML body of the email',
		displayOptions: {
			show: {
				...showOnlyForSend,
				emailFormat: ['html', 'both'],
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
		description: 'Plain text body of the email',
		displayOptions: {
			show: {
				...showOnlyForSend,
				emailFormat: ['plain', 'both'],
			},
		},
		routing: {
			send: {
				type: 'body',
				property: 'plain',
			},
		},
	},
	additionalEmailFields(operations),
];
