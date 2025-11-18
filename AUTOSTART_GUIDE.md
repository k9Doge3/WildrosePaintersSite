# Auto-Start EspoCRM and Cloudflare Tunnel on Boot

## Option 1: Windows Startup Folder (Easiest)

### Step 1: Copy the startup script
```powershell
# Copy to a permanent location
Copy-Item "\\tsclient\D\vs code\WildrosePaintersSite-main\start-espocrm.ps1" -Destination "$env:USERPROFILE\start-espocrm.ps1"
```

### Step 2: Create a shortcut in Startup folder
```powershell
# Open Startup folder
shell:startup
```

Or manually open: `C:\Users\<YourUser>\AppData\Roaming\Microsoft\Windows\Start Menu\Programs\Startup`

### Step 3: Create shortcut
1. Right-click in the Startup folder → **New → Shortcut**
2. For location, enter:
   ```
   powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File "%USERPROFILE%\start-espocrm.ps1"
   ```
3. Name it: `Start EspoCRM`
4. Click **Finish**

### Test it:
```powershell
# Run the script manually to test
PowerShell -ExecutionPolicy Bypass -File "$env:USERPROFILE\start-espocrm.ps1"
```

## Option 2: Task Scheduler (More Reliable)

### Step 1: Create the scheduled task
```powershell
# Create task to run at logon
$action = New-ScheduledTaskAction -Execute 'PowerShell.exe' `
    -Argument "-ExecutionPolicy Bypass -WindowStyle Hidden -File `"$env:USERPROFILE\start-espocrm.ps1`""

$trigger = New-ScheduledTaskTrigger -AtLogOn

$settings = New-ScheduledTaskSettingsSet `
    -AllowStartIfOnBatteries `
    -DontStopIfGoingOnBatteries `
    -StartWhenAvailable

$principal = New-ScheduledTaskPrincipal -UserId $env:USERNAME -LogonType Interactive -RunLevel Limited

Register-ScheduledTask -TaskName "Start EspoCRM" `
    -Action $action `
    -Trigger $trigger `
    -Settings $settings `
    -Principal $principal `
    -Description "Starts EspoCRM and Cloudflare Tunnel on login"
```

### Test the task:
```powershell
Start-ScheduledTask -TaskName "Start EspoCRM"
```

### View task status:
```powershell
Get-ScheduledTask -TaskName "Start EspoCRM"
```

### Remove task (if needed):
```powershell
Unregister-ScheduledTask -TaskName "Start EspoCRM" -Confirm:$false
```

## Option 3: Manual Start Script

If you don't want auto-start, just run this when needed:

```powershell
# Quick start
cd "\\tsclient\D\vs code\WildrosePaintersSite-main"
.\start-espocrm.ps1
```

## Verify Everything is Running

```powershell
# Check Docker containers
docker ps

# Check Cloudflare tunnel
Get-Process cloudflared

# Test access
Start-Process "http://localhost:8080"
Start-Process "https://crm.wildrosepainters.ca"
```

## Stop Everything

```powershell
# Stop tunnel
Stop-Process -Name cloudflared -Force

# Stop Docker containers
docker-compose -f docker-compose.espocrm.yml down
```

## Troubleshooting Auto-Start

### Script doesn't run on startup

1. Check execution policy:
```powershell
Get-ExecutionPolicy
# Should be RemoteSigned or Unrestricted
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

2. Check Task Scheduler logs:
   - Open Task Scheduler
   - Find "Start EspoCRM" task
   - Right-click → Properties → History tab

3. Test script manually:
```powershell
PowerShell -ExecutionPolicy Bypass -File "$env:USERPROFILE\start-espocrm.ps1"
```

### Docker containers don't start

- Make sure Docker Desktop is set to start on boot:
  - Docker Desktop → Settings → General
  - Check ✓ "Start Docker Desktop when you log in"

### Tunnel fails to start

- Check if cloudflared.exe is in Downloads folder
- Check config file exists: `$env:USERPROFILE\.cloudflared\config.yml`
- Run tunnel manually to see errors:
```powershell
$env:Path += ";$env:USERPROFILE\Downloads"
cloudflared tunnel run espocrm-tunnel
```

## Recommended: Docker Desktop Auto-Start

1. Open Docker Desktop
2. Go to **Settings** (gear icon)
3. **General** tab
4. Enable: ✓ **Start Docker Desktop when you log in**
5. Click **Apply & Restart**

This ensures Docker is ready before the script runs.

## Complete Setup Checklist

- [ ] Docker Desktop set to auto-start
- [ ] `start-espocrm.ps1` copied to `%USERPROFILE%`
- [ ] Startup shortcut created OR Task Scheduler task created
- [ ] Tested manually - script works
- [ ] Reboot and verify everything starts automatically
- [ ] Access https://crm.wildrosepainters.ca successfully

## Quick Reference

**Start everything:**
```powershell
.\start-espocrm.ps1
```

**Stop everything:**
```powershell
Stop-Process -Name cloudflared -Force
docker-compose -f docker-compose.espocrm.yml down
```

**Check status:**
```powershell
docker ps
Get-Process cloudflared
```

**Access CRM:**
- Public: https://crm.wildrosepainters.ca
- Local: http://localhost:8080
- Username: `admin`
- Password: `AdminPassword123!`
