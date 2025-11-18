# EspoCRM Troubleshooting Guide

Quick solutions to common issues when setting up EspoCRM on your laptop.

## 🔍 Quick Diagnostics

Run these commands first to gather information:

```powershell
# Check Docker status
docker --version
docker ps
docker-compose ps

# Check EspoCRM logs
docker logs espocrm --tail 50

# Check database logs
docker logs espocrm-db --tail 50

# Test local access
curl http://localhost:8080

# Test API endpoint
curl -X GET "http://localhost:8080/api/v1/App/user" -H "X-Api-Key: YOUR_KEY"
```

## Common Issues & Solutions

### 1. "Docker is not installed" or "command not found"

**Problem:** Docker Desktop not installed or not in PATH

**Solutions:**
```powershell
# Install Docker Desktop
# Download from: https://www.docker.com/products/docker-desktop/

# After install, restart PowerShell and try:
docker --version

# If still not working, add to PATH:
$env:Path += ";C:\Program Files\Docker\Docker\resources\bin"
```

---

### 2. "Docker daemon is not running"

**Problem:** Docker Desktop is not started

**Solutions:**
1. Start Docker Desktop from Start Menu
2. Wait for Docker icon in system tray to show "running"
3. Retry your command

---

### 3. Port 8080 Already in Use

**Problem:** Another application is using port 8080

**Check what's using the port:**
```powershell
netstat -ano | findstr :8080
```

**Solutions:**

**Option A:** Stop the other application
```powershell
# Find the process ID (PID) from netstat output
# Stop it (replace 1234 with actual PID):
taskkill /PID 1234 /F
```

**Option B:** Change EspoCRM port
Edit `docker-compose.espocrm.yml`:
```yaml
ports:
  - "9090:80"  # Changed from 8080:80
```

Then access at http://localhost:9090

---

### 4. EspoCRM Container Won't Start

**Check logs:**
```powershell
docker logs espocrm
```

**Common causes:**

**Database not ready:**
```
Solution: Wait 30 seconds and check again
docker restart espocrm
```

**Permission issues:**
```powershell
# Remove volumes and start fresh
docker-compose -f docker-compose.espocrm.yml down -v
docker-compose -f docker-compose.espocrm.yml up -d
```

**Out of disk space:**
```powershell
# Clean up Docker
docker system prune -a
```

---

### 5. MySQL Database Connection Failed

**Error:** "Can't connect to MySQL server"

**Check database logs:**
```powershell
docker logs espocrm-db
```

**Solutions:**

**Database still initializing:**
```powershell
# Wait for message: "ready for connections"
docker logs espocrm-db -f
```

**Wrong credentials:**
Check `docker-compose.espocrm.yml` - ensure:
- `ESPOCRM_DATABASE_PASSWORD` matches `MYSQL_PASSWORD`
- `ESPOCRM_DATABASE_USER` matches `MYSQL_USER`

**Restart database:**
```powershell
docker restart espocrm-db
docker restart espocrm
```

---

### 6. Can't Access http://localhost:8080

**Problem:** Browser shows "Can't reach this page"

**Diagnostics:**
```powershell
# Check if container is running
docker ps | findstr espocrm

# Check if port is mapped correctly
docker port espocrm

# Test with curl
curl http://localhost:8080
```

**Solutions:**

**Container not running:**
```powershell
docker-compose -f docker-compose.espocrm.yml up -d
```

**Firewall blocking:**
```powershell
# Temporarily disable Windows Firewall and test
# If that works, add Docker to firewall exceptions
```

**Try IP address instead:**
```
http://127.0.0.1:8080
```

---

### 7. Vercel Cannot Connect to EspoCRM

**Problem:** API calls from Vercel fail with timeout or connection error

**Common causes:**

**Using localhost in ESPOCRM_BASE_URL:**
```
❌ ESPOCRM_BASE_URL=http://localhost:8080
✅ ESPOCRM_BASE_URL=https://crm.wildrosepainters.ca
```

**Cloudflare Tunnel not running:**
```powershell
# Check tunnel status
cloudflared tunnel list

# Start tunnel
cloudflared tunnel run espocrm-tunnel
```

