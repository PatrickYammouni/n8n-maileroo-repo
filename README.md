# n8n-nodes-maileroo

This is an n8n community node. It lets you send and manage emails with [Maileroo](https://maileroo.com) in your n8n workflows.

Maileroo is an email delivery platform for transactional and marketing email. This node uses the [Maileroo Email API](https://maileroo.com/docs/api-reference/emails/introduction).

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/sustainable-use-license/) workflow automation platform.

[Installation](#installation)
[Operations](#operations)
[Credentials](#credentials)
[Compatibility](#compatibility)
[Usage](#usage)
[Resources](#resources)
[Version history](#version-history)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

For local development:

```bash
export PATH="/opt/homebrew/opt/node@24/bin:$PATH"
cd n8n-nodes-maileroo
npm install
npm run dev
```

Then open `http://localhost:5678` and search for **Maileroo**. Current n8n requires Node 24. `npm run dev` sets `N8N_EXPRESSION_ENGINE=legacy` so n8n can start if `isolated-vm` fails to load on this Mac.

## Operations

All operations use the Email API at `https://smtp.maileroo.com/api/v2`.

- **Send** — send a basic HTML and/or plain text email
- **Send Template** — send an email from a Maileroo template
- **Send Bulk** — send up to 500 personalized emails
- **Get Scheduled** — list emails queued for later delivery
- **Delete Scheduled** — cancel a scheduled email by reference ID

## Credentials

Create a sending key in the Maileroo dashboard:

1. Open [Maileroo](https://app.maileroo.com) and verify the domain you want to send from.
2. Go to **Domains → Sending Keys**, or create an application under **Applications**.
3. Copy the sending key into the Maileroo credential in n8n.

The node sends the key as the `X-Api-Key` header.

The credential test calls `GET /emails/scheduled`. Application-scoped keys may need a domain when listing scheduled emails; the test can fail for those keys even when sending works.

## Compatibility

Built with the official n8n-node tool as a declarative HTTP API node. Compatible with current n8n 1.x / 2.x releases.

## Usage

### Send a basic email

1. Add the Maileroo node and choose **Email → Send**.
2. Set **From Email** to an address on a verified Maileroo domain.
3. Add at least one **To** recipient.
4. Enter a subject and HTML or plain text body.

Optional fields cover CC, BCC, reply-to, tracking, tags, headers, attachments, scheduling, and a custom reference ID.

To attach a file from a previous node, set **Content** to `{{ $binary.data.data }}` and **File Name** to `{{ $binary.data.fileName }}`.

### Send a templated email

Choose **Send Template**, enter the numeric **Template ID** from the Maileroo Templates page, and pass **Template Data** as JSON.

### Send bulk emails

**Messages** is a JSON array. Each item needs `from` and `to` (Maileroo EmailObjects) and may include `template_data`. Scheduled delivery is not supported on the bulk endpoint.

### Schedule or cancel an email

Set **Scheduled At** on Send or Send Template to an RFC 3339 timestamp or a phrase such as `in 2 hours`. Use **Get Scheduled** and **Delete Scheduled** with the returned `reference_id` to review or cancel.

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Maileroo documentation](https://maileroo.com/docs)
- [Maileroo Email API](https://maileroo.com/docs/api-reference/emails/introduction)

## Version history

### 0.1.0

Initial release: send, send template, send bulk, list scheduled emails, and delete a scheduled email.
