import type { INodeProperties } from 'n8n-workflow';

const showOnlyForGetScheduled = {
	resource: ['email'],
	operation: ['getScheduled'],
};

export const emailGetScheduledDescription: INodeProperties[] = [
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		placeholder: 'yourdomain.com',
		description: 'Required for application-scoped sending keys. Optional for domain-scoped keys.',
		displayOptions: {
			show: showOnlyForGetScheduled,
		},
		routing: {
			send: {
				type: 'query',
				property: 'domain',
				value: '={{$value || undefined}}',
			},
		},
	},
	{
		displayName: 'Limit',
		name: 'limit',
		type: 'number',
		typeOptions: {
			minValue: 1,
			maxValue: 100,
		},
		default: 50,
		description: 'Max number of results to return',
		displayOptions: {
			show: showOnlyForGetScheduled,
		},
		routing: {
			send: {
				type: 'query',
				property: 'per_page',
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		typeOptions: {
			minValue: 1,
		},
		default: 1,
		description: 'Page of results to return',
		displayOptions: {
			show: showOnlyForGetScheduled,
		},
		routing: {
			send: {
				type: 'query',
				property: 'page',
			},
		},
	},
];