**DNS not configured:**
```powershell
# Test external access
curl https://crm.wildrosepainters.ca
```

**Firewall/Router blocking:**
- Check port forwarding rules
- Test from external network (use phone with mobile data)

---

### 8. API Authentication Failed

**Error:** 401 Unauthorized or "Authentication required"

**Check API key:**
```powershell
# Test API with key
curl -X GET "http://localhost:8080/api/v1/Lead" `
  -H "X-Api-Key: YOUR_API_KEY_HERE"
```

**Solutions:**

**Regenerate API key:**
1. Login to EspoCRM
2. Go to API user
3. Generate new API key
4. Update Vercel environment variable
5. Redeploy Vercel site

**Check API user type:**
- User must be type "API"
- Check in Administration → Users

**Check permissions:**
- Administration → Roles
- API user role must have:
  - Lead: Create, Read, Edit
  - Contact: Create, Read
  - Account: Create, Read

---

### 9. Leads Not Appearing in EspoCRM

**Problem:** Form submitted but no lead in CRM

**Check browser console:**
```
F12 → Console tab
Look for errors in red
```

**Check Vercel logs:**
1. Go to Vercel dashboard
2. Click on your deployment
3. View Function Logs
4. Look for errors

**Test API directly:**
```powershell
# Test creating a lead
curl -X POST "https://crm.wildrosepainters.ca/api/v1/Lead" `
  -H "Content-Type: application/json" `
  -H "X-Api-Key: YOUR_API_KEY" `
  -d '{
    "firstName": "Test",
    "lastName": "Lead",
    "emailAddress": "test@example.com"
  }'
```

**Check EspoCRM logs:**
```powershell
docker logs espocrm | findstr "error"
```

---

### 10. Email Notifications Not Working

**Problem:** Leads created but no email received

**Check SMTP configuration:**
1. Administration → Outbound Emails
2. Click on email account
3. Click "Test Connection"

**Common SMTP issues:**

**Gmail App Password:**
- Can't use regular password
- Must create App Password:
  1. Google Account → Security
  2. 2-Step Verification → App Passwords
  3. Generate password for "Mail"

**Wrong SMTP settings:**
```
Gmail:
- Server: smtp.gmail.com
- Port: 587
- Security: TLS

Outlook:
- Server: smtp-mail.outlook.com
- Port: 587
- Security: TLS
```

**Check workflow:**
1. Administration → Workflows
2. Find "New Lead Notification"
3. Make sure it's active (green toggle)
4. Check trigger: "After record created"
5. Check action: "Send Email"

---

### 11. Cloudflare Tunnel Issues

**Tunnel won't start:**
```powershell
# Check credentials file exists
ls C:\Users\$env:USERNAME\.cloudflared\

# Verify config.yml
cat C:\Users\$env:USERNAME\.cloudflared\config.yml

# Run with verbose logging
cloudflared tunnel --loglevel debug run espocrm-tunnel
```

**Tunnel connects but site not accessible:**
```powershell
# Check DNS routing
cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca

# Verify in Cloudflare dashboard
# DNS should show CNAME record
```

**Certificate errors:**
- Cloudflare tunnels use automatic SSL
- May take 1-2 minutes to provision
- Clear browser cache and retry

---

### 12. SSL/HTTPS Issues

**"Your connection is not private" error**

**With Caddy:**
```powershell
# Check Caddy logs
docker logs caddy

# Caddy needs port 80 and 443 open for ACME challenge
# Check firewall/router allows these ports
```

**With Cloudflare Tunnel:**
- SSL is automatic
- If error persists, check Cloudflare SSL settings
- Use "Full" or "Full (Strict)" mode

---

### 13. Performance Issues / Slow Response

**EspoCRM slow to load:**

**Check container resources:**
```powershell
docker stats espocrm espocrm-db
```

**Increase resources in Docker Desktop:**
1. Settings → Resources
2. Increase Memory to 4GB
3. Increase CPU to 2 cores
4. Apply & Restart

**Optimize MySQL:**
```powershell
# Access MySQL container
docker exec -it espocrm-db mysql -u espocrm -pSecurePassword123!

# Run inside MySQL:
OPTIMIZE TABLE lead;
OPTIMIZE TABLE contact;
```

