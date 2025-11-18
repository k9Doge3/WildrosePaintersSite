# EspoCRM Setup Checklist

Use this checklist to track your setup progress.

## Phase 1: Local Setup ⏱️ 10 minutes

- [ ] Docker Desktop installed
- [ ] Run `setup-espocrm.ps1` script
- [ ] EspoCRM accessible at http://localhost:8080
- [ ] Login successful with admin credentials
- [ ] EspoCRM dashboard loads correctly

## Phase 2: API Configuration ⏱️ 5 minutes

- [ ] Create API user in EspoCRM
  - [ ] Go to Administration → Users → Create User
  - [ ] Set Username: `api_user`
  - [ ] Set Type: **API**
  - [ ] Save user
- [ ] Generate API key
  - [ ] Click on API user
  - [ ] Find API Key section
  - [ ] Click Generate
  - [ ] Copy API key to safe location
- [ ] Set API user permissions
  - [ ] Administration → Roles
  - [ ] Ensure API user can Create/Read/Edit Leads

## Phase 3: Choose Deployment Strategy

Choose **ONE** option:

### Option A: Laptop Only (Development) ⏱️ 2 minutes
- [ ] Edit Windows hosts file (`C:\Windows\System32\drivers\etc\hosts`)
- [ ] Add line: `127.0.0.1 crm.wildrosepainters.ca`
- [ ] Access at http://crm.wildrosepainters.ca:8080
- [ ] ⚠️ **Note:** Vercel cannot reach this - local testing only

### Option B: Cloudflare Tunnel (Recommended) ⏱️ 15 minutes
- [ ] Install Cloudflare Tunnel: `winget install Cloudflare.cloudflared`
- [ ] Login: `cloudflared tunnel login`
- [ ] Create tunnel: `cloudflared tunnel create espocrm-tunnel`
- [ ] Copy tunnel ID from output
- [ ] Create config file at `C:\Users\<You>\.cloudflared\config.yml`
- [ ] Update config with your tunnel ID
- [ ] Route DNS: `cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca`
- [ ] Run tunnel: `cloudflared tunnel run espocrm-tunnel`
- [ ] Test access: https://crm.wildrosepainters.ca
- [ ] Install as service: `cloudflared service install`
- [ ] ✅ **Benefit:** Secure, no port forwarding, automatic HTTPS

### Option C: Port Forwarding + Caddy ⏱️ 30 minutes
- [ ] Find your public IP: https://whatismyip.com
- [ ] Configure DNS A record for `crm.wildrosepainters.ca` → Your IP
- [ ] Router port forwarding:
  - [ ] External port: 80 → Internal port: 8080
  - [ ] External port: 443 → Internal port: 8443
- [ ] Add Caddy to docker-compose.espocrm.yml
- [ ] Create Caddyfile
- [ ] Restart containers
- [ ] Test access: https://crm.wildrosepainters.ca

### Option D: VPS Deployment ⏱️ 45 minutes
- [ ] Choose provider (DigitalOcean, Linode, Hetzner)
- [ ] Create $5/month droplet/instance
- [ ] SSH into server
- [ ] Install Docker & Docker Compose
- [ ] Copy docker-compose.espocrm.yml to server
- [ ] Update DNS: `crm.wildrosepainters.ca` → VPS IP
- [ ] Add Caddy for SSL
- [ ] Start containers
- [ ] Test access

## Phase 4: Vercel Integration ⏱️ 5 minutes

- [ ] Go to Vercel dashboard
- [ ] Select your WildRose Painters project
- [ ] Navigate to Settings → Environment Variables
- [ ] Add variables:
  ```
  ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
  ESPOCRM_API_KEY=<your_api_key>
  ```
- [ ] Save environment variables
- [ ] Redeploy site (Deployments tab → Redeploy)
- [ ] Wait for deployment to complete

## Phase 5: Test Integration ⏱️ 5 minutes

- [ ] Go to your live Vercel site
- [ ] Navigate to contact form
- [ ] Fill out and submit a test lead
- [ ] Check EspoCRM dashboard
- [ ] Verify lead appears in Leads section
- [ ] Check browser console for errors (F12)
- [ ] Test from different device if possible

## Phase 6: Email Notifications ⏱️ 10 minutes

- [ ] Configure SMTP in EspoCRM
  - [ ] Administration → Outbound Emails
  - [ ] Add email account (Gmail/Outlook/SendGrid)
  - [ ] Test connection
  - [ ] Save
