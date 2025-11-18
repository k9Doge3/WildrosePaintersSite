# Setting Up crm.wildrosepainters.ca on Your Laptop

This guide will help you set up EspoCRM on your laptop and make it accessible via `crm.wildrosepainters.ca` subdomain, integrated with your Vercel-hosted website.

## Prerequisites

- Docker Desktop installed on your laptop
- A domain name (`wildrosepainters.ca`) with DNS access
- Vercel account with your site deployed
- Port forwarding access on your router (if you want external access)

## Part 1: Install EspoCRM Locally with Docker

### Step 1: Create Docker Compose File

Create a file named `docker-compose.yml` in a new directory (e.g., `C:\espocrm`):

```yaml
version: '3.8'

services:
  espocrm:
    image: espocrm/espocrm:latest
    container_name: espocrm
    environment:
      ESPOCRM_DATABASE_HOST: espocrm-db
      ESPOCRM_DATABASE_USER: espocrm
      ESPOCRM_DATABASE_PASSWORD: poofpoof1
      ESPOCRM_ADMIN_USERNAME: admin
      ESPOCRM_ADMIN_PASSWORD: poofpoof1
      ESPOCRM_SITE_URL: http://crm.wildrosepainters.ca
    ports:
      - "8080:80"
    volumes:
      - espocrm-data:/var/www/html
    depends_on:
      - espocrm-db
    restart: unless-stopped

  espocrm-db:
    image: mysql:8.0
    container_name: espocrm-db
    environment:
      MYSQL_ROOT_PASSWORD: poofpoof1
      MYSQL_DATABASE: espocrm
      MYSQL_USER: espocrm
      MYSQL_PASSWORD: poofpoof1
    volumes:
      - espocrm-db-data:/var/lib/mysql
    restart: unless-stopped

volumes:
  espocrm-data:
  espocrm-db-data:
```

### Step 2: Start EspoCRM

Open PowerShell in the directory with `docker-compose.yml`:

```powershell
# Start EspoCRM
docker-compose up -d

# Check if containers are running
docker ps

# View logs
docker logs espocrm
```

### Step 3: Access EspoCRM Locally

1. Open browser and go to `http://localhost:8080`
2. Login with:
   - Username: `admin`
   - Password: `AdminPassword123!` (or what you set)

## Part 2: Make EspoCRM Accessible via crm.wildrosepainters.ca

You have **two options** depending on whether you want external access:

### Option A: Local Development Only (Easiest)

Edit your `hosts` file to map the subdomain locally:

**Windows:**
1. Open `C:\Windows\System32\drivers\etc\hosts` as Administrator
2. Add this line:
   ```
   127.0.0.1 crm.wildrosepainters.ca
   ```
3. Save the file
4. Now you can access EspoCRM at `http://crm.wildrosepainters.ca:8080`

**Note:** This only works on your laptop. Your Vercel site won't be able to reach it.

### Option B: External Access (Recommended for Production)

This makes your CRM accessible from anywhere, including your Vercel site.

#### Step 1: Set Up Dynamic DNS or Static IP

**Option B1: Use a Dynamic DNS Service (if you have a dynamic IP)**

