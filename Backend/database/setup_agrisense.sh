#!/bin/bash

# Database configuration
DB_NAME="AgriSenseDB"
DB_USER="AgriSense"
DB_PASS="AgriSense@123"  # Default password for the user

# MySQL root credentials (predefined for simplicity; customize as needed)
MYSQL_ROOT_USER="root"
MYSQL_ROOT_PASS="root_password"

# Check for MySQL command availability
if ! command -v mysql &> /dev/null; then
  echo "Error: MySQL client is not installed. Please install MySQL to proceed."
  exit 1
fi

# Run MySQL commands to create database, user, and grant privileges
sudo mysql -u$MYSQL_ROOT_USER -p$MYSQL_ROOT_PASS <<EOF
-- Create the database if it doesn't exist
CREATE DATABASE IF NOT EXISTS $DB_NAME;

-- Create the user 'AgriSense' if it doesn't exist
CREATE USER IF NOT EXISTS '$DB_USER'@'localhost' IDENTIFIED BY '$DB_PASS';

-- Grant privileges to the user for the database
GRANT ALL PRIVILEGES ON $DB_NAME.* TO '$DB_USER'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
EOF

# Check if the setup was successful
if [ $? -eq 0 ]; then
  echo "Database $DB_NAME and user $DB_USER have been successfully set up."
  echo "You can now connect to the database using:"
  echo "  Username: $DB_USER"
  echo "  Password: $DB_PASS"
else
  echo "Error occurred during the database setup."
fi
