# Cloudflare Tunnel Setup Guide for EspoCRM

Complete walkthrough for setting up Cloudflare Tunnel to expose your laptop's EspoCRM to the internet securely.

## Why Cloudflare Tunnel?

✅ **No port forwarding** - Works behind any firewall/NAT
✅ **Automatic HTTPS** - Free SSL certificates
✅ **Secure** - No exposed ports on your router
✅ **Easy setup** - 15 minutes from start to finish
✅ **Free tier** - No cost for basic usage
✅ **DDoS protection** - Cloudflare's network protects you

## Prerequisites

- [ ] EspoCRM running locally on port 8080
- [ ] Domain managed by Cloudflare (wildrosepainters.ca)
- [ ] Admin access to Cloudflare account

## Step-by-Step Setup

### Step 1: Install Cloudflared

Choose your installation method:

#### Option A: Using winget (Recommended)
```powershell
winget install Cloudflare.cloudflared
```

#### Option B: Using Chocolatey
```powershell
choco install cloudflared
```

#### Option C: Manual Download
1. Download from: https://github.com/cloudflare/cloudflared/releases
2. Download `cloudflared-windows-amd64.exe`
3. Rename to `cloudflared.exe`
4. Move to `C:\Program Files\cloudflared\`
5. Add to PATH

**Verify installation:**
```powershell
cloudflared --version
```

### Step 2: Authenticate with Cloudflare

```powershell
cloudflared tunnel login
```

This will:
1. Open your browser
2. Ask you to select your domain (wildrosepainters.ca)
3. Create a certificate file at `C:\Users\<YourUser>\.cloudflared\cert.pem`

**Expected output:**
```
You have successfully logged in.
Certificate saved to: C:\Users\YourName\.cloudflared\cert.pem
```

### Step 3: Create a Tunnel

```powershell
cloudflared tunnel create espocrm-tunnel
```

**Expected output:**
```
Tunnel credentials written to C:\Users\YourName\.cloudflared\TUNNEL_ID.json
Created tunnel espocrm-tunnel with id TUNNEL_ID
```

**Important:** Copy the `TUNNEL_ID` from the output!

### Step 4: Create Configuration File

Create a file at `C:\Users\<YourUser>\.cloudflared\config.yml`:

```yaml
tunnel: e75936f1-2a7e-4101-90a1-3023a051b07d
credentials-file: C:\Users\ky\.cloudflared\e75936f1-2a7e-4101-90a1-3023a051b07d.json

ingress:
  # Route crm.wildrosepainters.ca to local EspoCRM
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
  
  # Catch-all rule (required, must be last)
  - service: http_status:404
```

#### Routing Every Site On This Machine

You can publish multiple Docker/localhost services through the same tunnel—just add a line per hostname. A common setup for this project looks like:

| Hostname | Local service | Default port |
| --- | --- | --- |
| `wildrosepainters.ca` | Next.js marketing site (`pnpm dev`/Docker) | 3000 |
| `portal.wildrosepainters.ca` | Contractor/Admin UI | 3100 |
| `api.wildrosepainters.ca` | API server or Supabase edge | 4000 |
| `crm.wildrosepainters.ca` | EspoCRM container | 8080 |

Update `config.yml` accordingly:

```yaml
tunnel: 12345678-1234-1234-1234-123456789abc
credentials-file: C:\Users\JohnDoe\.cloudflared\12345678-1234-1234-1234-123456789abc.json

ingress:
  - hostname: wildrosepainters.ca
    service: http://localhost:3000
  - hostname: portal.wildrosepainters.ca
    service: http://localhost:3100
  - hostname: api.wildrosepainters.ca
    service: http://localhost:4000
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
  - service: http_status:404
```

> 💡 Don’t expose these ports publicly via Docker `ports`. Use `expose` in your `docker-compose.yml` or bind to `localhost` so Cloudflare is the only entry point.

#### Register DNS records for every hostname

Once the ingress block lists all services, teach Cloudflare about each hostname. Repeat the command for every subdomain you added:

```powershell
cloudflared tunnel route dns espocrm-tunnel wildrosepainters.ca
cloudflared tunnel route dns espocrm-tunnel portal.wildrosepainters.ca
cloudflared tunnel route dns espocrm-tunnel api.wildrosepainters.ca
cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca
```

After routing DNS, restart the tunnel so the new mappings load:

```powershell
Restart-Service cloudflared
```

#### Verify each hostname

Use `curl` (or a browser on mobile data) to confirm Cloudflare is serving every site from this laptop. Example checks:

```powershell
curl https://wildrosepainters.ca --resolve wildrosepainters.ca:443:127.0.0.1
curl https://portal.wildrosepainters.ca
curl https://api.wildrosepainters.ca/health
curl https://crm.wildrosepainters.ca
```

Create a quick checklist and mark each item off once the URL loads without certificate warnings:

- [ ] `https://wildrosepainters.ca` returns the marketing site
- [ ] `https://portal.wildrosepainters.ca` shows the contractor/admin UI
- [ ] `https://api.wildrosepainters.ca` responds with a 200/health payload
- [ ] `https://crm.wildrosepainters.ca` loads EspoCRM login


