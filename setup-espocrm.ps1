# EspoCRM Setup Script for WildRose Painters
# Run this script to automatically set up EspoCRM on your laptop

Write-Host "🎨 WildRose Painters - EspoCRM Setup Script" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is installed
Write-Host "Checking Docker installation..." -ForegroundColor Yellow
try {
    $dockerVersion = docker --version
    Write-Host "✓ Docker found: $dockerVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not installed!" -ForegroundColor Red
    Write-Host "Please install Docker Desktop from: https://www.docker.com/products/docker-desktop/" -ForegroundColor Yellow
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Check if Docker is running
Write-Host "Checking if Docker is running..." -ForegroundColor Yellow
try {
    docker ps | Out-Null
    Write-Host "✓ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "✗ Docker is not running!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and run this script again." -ForegroundColor Yellow
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

Write-Host ""
Write-Host "Starting EspoCRM containers..." -ForegroundColor Yellow

# Start EspoCRM using docker-compose
try {
    docker-compose -f docker-compose.espocrm.yml up -d
    
    Write-Host ""
    Write-Host "✓ EspoCRM containers started successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Waiting for EspoCRM to initialize (this may take 1-2 minutes)..." -ForegroundColor Yellow
    
    # Wait for EspoCRM to be ready
    $maxAttempts = 30
    $attempt = 0
    $ready = $false
    
    while (-not $ready -and $attempt -lt $maxAttempts) {
        try {
            $response = Invoke-WebRequest -Uri "http://localhost:8080" -Method Head -TimeoutSec 2 -ErrorAction SilentlyContinue
            if ($response.StatusCode -eq 200 -or $response.StatusCode -eq 302) {
                $ready = $true
            }
        } catch {
            # Not ready yet
        }
        
        if (-not $ready) {
            Start-Sleep -Seconds 4
            $attempt++
            Write-Host "." -NoNewline
        }
    }
    
    Write-Host ""
    Write-Host ""
    
    if ($ready) {
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host "✓ EspoCRM is ready!" -ForegroundColor Green
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host ""
        Write-Host "Access EspoCRM at: " -NoNewline
        Write-Host "http://localhost:8080" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "Login credentials:" -ForegroundColor Yellow
        Write-Host "  Username: " -NoNewline
        Write-Host "admin" -ForegroundColor White
        Write-Host "  Password: " -NoNewline
        Write-Host "AdminPassword123!" -ForegroundColor White
        Write-Host ""
        Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Green
        Write-Host ""
        Write-Host "Next Steps:" -ForegroundColor Cyan
        Write-Host "1. Open http://localhost:8080 in your browser" -ForegroundColor White
        Write-Host "2. Login with the credentials above" -ForegroundColor White
        Write-Host "3. Go to Administration → Users → Create User" -ForegroundColor White
        Write-Host "4. Create an API user and generate an API key" -ForegroundColor White
        Write-Host "5. Add the API key to your Vercel environment variables" -ForegroundColor White
        Write-Host ""
        Write-Host "📚 See QUICKSTART_ESPOCRM.md for detailed instructions" -ForegroundColor Yellow
        Write-Host ""
        
        # Ask if user wants to open browser
        Write-Host "Would you like to open EspoCRM in your browser now? (Y/N): " -ForegroundColor Cyan -NoNewline
        $openBrowser = Read-Host
        
        if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
            Start-Process "http://localhost:8080"
        }
        
    } else {
        Write-Host "⚠ EspoCRM is starting but not ready yet." -ForegroundColor Yellow
        Write-Host "Please wait a few more minutes and then access: http://localhost:8080" -ForegroundColor Yellow
    }
    
} catch {
    Write-Host ""
    Write-Host "✗ Error starting EspoCRM: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Make sure Docker Desktop is running" -ForegroundColor White
    Write-Host "2. Check if ports 8080 is available" -ForegroundColor White
    Write-Host "3. View logs with: docker logs espocrm" -ForegroundColor White
    exit 1
}

Write-Host ""
Write-Host "Useful commands:" -ForegroundColor Cyan
Write-Host "  View logs:        docker logs espocrm" -ForegroundColor White
Write-Host "  Stop containers:  docker-compose -f docker-compose.espocrm.yml down" -ForegroundColor White
Write-Host "  Start containers: docker-compose -f docker-compose.espocrm.yml up -d" -ForegroundColor White
Write-Host ""
