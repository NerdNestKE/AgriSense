# Database configuration
$DB_NAME = "AgriSenseDB"
$DB_USER = "AgriSense"
$DB_PASS = "AgriSense@123"

# MySQL root credentials
$MYSQL_ROOT_USER = "root"
$MYSQL_ROOT_PASS = "root_password"

# MySQL executable path (update if not in PATH)
$mysqlExe = "mysql"

# Check if MySQL is available
if (-not (Get-Command $mysqlExe -ErrorAction SilentlyContinue)) {
    Write-Host "Error: MySQL is not installed or not in PATH. Please install MySQL or add it to PATH." -ForegroundColor Red
    exit 1
}

# Execute MySQL commands
$mysqlCommands = @"
CREATE DATABASE IF NOT EXISTS $DB_NAME;
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';
FLUSH PRIVILEGES;
"@

# Run the commands
try {
    $command = "$mysqlExe -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS -e `"$mysqlCommands`""
    Invoke-Expression $command
    Write-Host "Database $DB_NAME and user $DB_USER have been successfully set up." -ForegroundColor Green
    Write-Host "You can now connect to the database using:"
    Write-Host "  Username: $DB_USER"
    Write-Host "  Password: $DB_PASS"
} catch {
    Write-Host "Error occurred during the database setup: $_" -ForegroundColor Red
}
