# Quick Start: EspoCRM on Laptop for crm.wildrosepainters.ca

## 🚀 Fastest Setup (5 minutes)

### Step 1: Create the Docker Compose file

```powershell
# Create directory
New-Item -ItemType Directory -Path C:\espocrm -Force
Set-Location C:\espocrm
```

Create `docker-compose.yml` with this content:

```yaml
version: '3.8'

services:
  espocrm:
    image: espocrm/espocrm:latest
    container_name: espocrm
    environment:
      ESPOCRM_DATABASE_HOST: espocrm-db
      ESPOCRM_DATABASE_USER: espocrm
      ESPOCRM_DATABASE_PASSWORD: SecurePassword123!
      ESPOCRM_ADMIN_USERNAME: admin
      ESPOCRM_ADMIN_PASSWORD: AdminPassword123!
      ESPOCRM_SITE_URL: http://localhost:8080
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
      MYSQL_ROOT_PASSWORD: RootPassword123!
      MYSQL_DATABASE: espocrm
      MYSQL_USER: espocrm
      MYSQL_PASSWORD: SecurePassword123!
    volumes:
      - espocrm-db-data:/var/lib/mysql
    restart: unless-stopped

volumes:
  espocrm-data:
  espocrm-db-data:
```

### Step 2: Start EspoCRM

```powershell
docker-compose up -d
```

### Step 3: Access EspoCRM

Open browser: http://localhost:8080

Login:
- Username: `admin`
- Password: `AdminPassword123!`

### Step 4: Create API User

1. Go to **Administration** (gear icon) → **Users**
2. Click **Create User**
3. Fill in:
   - First Name: `API`
   - Last Name: `User`
   - Username: `api_user`
   - Password: `ApiPassword123!`
   - Type: **API**
4. Save
5. Click on the user again
6. Find **API Key** section → Click **Generate**
7. Copy the API key

### Step 5: Add to Vercel

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   ```
   ESPOCRM_BASE_URL=http://localhost:8080
   ESPOCRM_API_KEY=<paste your API key here>
   ```
5. **Redeploy** your site

### ⚠️ Important: For Vercel Integration

**Problem:** Vercel can't reach `localhost:8080` on your laptop!

**Solution:** Choose one:

#### Option A: Use Cloudflare Tunnel (Easiest, No Port Forwarding)

```powershell
# Install cloudflared
winget install Cloudflare.cloudflared

# Login
cloudflared tunnel login

# Create tunnel
cloudflared tunnel create espocrm-tunnel

# Route DNS
cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca

# Create config file at C:\Users\<YourUser>\.cloudflared\config.yml
```

Config file content:
```yaml
tunnel: <YOUR_TUNNEL_ID_FROM_CREATE_COMMAND>
credentials-file: C:\Users\<YourUser>\.cloudflared\<TUNNEL_ID>.json

ingress:
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
  - service: http_status:404
```

Run tunnel:
```powershell
cloudflared tunnel run espocrm-tunnel
```

Update Vercel env variable:
```
ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
```

#### Option B: Deploy to a VPS ($5/month)

For production use, deploy to DigitalOcean, Linode, or Hetzner.

## 🧪 Test Integration

1. Go to your Vercel site
2. Submit a contact form
3. Check EspoCRM dashboard - lead should appear!

## 📧 Enable Email Notifications

1. In EspoCRM: **Administration** → **Outbound Emails**
2. Add your email account (Gmail, Outlook, etc.)
3. **Administration** → **Workflows**
4. Create workflow: **Lead** → **After record created** → **Send Email**

## 🔧 Useful Commands

```powershell
# View logs
docker logs espocrm
docker logs espocrm-db

# Stop containers
docker-compose down

# Start containers
docker-compose up -d

# Backup database
docker exec espocrm-db mysqldump -u espocrm -pSecurePassword123! espocrm > backup.sql

# Update EspoCRM
docker-compose pull
docker-compose up -d
```

## 📚 Next Steps

See `LOCAL_ESPOCRM_SETUP.md` for complete setup including:
- SSL/HTTPS configuration
- Production deployment options
- Advanced workflows
- Security best practices