- [ ] Create notification workflow
  - [ ] Administration → Workflows
  - [ ] Create Workflow
  - [ ] Entity: Lead
  - [ ] Trigger: After record created
  - [ ] Action: Send Email
  - [ ] Configure recipient and template
  - [ ] Save and activate workflow
- [ ] Test email notification
  - [ ] Submit test lead
  - [ ] Check email inbox

## Phase 7: Customize EspoCRM (Optional) ⏱️ 30 minutes

- [ ] Customize Lead entity fields
  - [ ] Administration → Entity Manager → Lead
  - [ ] Add custom fields (e.g., Project Type, Budget Range)
- [ ] Create lead assignment rules
  - [ ] Administration → Workflows
  - [ ] Auto-assign leads to team members
- [ ] Set up custom dashboards
  - [ ] Create dashboards for different roles
  - [ ] Add charts and reports
- [ ] Configure lead stages
  - [ ] Customize status options (New, Contacted, Qualified, Won, Lost)

## Phase 8: Security & Maintenance ⏱️ 10 minutes

- [ ] Change default passwords
  - [ ] Update admin password
  - [ ] Update API user password
  - [ ] Update database passwords in docker-compose
- [ ] Set up automatic backups
  - [ ] Create backup script
  - [ ] Schedule with Windows Task Scheduler
- [ ] Configure laptop power settings
  - [ ] Disable sleep mode (if using laptop as server)
  - [ ] Set up startup script
- [ ] Document credentials in password manager

## Phase 9: Training & Documentation ⏱️ Ongoing

- [ ] Create user guide for team
- [ ] Train team on lead management
- [ ] Document workflows and processes
- [ ] Set up regular review meetings

## Troubleshooting Checklist

If something doesn't work, check:

### EspoCRM Not Accessible
- [ ] Docker containers running: `docker ps`
- [ ] Check logs: `docker logs espocrm`
- [ ] Port 8080 not in use by another app
- [ ] Firewall allowing connections

### Vercel Can't Connect
- [ ] ESPOCRM_BASE_URL uses public domain (not localhost)
- [ ] Cloudflare Tunnel or port forwarding working
- [ ] Test externally: `curl https://crm.wildrosepainters.ca`
- [ ] API key is correct in Vercel

### Leads Not Syncing
- [ ] Check browser console for errors
- [ ] Verify API user has Lead permissions
- [ ] Test API manually: `curl -H "X-Api-Key: KEY" https://crm.wildrosepainters.ca/api/v1/Lead`
- [ ] Check EspoCRM logs

### Email Notifications Not Working
- [ ] SMTP credentials correct
- [ ] Email workflow is active
- [ ] Test email configuration in EspoCRM
- [ ] Check spam folder

## Success Metrics

After setup, you should have:

✅ **Lead Management**
- Automatic lead capture from website
- Lead tracking in EspoCRM dashboard
- Lead assignment to team members

✅ **Notifications**
- Email alerts for new leads
- Customizable email templates
- Team notifications

✅ **Cost Savings**
- $0 CRM cost (or $5-6/month for VPS)
- $0 email notification costs
- No per-user pricing

✅ **Full Control**
- Self-hosted solution
- Complete customization
- Data ownership

## Next Steps After Setup

1. **Week 1:** Monitor lead flow and notifications
2. **Week 2:** Customize fields and workflows
3. **Week 3:** Train team on CRM usage
4. **Month 1:** Review and optimize processes
5. **Ongoing:** Regular backups and updates

## Resources

- 📚 [EspoCRM Documentation](https://docs.espocrm.com/)
- 🎥 [EspoCRM YouTube Channel](https://www.youtube.com/c/EspoCRM)
- 💬 [EspoCRM Community Forum](https://forum.espocrm.com/)
- 🐛 [GitHub Issues](https://github.com/espocrm/espocrm)

## Support

If you need help:
1. Check `LOCAL_ESPOCRM_SETUP.md` for detailed guide
2. Check `QUICKSTART_ESPOCRM.md` for quick reference
3. Review EspoCRM documentation
4. Check Docker logs for errors
5. Test API endpoints manually

---

**Total Setup Time:** 1-2 hours (depending on deployment option)
**Ongoing Maintenance:** 15 minutes/week (updates, backups)