---

### 14. Data Loss / Need to Reset

**Start completely fresh:**
```powershell
# WARNING: This deletes all data!
docker-compose -f docker-compose.espocrm.yml down -v
docker-compose -f docker-compose.espocrm.yml up -d
```

**Restore from backup:**
```powershell
# If you have a backup .sql file
docker exec -i espocrm-db mysql -u espocrm -pSecurePassword123! espocrm < backup.sql
```

---

### 15. Vercel Environment Variables Not Working

**Problem:** Changes to env vars not taking effect

**Solutions:**

**Redeploy after changes:**
1. Save environment variables
2. Go to Deployments tab
3. Click on latest deployment
4. Click "Redeploy"

**Check variable names:**
```
Correct:
ESPOCRM_BASE_URL
ESPOCRM_API_KEY

Incorrect:
espocrm_base_url  (wrong case)
ESPO_CRM_BASE_URL (wrong name)
```

**Check availability:**
```javascript
// In your API route
console.log('Base URL:', process.env.ESPOCRM_BASE_URL);
console.log('API Key:', process.env.ESPOCRM_API_KEY ? 'Set' : 'Not set');
```

---

## 🔧 Advanced Troubleshooting

### Enable Debug Mode in EspoCRM

1. Access container:
```powershell
docker exec -it espocrm bash
```

2. Edit config:
```bash
# Inside container
vi data/config.php
```

3. Add debug mode:
```php
'logger' => [
    'level' => 'DEBUG',
],
```

4. View logs:
```powershell
docker exec espocrm tail -f data/logs/espo.log
```

---

### Network Diagnostics

**Test from inside container:**
```powershell
# Access EspoCRM container
docker exec -it espocrm bash

# Test database connection
ping espocrm-db

# Test external connectivity
curl https://google.com
```

**Test from outside:**
```powershell
# Test DNS resolution
nslookup crm.wildrosepainters.ca

# Test port accessibility
Test-NetConnection -ComputerName crm.wildrosepainters.ca -Port 443
```

---

### Database Diagnostics

**Access MySQL:**
```powershell
docker exec -it espocrm-db mysql -u espocrm -pSecurePassword123!
```

**Useful queries:**
```sql
-- Check if leads table exists
SHOW TABLES;

-- Count leads
SELECT COUNT(*) FROM lead;

-- View recent leads
SELECT * FROM lead ORDER BY created_at DESC LIMIT 5;

-- Check database size
SELECT 
  table_schema AS 'Database',
  ROUND(SUM(data_length + index_length) / 1024 / 1024, 2) AS 'Size (MB)'
FROM information_schema.tables
WHERE table_schema = 'espocrm';
```

---

## 🆘 Still Need Help?

If none of these solutions work:

1. **Gather diagnostics:**
```powershell
# Create diagnostic report
docker ps > diagnostics.txt
docker logs espocrm >> diagnostics.txt
docker logs espocrm-db >> diagnostics.txt
docker-compose -f docker-compose.espocrm.yml config >> diagnostics.txt
```

2. **Check specific logs:**
- Browser Console (F12)
- Vercel Function Logs
- Docker logs
- EspoCRM logs

3. **Resources:**
- [EspoCRM Forum](https://forum.espocrm.com/)
- [EspoCRM GitHub Issues](https://github.com/espocrm/espocrm/issues)
- [Docker Documentation](https://docs.docker.com/)

4. **Verify basics:**
- [ ] Docker running
- [ ] Containers running (`docker ps`)
- [ ] Ports not conflicting
- [ ] Environment variables correct
- [ ] API key valid
- [ ] DNS configured (for production)

---

## 📝 Preventive Maintenance

To avoid issues:

**Daily:**
- Check container status: `docker ps`

**Weekly:**
- Review logs: `docker logs espocrm --tail 100`
- Check disk space: `docker system df`

**Monthly:**
- Backup database
- Update containers: `docker-compose pull`
- Clean old images: `docker image prune`

**Quarterly:**
- Review security settings
- Update passwords
- Test backup restoration