**Replace:**
- `YOUR_TUNNEL_ID_HERE` with your actual tunnel ID
- `<YourUser>` with your Windows username
- `YOUR_TUNNEL_ID.json` with the actual JSON filename

**Example:**

```yaml
tunnel: 12345678-1234-1234-1234-123456789abc
credentials-file: C:\Users\JohnDoe\.cloudflared\12345678-1234-1234-1234-123456789abc.json

ingress:
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
  - service: http_status:404
```

### Step 5: Route DNS Through Cloudflare

```powershell
cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca
```

**Expected output:**

```
Created CNAME record for crm.wildrosepainters.ca
pointing to TUNNEL_ID.cfargotunnel.com
```

This automatically:

- Creates a CNAME record in Cloudflare DNS
- Points `crm.wildrosepainters.ca` to your tunnel
- No manual DNS configuration needed!

### Step 6: Test the Tunnel

**Start the tunnel:**

```powershell
cloudflared tunnel run espocrm-tunnel
```

**Expected output:**

```
2025-11-04T12:00:00Z INF Starting tunnel tunnelID=YOUR_TUNNEL_ID
2025-11-04T12:00:00Z INF Connection registered connIndex=0
2025-11-04T12:00:00Z INF Connection registered connIndex=1
2025-11-04T12:00:00Z INF Connection registered connIndex=2
2025-11-04T12:00:00Z INF Connection registered connIndex=3
```

**Test access:**

1. Open browser
2. Go to: `https://crm.wildrosepainters.ca`
3. You should see EspoCRM login page!

**Test from external network:**

```powershell
# Use curl or your phone with mobile data
curl https://crm.wildrosepainters.ca
```

### Step 7: Install as Windows Service (Auto-Start)

To make the tunnel start automatically on boot:

```powershell
# Stop the tunnel if running (Ctrl+C)

# Install as service
cloudflared service install

# Start the service
cloudflared service start

# Check status
Get-Service cloudflared
```

**Verify service:**

```powershell
# Should show "Running"
Get-Service cloudflared | Select-Object Name, Status, StartType
```

**Service will now:**
- ✅ Start automatically when Windows boots
- ✅ Restart automatically if it crashes
- ✅ Run in the background

### Step 8: Update Vercel Environment Variables

Now that your CRM is accessible via HTTPS:

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings → Environment Variables**
4. Update/Add:
  ```env
   ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
   ESPOCRM_API_KEY=<your_api_key_from_espocrm>
   ```
5. Save
6. **Redeploy** your site

### Step 9: Test End-to-End

1. Go to your Vercel site: `https://wildrosepainters.ca`
2. Submit a test lead through the contact form
3. Check EspoCRM: `https://crm.wildrosepainters.ca`
4. Verify the lead appears!

## 🎯 Verification Checklist

- [ ] Cloudflared installed and authenticated
- [ ] Tunnel created successfully
- [ ] Config file created with correct paths
- [ ] DNS route configured
- [ ] Can access <https://crm.wildrosepainters.ca>
- [ ] HTTPS certificate working (no warnings)
- [ ] Service installed and running
- [ ] Vercel environment variables updated
- [ ] Test lead submitted successfully
- [ ] Lead appears in EspoCRM

## 🔧 Managing the Tunnel

### Check Tunnel Status

```powershell
# List all tunnels
cloudflared tunnel list

# Check service status
Get-Service cloudflared
```

### View Tunnel Logs

```powershell
# View real-time logs
Get-Content "C:\ProgramData\cloudflared\logs\cloudflared.log" -Wait -Tail 50
```

### Restart Tunnel

```powershell
Restart-Service cloudflared
```

### Stop Tunnel

```powershell
Stop-Service cloudflared
```

### Start Tunnel

```powershell
Start-Service cloudflared
```

### Uninstall Service (if needed)

```powershell
cloudflared service uninstall
```

## 🔒 Security Features

### What Cloudflare Tunnel Provides:

1. **Encrypted Connection**
   - All traffic encrypted end-to-end
   - TLS 1.3 support
   - No unencrypted traffic

2. **DDoS Protection**
   - Cloudflare's network absorbs attacks
   - Rate limiting built-in
   - Bad actors blocked automatically

3. **No Exposed Ports**
   - No router port forwarding needed
   - No firewall holes required
   - Outbound connection only

4. **Access Control (Optional)**
   - Can add Cloudflare Access for authentication
   - IP whitelisting available
   - Audit logs in Cloudflare dashboard

### Additional Security Recommendations:

```powershell
# 1. Change default EspoCRM admin password
# 2. Use strong API keys
# 3. Enable two-factor authentication in EspoCRM
# 4. Regularly update containers
```

## 🚀 Performance Optimization

### Enable Argo Smart Routing (Optional - $5/month)

Argo optimizes routing for faster performance:

1. Go to Cloudflare Dashboard
2. Select your domain
3. Go to **Traffic → Argo**
4. Enable Argo Smart Routing

**Benefits:**
- 30% faster on average
- More reliable connections
- Better for high-traffic sites

### Configure Caching

