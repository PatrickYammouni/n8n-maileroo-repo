import type { INodeProperties } from 'n8n-workflow';
import { additionalEmailFields, fromFields, toField } from '../../shared/fields';

const operations: Array<'sendTemplate'> = ['sendTemplate'];

const showOnlyForSendTemplate = {
	resource: ['email'],
	operation: ['sendTemplate'],
};

export const emailSendTemplateDescription: INodeProperties[] = [
	...fromFields(operations),
	toField(operations),
	{
		displayName: 'Subject',
		name: 'subject',
		type: 'string',
		default: '',
		required: true,
		description: 'Email subject. Supports template variables such as {{ first_name }}.',
		displayOptions: {
			show: showOnlyForSendTemplate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'subject',
			},
		},
	},
	{
		displayName: 'Template ID',
		name: 'templateId',
		type: 'number',
		default: 0,
		required: true,
		description: 'ID of the template from the Maileroo Templates page',
		displayOptions: {
			show: showOnlyForSendTemplate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'template_id',
			},
		},
	},
	{
		displayName: 'Template Data',
		name: 'templateData',
		type: 'json',
		default: '{}',
		description: 'JSON object of template variables',
		displayOptions: {
			show: showOnlyForSendTemplate,
		},
		routing: {
			send: {
				type: 'body',
				property: 'template_data',
				value: '={{typeof $value === "string" ? JSON.parse($value) : $value}}',
			},
		},
	},
	additionalEmailFields(operations),
];
