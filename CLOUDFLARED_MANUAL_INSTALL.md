# Manual Cloudflared Installation for Windows

Since winget and choco may not be working, here's how to manually install cloudflared.

## Quick Manual Installation

### Step 1: Download cloudflared

1. Open this link in your browser:
   **https://github.com/cloudflare/cloudflared/releases/latest**

2. Scroll down to **Assets**

3. Download: **cloudflared-windows-amd64.exe**

   Or use this direct link:
   ```
   https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe
   ```

### Step 2: Install cloudflared

Run these commands in PowerShell (as Administrator):

```powershell
# Create directory for cloudflared
New-Item -ItemType Directory -Path "C:\Program Files\cloudflared" -Force

# Move the downloaded file (adjust path if needed)
Move-Item -Path "$env:USERPROFILE\Downloads\cloudflared-windows-amd64.exe" -Destination "C:\Program Files\cloudflared\cloudflared.exe" -Force

# Add to PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";C:\Program Files\cloudflared", [EnvironmentVariableTarget]::Machine)

# Refresh PATH in current session
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

### Step 3: Verify Installation

```powershell
# Check version
cloudflared --version
```

## Alternative: Use PowerShell to Download

If you prefer to download directly via PowerShell:

```powershell
# Download cloudflared
$downloadUrl = "https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-windows-amd64.exe"
$installPath = "C:\Program Files\cloudflared"

# Create directory
New-Item -ItemType Directory -Path $installPath -Force

# Download
Invoke-WebRequest -Uri $downloadUrl -OutFile "$installPath\cloudflared.exe"

# Add to PATH
[Environment]::SetEnvironmentVariable("Path", $env:Path + ";$installPath", [EnvironmentVariableTarget]::Machine)

# Refresh PATH
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")

# Verify
cloudflared --version
```

## After Installation

Once installed, continue with the Cloudflare Tunnel setup:

### 1. Authenticate with Cloudflare
```powershell
cloudflared tunnel login
```

This will:
- Open your browser
- Ask you to select your domain (wildrosepainters.ca)
- Save credentials to `C:\Users\<YourUser>\.cloudflared\cert.pem`

### 2. Create Tunnel
```powershell
cloudflared tunnel create espocrm-tunnel
```

**Important:** Copy the tunnel ID from the output!

### 3. Create Config File

Navigate to your .cloudflared directory:
```powershell
cd $env:USERPROFILE\.cloudflared
```

Create `config.yml`:
```powershell
@"
tunnel: YOUR_TUNNEL_ID_HERE
credentials-file: $env:USERPROFILE\.cloudflared\YOUR_TUNNEL_ID.json

ingress:
  - hostname: crm.wildrosepainters.ca
    service: http://localhost:8080
  - service: http_status:404
"@ | Out-File -FilePath config.yml -Encoding UTF8
```

**Replace:**
- `YOUR_TUNNEL_ID_HERE` with your actual tunnel ID
- `YOUR_TUNNEL_ID.json` with the actual filename

### 4. Route DNS
```powershell
cloudflared tunnel route dns espocrm-tunnel crm.wildrosepainters.ca
```

### 5. Run Tunnel
```powershell
cloudflared tunnel run espocrm-tunnel
```

### 6. Test Access
Open browser: **https://crm.wildrosepainters.ca**

### 7. Install as Service (Optional)
```powershell
cloudflared service install
cloudflared service start
```

## Troubleshooting

### "Command not found" after installation
```powershell
# Manually add to PATH for current session
$env:Path += ";C:\Program Files\cloudflared"

# Try again
cloudflared --version
```

### Need to restart PowerShell
Close and reopen PowerShell after adding to PATH.

### Permission Denied
Run PowerShell as Administrator.

## Quick Test Script

Save this as `test-cloudflared.ps1` and run it:

```powershell
# Test if cloudflared is installed
try {
    $version = cloudflared --version
    Write-Host "✓ Cloudflared is installed: $version" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Run: cloudflared tunnel login" -ForegroundColor White
    Write-Host "2. Run: cloudflared tunnel create espocrm-tunnel" -ForegroundColor White
    Write-Host "3. Follow CLOUDFLARE_TUNNEL_GUIDE.md for complete setup" -ForegroundColor White
} catch {
    Write-Host "✗ Cloudflared is not installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "Installation options:" -ForegroundColor Yellow
    Write-Host "1. Download manually from: https://github.com/cloudflare/cloudflared/releases/latest" -ForegroundColor White
    Write-Host "2. Follow CLOUDFLARED_MANUAL_INSTALL.md" -ForegroundColor White
}
```

## Need Help?

If you're still having issues:
1. Check that you're running PowerShell as Administrator
2. Make sure Windows Defender isn't blocking the download
3. Try downloading the file manually from GitHub
4. Restart your PowerShell session after installation

## Alternative: Use Docker Instead

If installation is problematic, you can run cloudflared in Docker:

```powershell
# First, authenticate (this creates cert.pem)
docker run -it -v $env:USERPROFILE\.cloudflared:/home/nonroot/.cloudflared cloudflare/cloudflared:latest tunnel login

# Create tunnel
docker run -v $env:USERPROFILE\.cloudflared:/home/nonroot/.cloudflared cloudflare/cloudflared:latest tunnel create espocrm-tunnel

# Run tunnel (keep running)
docker run -d --name cloudflared-tunnel `
  -v $env:USERPROFILE\.cloudflared:/home/nonroot/.cloudflared `
  cloudflare/cloudflared:latest tunnel run espocrm-tunnel
```

This uses Docker (which you already have running) instead of installing cloudflared on Windows.
