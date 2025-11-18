# 🚀 Setting Up crm.wildrosepainters.ca on Your Laptop

Complete guide for hosting EspoCRM on your laptop and integrating with Vercel.

## 📋 What You'll Get

- ✅ Free, self-hosted CRM system
- ✅ Automatic lead capture from your website
- ✅ Email notifications for new leads
- ✅ Accessible via `crm.wildrosepainters.ca`
- ✅ Integrated with your Vercel-hosted site
- ✅ **Save $40-90/month** vs SaaS CRM solutions

## 🎯 Quick Start (Choose Your Path)

### Option 1: Just Want to Test? (5 minutes)
```powershell
# Run this script to start EspoCRM locally
.\setup-espocrm.ps1
```
Then open http://localhost:8080

**See:** `QUICKSTART_ESPOCRM.md`

### Option 2: Full Production Setup (1-2 hours)
Follow the complete guide with subdomain and Vercel integration.

**See:** `LOCAL_ESPOCRM_SETUP.md`

### Option 3: Step-by-Step Checklist
Use the interactive checklist to track your progress.

**See:** `ESPOCRM_CHECKLIST.md`

## 📚 Documentation Files

| File | Purpose | Time Required |
|------|---------|---------------|
| `QUICKSTART_ESPOCRM.md` | Get started in 5 minutes | ⏱️ 5 min |
| `LOCAL_ESPOCRM_SETUP.md` | Complete setup guide | ⏱️ 1-2 hours |
| `ESPOCRM_CHECKLIST.md` | Track your progress | ⏱️ Reference |
| `ESPOCRM_SETUP.md` | Original setup docs | ⏱️ Reference |
| `setup-espocrm.ps1` | Automated setup script | ⏱️ 5 min |
| `docker-compose.espocrm.yml` | Docker configuration | ⏱️ N/A |

## 🛠️ Prerequisites

Before you start, make sure you have:

- [ ] **Docker Desktop** installed on your laptop
  - Download: https://www.docker.com/products/docker-desktop/
- [ ] **Domain access** to configure DNS (for production)
- [ ] **Vercel account** with your site deployed

## 🎬 Getting Started

### Step 1: Install Docker Desktop

If you don't have Docker:
1. Download from https://www.docker.com/products/docker-desktop/
2. Install and restart your computer
3. Start Docker Desktop

### Step 2: Run Setup Script

```powershell
# Navigate to your project directory
cd "\\tsclient\D\vs code\WildrosePaintersSite-main"

# Run the setup script
.\setup-espocrm.ps1
```

The script will:
- ✅ Check if Docker is installed
- ✅ Start EspoCRM containers
- ✅ Wait for initialization
- ✅ Provide login credentials
- ✅ Open browser automatically

### Step 3: Configure API Access

1. Login to EspoCRM (credentials from script output)
2. Go to **Administration → Users → Create User**
3. Create an API user
4. Generate API key
5. Copy the key

### Step 4: Choose Deployment Method

You have 4 options:

#### A. Local Testing Only (Fastest)
- Works on your laptop only
- No internet access needed
- Cannot integrate with Vercel
- **Best for:** Initial testing

#### B. Cloudflare Tunnel (Recommended)
- No port forwarding needed
- Automatic HTTPS
- Works behind any firewall
- **Best for:** Home laptop setup

#### C. Port Forwarding + Caddy
- Traditional approach
- Requires router access
- Full control
- **Best for:** Static IP users

#### D. VPS Deployment
- Most reliable
- Always online
- $5-6/month cost
- **Best for:** Production use

### Step 5: Connect to Vercel

1. Add environment variables to Vercel:
   ```
   ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
   ESPOCRM_API_KEY=<your_api_key>
   ```
2. Redeploy your site
3. Test by submitting a lead

## 🔧 Deployment Options Comparison

| Feature | Local Only | Cloudflare Tunnel | Port Forward | VPS |
|---------|-----------|-------------------|--------------|-----|
| **Cost** | $0 | $0 | $0 | $5/mo |
| **Setup Time** | 5 min | 15 min | 30 min | 45 min |
| **Vercel Integration** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **HTTPS** | ❌ No | ✅ Auto | ⚙️ Manual | ✅ Auto |
| **Always Online** | ❌ No | ⚠️ If laptop on | ⚠️ If laptop on | ✅ Yes |
| **Port Forwarding** | ❌ No | ❌ No | ✅ Required | ❌ No |
| **Best For** | Testing | Home use | Static IP | Production |

## 📖 Detailed Guides

