import type { INodeProperties } from 'n8n-workflow';

const showOnlyForDeleteScheduled = {
	resource: ['email'],
	operation: ['deleteScheduled'],
};

export const emailDeleteScheduledDescription: INodeProperties[] = [
	{
		displayName: 'Reference ID',
		name: 'referenceId',
		type: 'string',
		default: '',
		required: true,
		description: '24-character hex reference ID of the scheduled email to delete',
		displayOptions: {
			show: showOnlyForDeleteScheduled,
		},
	},
];
