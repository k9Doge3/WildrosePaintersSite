# EspoCRM Setup Guide for WildRose Painters

## What is EspoCRM?

EspoCRM is a **free, open-source CRM** that handles:
- Lead management and tracking
- Automatic email notifications
- Customer relationship management
- Sales pipeline tracking
- Task and calendar management

**Cost: $0** (self-hosted) vs Resend ($20/month) + other CRM tools ($50+/month)

## Quick Setup (Docker - Recommended)

### 1. Install EspoCRM with Docker

\`\`\`bash
# Create docker-compose.yml
version: '3.8'

services:
  espocrm:
    image: espocrm/espocrm:latest
    container_name: espocrm
    environment:
      ESPOCRM_DATABASE_HOST: espocrm-db
      ESPOCRM_DATABASE_USER: espocrm
      ESPOCRM_DATABASE_PASSWORD: your_secure_password
      ESPOCRM_ADMIN_USERNAME: admin
      ESPOCRM_ADMIN_PASSWORD: your_admin_password
      ESPOCRM_SITE_URL: http://localhost:8080
    ports:
      - "8080:80"
    volumes:
      - espocrm-data:/var/www/html
    depends_on:
      - espocrm-db

  espocrm-db:
    image: mysql:8.0
    container_name: espocrm-db
    environment:
      MYSQL_ROOT_PASSWORD: root_password
      MYSQL_DATABASE: espocrm
      MYSQL_USER: espocrm
      MYSQL_PASSWORD: your_secure_password
    volumes:
      - espocrm-db-data:/var/lib/mysql

volumes:
  espocrm-data:
  espocrm-db-data:
\`\`\`

\`\`\`bash
# Start EspoCRM
docker-compose up -d

# Access at http://localhost:8080
\`\`\`

### 2. Configure EspoCRM

1. **Login**: Go to `http://localhost:8080` and login with your admin credentials
2. **Create API User**:
   - Go to Administration → Users → Create User
   - Username: `api_user`
   - Set a strong password
   - Assign "API User" role
3. **Generate API Key**:
   - Go to Administration → API Users
   - Click on your API user
   - Generate API Key
   - Copy the key

### 3. Configure Email Notifications

1. **Setup SMTP**:
   - Go to Administration → Outbound Emails
   - Add your email provider (Gmail, SendGrid, etc.)
   - Test the connection

2. **Configure Lead Notifications**:
   - Go to Administration → Workflows
   - Create new workflow for "Lead" entity
   - Trigger: "After record created"
   - Action: "Send Email"
   - Configure email template with lead details

### 4. Add Environment Variables

Add these to your Vercel project (or `.env.local` for development):

\`\`\`bash
# Required
ESPOCRM_BASE_URL=http://localhost:8080

# Choose ONE authentication method:

# Option 1: API Key (Recommended)
ESPOCRM_API_KEY=your_api_key_here

# Option 2: Basic Auth
ESPOCRM_USERNAME=api_user
ESPOCRM_PASSWORD=your_password_here
\`\`\`

## Production Deployment

### Option 1: VPS (DigitalOcean, Linode, etc.)

1. Create a $5/month VPS
2. Install Docker and Docker Compose
3. Follow the Docker setup above
4. Point a subdomain (e.g., `crm.wildrosepainters.ca`) to your VPS
5. Setup SSL with Let's Encrypt
6. Update `ESPOCRM_BASE_URL` to your domain

### Option 2: Managed Hosting

Use EspoCRM's official hosting or services like:
- Cloudron (app platform with one-click EspoCRM)
- Softaculous (cPanel/Plesk installer)

## Features You Get for Free

✅ **Lead Management**: All leads automatically synced from your website
✅ **Email Notifications**: Instant alerts when new leads arrive
✅ **Lead Tracking**: Track status (New → Contacted → Qualified → Converted)
✅ **Customer Database**: Store all customer information
✅ **Task Management**: Create follow-up tasks for leads
✅ **Reports & Analytics**: Track conversion rates and sales pipeline
✅ **Mobile App**: iOS and Android apps available

## Testing the Integration

1. Submit a test lead on your website
2. Check EspoCRM dashboard - lead should appear
3. Check your email - you should receive a notification
4. Update lead status in EspoCRM to track progress

## Troubleshooting

**Connection Failed:**
- Verify `ESPOCRM_BASE_URL` is correct
- Check API key or credentials are valid
- Ensure EspoCRM is running (`docker ps`)

**No Email Notifications:**
- Verify SMTP settings in EspoCRM
- Check workflow is enabled
- Test email configuration in Administration

**Leads Not Syncing:**
- Check browser console for errors
- Verify API user has "Lead" entity permissions
- Check EspoCRM logs: `docker logs espocrm`

## Cost Comparison

| Solution | Monthly Cost | Features |
|----------|--------------|----------|
| **EspoCRM (Self-hosted)** | **$5** (VPS) | CRM + Email + Everything |
| Resend + HubSpot | $20 + $50 | Email + Basic CRM |
| Resend + Salesforce | $20 + $25 | Email + Basic CRM |

**Savings: $40-90/month = $480-1,080/year**
