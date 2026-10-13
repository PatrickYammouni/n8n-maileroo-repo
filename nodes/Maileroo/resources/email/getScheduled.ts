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
		displayName: 'Return All',
		name: 'returnAll',
		type: 'boolean',
		default: false,
		description: 'Whether to return all results or only up to a given limit',
		displayOptions: {
			show: showOnlyForGetScheduled,
		},
		routing: {
			send: {
				paginate: '={{ $value }}',
			},
			operations: {
				pagination: {
					type: 'generic',
					properties: {
						continue: '={{ $response.body.data.page < $response.body.data.total_pages }}',
						request: {
							qs: {
								domain: '={{ $parameter.domain || undefined }}',
								page: '={{ $response.body ? $response.body.data.page + 1 : 1 }}',
								per_page: 100,
							},
						},
					},
				},
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
			show: {
				...showOnlyForGetScheduled,
				returnAll: [false],
			},
		},
		routing: {
			send: {
				type: 'query',
				property: 'per_page',
			},
		},
	},
];
