import type {
	IAuthenticateGeneric,
	Icon,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class MailerooApi implements ICredentialType {
	name = 'mailerooApi';

	displayName = 'Maileroo API';

	icon: Icon = { light: 'file:maileroo.svg', dark: 'file:maileroo.dark.svg' };

	documentationUrl = 'https://maileroo.com/docs/api-reference/emails/introduction';

	properties: INodeProperties[] = [
		{
			displayName: 'Sending Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description:
				'Sending key from the Maileroo dashboard (Domains → Sending Keys, or Applications)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'X-Api-Key': '={{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://smtp.maileroo.com/api/v2',
			url: '/emails/scheduled',
			method: 'GET',
		},
	};
}