### For Complete Beginners
Start with `QUICKSTART_ESPOCRM.md`:
- Simple step-by-step instructions
- Copy-paste commands
- Screenshots and examples

### For Detailed Setup
Use `LOCAL_ESPOCRM_SETUP.md`:
- All deployment options explained
- Security best practices
- Troubleshooting guide
- Production setup instructions

### For Tracking Progress
Follow `ESPOCRM_CHECKLIST.md`:
- Interactive checkboxes
- Time estimates
- Success metrics
- Resource links

## 🚦 Testing Your Setup

After setup, test these:

1. **EspoCRM Access**
   - [ ] Can access http://localhost:8080
   - [ ] Can login with admin credentials
   - [ ] Dashboard loads correctly

2. **API Connection**
   - [ ] API user created
   - [ ] API key generated
   - [ ] Can access API endpoint

3. **Vercel Integration**
   - [ ] Environment variables added
   - [ ] Site redeployed
   - [ ] Form submission works
   - [ ] Lead appears in EspoCRM

4. **Email Notifications**
   - [ ] SMTP configured
   - [ ] Workflow created
   - [ ] Test email received

## 🔍 Troubleshooting

### EspoCRM Won't Start
```powershell
# Check if Docker is running
docker ps

# View logs
docker logs espocrm
docker logs espocrm-db

# Restart containers
docker-compose -f docker-compose.espocrm.yml restart
```

### Can't Access from Vercel
- Make sure you're using a public URL (not localhost)
- Test externally: `curl https://crm.wildrosepainters.ca`
- Check Cloudflare Tunnel is running
- Verify DNS settings

### Leads Not Syncing
- Check browser console (F12) for errors
- Verify API key in Vercel
- Test API: `curl -H "X-Api-Key: KEY" https://crm.wildrosepainters.ca/api/v1/Lead`
- Check EspoCRM API user permissions

## 💰 Cost Savings

### With EspoCRM (Self-Hosted)
- **CRM:** $0 (or $5/mo VPS)
- **Email:** $0 (SMTP)
- **Storage:** Unlimited
- **Users:** Unlimited
- **Total:** $0-5/month

### With SaaS Solutions
- **CRM:** $50-100/month
- **Email Service:** $20/month
- **Storage:** Limited
- **Users:** Per-user fees
- **Total:** $70-150/month

**Annual Savings: $780-1,740** 💰

## 🎓 Learning Resources

- [EspoCRM Documentation](https://docs.espocrm.com/)
- [Docker Documentation](https://docs.docker.com/)
- [Cloudflare Tunnel Guide](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Caddy Documentation](https://caddyserver.com/docs/)

## 🆘 Need Help?

1. Check the troubleshooting section in `LOCAL_ESPOCRM_SETUP.md`
2. Review Docker logs: `docker logs espocrm`
3. Test API endpoints manually
4. Check EspoCRM community forum
5. Review your existing `ESPOCRM_SETUP.md`

## ✨ Next Steps After Setup

1. **Week 1**
   - Monitor lead submissions
   - Test email notifications
   - Customize lead fields

2. **Week 2**
   - Create custom workflows
   - Set up lead assignment
   - Train team members

3. **Week 3**
   - Build custom dashboards
   - Set up reports
   - Optimize processes

4. **Ongoing**
   - Regular backups
   - Update containers
   - Review and improve

## 📝 Quick Commands Reference

```powershell
# Start EspoCRM
docker-compose -f docker-compose.espocrm.yml up -d

# Stop EspoCRM
docker-compose -f docker-compose.espocrm.yml down

# View logs
docker logs espocrm

# Restart
docker-compose -f docker-compose.espocrm.yml restart

# Backup database
docker exec espocrm-db mysqldump -u espocrm -pSecurePassword123! espocrm > backup.sql

# Update EspoCRM
docker-compose -f docker-compose.espocrm.yml pull
docker-compose -f docker-compose.espocrm.yml up -d
```

## 🎯 Success Checklist

You'll know your setup is complete when:

- ✅ EspoCRM accessible via subdomain
- ✅ Leads automatically captured from website
- ✅ Email notifications working
- ✅ Team can access and manage leads
- ✅ Integration tested and verified

---

**Ready to start?** Run `.\setup-espocrm.ps1` and follow `QUICKSTART_ESPOCRM.md`!

**Questions?** Check `LOCAL_ESPOCRM_SETUP.md` for detailed answers.

**Tracking progress?** Use `ESPOCRM_CHECKLIST.md` to stay organized.