In Cloudflare Dashboard:
1. Go to **Caching → Configuration**
2. Set browser cache TTL: 4 hours
3. Enable "Always Online"

## 🔍 Troubleshooting

### Tunnel Won't Start

**Check credentials:**
```powershell
# Verify files exist
ls C:\Users\$env:USERNAME\.cloudflared\

# Should see:
# - cert.pem
# - YOUR_TUNNEL_ID.json
# - config.yml
```

**Check config syntax:**
```powershell
# Validate config
cloudflared tunnel ingress validate
```

**Run with debug logging:**
```powershell
cloudflared tunnel --loglevel debug run espocrm-tunnel
```

### DNS Not Resolving

**Check DNS record in Cloudflare:**
1. Go to Cloudflare Dashboard
2. Select wildrosepainters.ca
3. Go to DNS → Records
4. Should see CNAME: `crm` pointing to `TUNNEL_ID.cfargotunnel.com`

**Clear DNS cache:**
```powershell
ipconfig /flushdns
```

**Test DNS:**
```powershell
nslookup crm.wildrosepainters.ca
```

### Certificate Errors

**Cloudflare SSL Mode:**
1. Go to Cloudflare Dashboard
2. SSL/TLS → Overview
3. Set to **"Full"** or **"Full (strict)"**

**Clear browser cache:**
- Hard refresh: `Ctrl + Shift + R`
- Or try incognito/private mode

### Connection Timeouts

**Check EspoCRM is running:**
```powershell
docker ps | findstr espocrm
curl http://localhost:8080
```

**Check tunnel is running:**
```powershell
Get-Service cloudflared
```

**Restart both:**
```powershell
docker restart espocrm
Restart-Service cloudflared
```

### Service Won't Install

**Run as Administrator:**
```powershell
# Right-click PowerShell → Run as Administrator
cloudflared service install
```

**Check existing service:**
```powershell
# Remove old service first if needed
cloudflared service uninstall
cloudflared service install
```

## 📊 Monitoring & Maintenance

### View Connection Stats

In Cloudflare Dashboard:
1. Go to **Zero Trust → Networks → Tunnels**
2. Click on your tunnel
3. View metrics:
   - Requests per second
   - Data transferred
   - Tunnel health

### Set Up Alerts

1. Go to **Notifications**
2. Create alert for:
   - Tunnel down
   - High error rate
   - Traffic spikes

### Regular Maintenance

**Weekly:**
```powershell
# Check service status
Get-Service cloudflared

# View recent logs
Get-Content "C:\ProgramData\cloudflared\logs\cloudflared.log" -Tail 100
```

**Monthly:**
```powershell
# Update cloudflared
winget upgrade Cloudflare.cloudflared

# Restart service after update
Restart-Service cloudflared
```

## 🎓 Advanced Configuration

### Multiple Services

You can route multiple services through one tunnel:

```yaml
tunnel: YOUR_TUNNEL_ID
credentials-file: C:\Users\<YourUser>\.cloudflared\YOUR_TUNNEL_ID.json

ingress:
  # EspoCRM
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
  
  # Another service (e.g., local dev site)
  - hostname: dev.wildrosepainters.ca
    service: http://localhost:3000
  
  # Catch-all
  - service: http_status:404
```

### Enable Access Control

Require login to access CRM:

1. Go to Cloudflare Zero Trust Dashboard
2. Access → Applications → Add Application
3. Choose **Self-hosted**
4. Configure:
   - Application domain: `crm.wildrosepainters.ca`
   - Identity providers: Google, email OTP, etc.
5. Add policies (e.g., only your email)

### Custom Headers

Add custom headers for security:

```yaml
ingress:
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
    originRequest:
      httpHostHeader: crm.wildrosepainters.ca
      noTLSVerify: false
```

## 💰 Cost

### Free Tier (What You Get)
- ✅ Unlimited tunnels
- ✅ Unlimited bandwidth
- ✅ DDoS protection
- ✅ SSL certificates
- ✅ Basic analytics

### Paid Options (Optional)
- **Argo Smart Routing:** $5/month + $0.10/GB
- **Cloudflare Access:** $0 for up to 50 users
- **Advanced DDoS:** Included in Pro plan ($20/month)

**For most small businesses, the free tier is sufficient!**

## ✅ Success!

You now have:
- ✅ EspoCRM accessible via HTTPS
- ✅ No port forwarding required
- ✅ Automatic SSL certificates
- ✅ DDoS protection
- ✅ Works from anywhere
- ✅ Auto-starts with Windows

Your CRM is now production-ready! 🎉

## 📚 Resources

- [Cloudflare Tunnel Docs](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/)
- [Cloudflared GitHub](https://github.com/cloudflare/cloudflared)
- [Cloudflare Community](https://community.cloudflare.com/)
- [Zero Trust Dashboard](https://one.dash.cloudflare.com/)

## 🆘 Need Help?

If you encounter issues:
1. Check tunnel logs
2. Verify config file syntax
3. Test local EspoCRM access first
4. Check Cloudflare DNS settings
5. Review firewall/antivirus settings

**Still stuck?** Check `TROUBLESHOOTING.md` or Cloudflare Community forums.