1. Sign up for a free DDNS service:
   - [No-IP](https://www.noip.com/) (Free tier available)
   - [DuckDNS](https://www.duckdns.org/) (Free)
   - [Dynu](https://www.dynu.com/) (Free)

2. Create a hostname (e.g., `espocrm.duckdns.org`)
3. Install their client to keep your IP updated

**Option B2: Use Cloudflare Tunnel (Recommended - No Port Forwarding)**

Cloudflare Tunnel is the easiest and most secure option:

1. **Install Cloudflare Tunnel (cloudflared):**
   ```powershell
   # Download from https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/install-and-setup/installation/
   # Or use chocolatey:
   choco install cloudflared
   ```

2. **Authenticate:**
   ```powershell
   cloudflared tunnel login
   ```

3. **Create a tunnel:**
   ```powershell
   cloudflared tunnel create espocrm-tunnel
   ```

4. **Create tunnel configuration** (`C:\Users\YourUser\.cloudflared\config.yml`):
   ```yaml
   tunnel: YOUR_TUNNEL_ID
   credentials-file: C:\Users\YourUser\.cloudflared\YOUR_TUNNEL_ID.json

   ingress:
     - hostname: crm.wildrosepainters.ca
       service: http://localhost:8080
     - service: http_status:404
   ```

5. **Route DNS through Cloudflare:**
   ```powershell
   cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca
   ```

6. **Run the tunnel:**
   ```powershell
   cloudflared tunnel run espocrm-tunnel
   ```

7. **Install as a Windows Service (to run automatically):**
   ```powershell
   cloudflared service install
   ```

#### Step 2: Configure DNS

If you're not using Cloudflare Tunnel:

1. Log in to your domain registrar/DNS provider
2. Add an A record:
   - **Name:** `crm`
   - **Type:** `A`
   - **Value:** Your public IP address (find it at whatismyip.com)
   - **TTL:** 300

#### Step 3: Port Forward (Skip if using Cloudflare Tunnel)

1. Log in to your router's admin panel
2. Find Port Forwarding settings
3. Create a new rule:
   - **External Port:** 80 (or 443 for HTTPS)
   - **Internal Port:** 8080
   - **Internal IP:** Your laptop's local IP (e.g., 192.168.1.100)
   - **Protocol:** TCP

#### Step 4: Set Up HTTPS with Caddy (Recommended)

Use Caddy as a reverse proxy for automatic SSL:

1. **Create `Caddyfile`:**
   ```
   crm.wildrosepainters.ca {
       reverse_proxy localhost:8080
   }
   ```

2. **Add Caddy to docker-compose.yml:**
   ```yaml
   services:
     caddy:
       image: caddy:latest
       container_name: caddy
       ports:
         - "80:80"
         - "443:443"
       volumes:
         - ./Caddyfile:/etc/caddy/Caddyfile
         - caddy-data:/data
         - caddy-config:/config
       restart: unless-stopped
   
   volumes:
     caddy-data:
     caddy-config:
   ```

3. **Update EspoCRM port mapping** (remove port 8080 from host):
   ```yaml
   espocrm:
     ports: []  # Caddy will handle external access
   ```

4. **Restart containers:**
   ```powershell
   docker-compose down
   docker-compose up -d
   ```

Now your CRM is accessible at `https://crm.wildrosepainters.ca`

## Part 3: Configure EspoCRM for API Access

### Step 1: Create API User

1. Login to EspoCRM (`https://crm.wildrosepainters.ca`)
2. Go to **Administration → Users → Create User**
3. Fill in:
   - **Username:** `api_user`
   - **Password:** Create a strong password
   - **Type:** API
4. Click **Save**

### Step 2: Generate API Key

1. Click on the API user you just created
2. Find **API Key** section
3. Click **Generate**
4. Copy the API key (you'll need this for Vercel)

### Step 3: Set Permissions

1. Go to **Administration → Roles**
2. Create or edit the API user's role
3. Ensure permissions for:
   - **Leads:** Create, Read, Edit
   - **Contacts:** Create, Read
   - **Accounts:** Create, Read

## Part 4: Connect Vercel to EspoCRM

### Step 1: Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings → Environment Variables**
3. Add the following variables:

   ```
   ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
   ESPOCRM_API_KEY=your_api_key_from_step_3
   ```

   Or if using username/password:
   ```
   ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
   ESPOCRM_USERNAME=api_user
   ESPOCRM_PASSWORD=your_password
   ```

4. Click **Save**
5. Redeploy your site for changes to take effect

### Step 2: Test the Integration

1. Go to your Vercel site
2. Fill out a contact form
3. Check EspoCRM - the lead should appear
4. Check browser console for any errors

## Part 5: Configure Email Notifications

### Step 1: Set Up SMTP in EspoCRM

1. Go to **Administration → Outbound Emails**
2. Click **Create Email Account**
3. Configure your email provider:

   **Gmail Example:**
   - **SMTP Server:** smtp.gmail.com
   - **Port:** 587
   - **Security:** TLS
   - **Username:** your-email@gmail.com
   - **Password:** Your app password (not regular password)

   **Note:** For Gmail, create an [App Password](https://myaccount.google.com/apppasswords)

4. Click **Test Connection**
5. Click **Save**

### Step 2: Create Email Notification Workflow

1. Go to **Administration → Workflows**
2. Click **Create Workflow**
3. Configure:
   - **Entity Type:** Lead
   - **Name:** New Lead Notification
4. In **Conditions:**
   - **Trigger Type:** After record created
5. In **Actions:**
   - Click **Add Action → Send Email**
   - **To:** Your email address
   - **Template:** Create a template with lead details
6. Click **Save**

## Part 6: Keep Your Laptop Running as a Server

### Option 1: Keep Laptop Always On

1. **Disable Sleep:**
   - Settings → System → Power & Sleep
   - Set sleep to "Never"

2. **Create a startup script** to auto-start Docker containers:
   
   Create `start-espocrm.bat`:
   ```batch
   @echo off
   cd C:\espocrm
   docker-compose up -d
   ```

3. **Add to Windows Startup:**
   - Press `Win + R`
   - Type `shell:startup`
   - Create shortcut to your `.bat` file

### Option 2: Use a Low-Cost VPS (Recommended for Production)

If keeping your laptop on 24/7 is impractical, consider:

- **DigitalOcean:** $6/month droplet
- **Linode:** $5/month Nanode
- **Vultr:** $5/month instance
- **Hetzner:** €4.51/month Cloud CX22

Transfer your Docker setup to the VPS using the same steps.

## Testing & Troubleshooting

### Test Connection

```powershell
# Test from PowerShell
curl http://localhost:8080

# Test API endpoint
curl -X GET "http://localhost:8080/api/v1/Lead" -H "X-Api-Key: YOUR_API_KEY"
```

### Common Issues

**Issue: Container won't start**
```powershell
docker logs espocrm
docker logs espocrm-db
```

**Issue: Can't connect from Vercel**
- Verify firewall allows incoming connections on port 80/443
- Check router port forwarding is correct
- Test from external network: `curl https://crm.wildrosepainters.ca`

**Issue: SSL certificate errors**
- Ensure DNS is pointing to your IP
- Wait a few minutes for DNS propagation
- Check Caddy logs: `docker logs caddy`

**Issue: Vercel can't reach laptop CRM**
- This is expected with Option A (hosts file)
- Use Option B with Cloudflare Tunnel or port forwarding
- Alternatively, deploy EspoCRM to a VPS

## Security Best Practices

1. **Use strong passwords** for admin and API users
2. **Enable HTTPS** with Caddy or Let's Encrypt
3. **Limit API user permissions** to only what's needed
4. **Regular backups:**
   ```powershell
   docker-compose exec espocrm-db mysqldump -u espocrm -p espocrm > backup.sql
   ```
5. **Update regularly:**
   ```powershell
   docker-compose pull
   docker-compose up -d
   ```

## Cost Analysis

### Laptop Setup
- **Cost:** $0/month (electricity ~$2-5/month)
- **Pros:** Full control, no ongoing fees
- **Cons:** Laptop must stay on, uses your internet

### VPS Setup
- **Cost:** $5-6/month
- **Pros:** Always online, professional setup, better performance
- **Cons:** Monthly fee

**Both are 90% cheaper than SaaS CRM solutions!**

## Next Steps

1. ✅ Set up EspoCRM locally
2. ✅ Make it accessible via subdomain
3. ✅ Connect to Vercel
4. ✅ Configure email notifications
5. ⬜ Customize lead fields in EspoCRM
6. ⬜ Set up lead assignment workflows
7. ⬜ Create custom dashboards
8. ⬜ Train team on using CRM

## Resources

- [EspoCRM Documentation](https://docs.espocrm.com/)
- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Docker Documentation](https://docs.docker.com/)
- [Caddy Documentation](https://caddyserver.com/docs/)
