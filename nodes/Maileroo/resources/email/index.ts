import type { INodeProperties } from 'n8n-workflow';
import { emailDeleteScheduledDescription } from './deleteScheduled';
import { emailGetScheduledDescription } from './getScheduled';
import { emailSendDescription } from './send';
import { emailSendBulkDescription } from './sendBulk';
import { emailSendTemplateDescription } from './sendTemplate';

const showOnlyForEmail = {
	resource: ['email'],
};

export const emailDescription: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForEmail,
		},
		options: [
			{
				name: 'Delete Scheduled',
				value: 'deleteScheduled',
				action: 'Delete a scheduled email',
				description: 'Cancel a scheduled email by its reference ID',
				routing: {
					request: {
						method: 'DELETE',
						url: '=/emails/scheduled/{{$parameter.referenceId}}',
					},
				},
			},
			{
				name: 'Get Scheduled',
				value: 'getScheduled',
				action: 'Get scheduled emails',
				description: 'List emails that are queued for later delivery',
				routing: {
					request: {
						method: 'GET',
						url: '/emails/scheduled',
					},
					output: {
						postReceive: [
							{
								type: 'rootProperty',
								properties: {
									property: 'data.results',
								},
							},
						],
					},
				},
			},
			{
				name: 'Send',
				value: 'send',
				action: 'Send an email',
				description: 'Send a basic HTML or plain text email',
				routing: {
					request: {
						method: 'POST',
						url: '/emails',
					},
				},
			},
			{
				name: 'Send Bulk',
				value: 'sendBulk',
				action: 'Send bulk emails',
				description: 'Send up to 500 personalized emails in one request',
				routing: {
					request: {
						method: 'POST',
						url: '/emails/bulk',
					},
				},
			},
			{
				name: 'Send Template',
				value: 'sendTemplate',
				action: 'Send a templated email',
				description: 'Send an email using a Maileroo template',
				routing: {
					request: {
						method: 'POST',
						url: '/emails/template',
					},
				},
			},
		],
		default: 'send',
	},
	...emailSendDescription,
	...emailSendTemplateDescription,
	...emailSendBulkDescription,
	...emailGetScheduledDescription,
	...emailDeleteScheduledDescription,
];
