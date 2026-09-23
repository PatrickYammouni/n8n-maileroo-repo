import { NodeConnectionTypes, type INodeType, type INodeTypeDescription } from 'n8n-workflow';
import { emailDescription } from './resources/email';

export class Maileroo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Maileroo',
		name: 'maileroo',
		icon: { light: 'file:maileroo.svg', dark: 'file:maileroo.dark.svg' },
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Send and manage emails with the Maileroo Email API',
		defaults: {
			name: 'Maileroo',
		},
		usableAsTool: true,
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		credentials: [
			{
				name: 'mailerooApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://smtp.maileroo.com/api/v2',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Email',
						value: 'email',
					},
				],
				default: 'email',
			},
			...emailDescription,
		],
	};
}
