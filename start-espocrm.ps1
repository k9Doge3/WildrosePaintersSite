# Start EspoCRM and Cloudflare Tunnel on Windows Startup
# Save this as: C:\Users\<YourUser>\start-espocrm.ps1

Write-Host "Starting EspoCRM and Cloudflare Tunnel..." -ForegroundColor Cyan

# Add cloudflared to PATH
$env:Path += ";$env:USERPROFILE\Downloads"

# Start Docker containers if not already running
Write-Host "Checking Docker containers..." -ForegroundColor Yellow
$espo = docker ps -q -f name=espocrm
if (-not $espo) {
    Write-Host "Starting EspoCRM containers..." -ForegroundColor Yellow
    Set-Location "\\tsclient\D\vs code\WildrosePaintersSite-main"
    docker-compose -f docker-compose.espocrm.yml up -d
    Write-Host "✓ EspoCRM containers started" -ForegroundColor Green
} else {
    Write-Host "✓ EspoCRM already running" -ForegroundColor Green
}

# Wait for EspoCRM to be ready
Write-Host "Waiting for EspoCRM to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 15

# Check if tunnel is already running
$tunnel = Get-Process cloudflared -ErrorAction SilentlyContinue
if ($tunnel) {
    Write-Host "✓ Cloudflare tunnel already running" -ForegroundColor Green
} else {
    Write-Host "Starting Cloudflare tunnel..." -ForegroundColor Yellow
    Start-Process -FilePath "$env:USERPROFILE\Downloads\cloudflared.exe" `
        -ArgumentList "tunnel","run","espocrm-tunnel" `
        -WindowStyle Hidden
    Start-Sleep -Seconds 5
    Write-Host "✓ Cloudflare tunnel started" -ForegroundColor Green
}

Write-Host ""
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host "✓ EspoCRM is ready!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
Write-Host ""
Write-Host "Access your CRM at:" -ForegroundColor Cyan
Write-Host "  Public:  https://crm.wildrosepainters.ca" -ForegroundColor White
Write-Host "  Local:   http://localhost:8080" -ForegroundColor White
Write-Host ""
Write-Host "Login credentials:" -ForegroundColor Yellow
Write-Host "  Username: admin" -ForegroundColor White
Write-Host "  Password: AdminPassword123!" -ForegroundColor White
Write-Host ""
