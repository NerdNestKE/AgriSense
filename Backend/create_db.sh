#!/bin/bash

# Prompt user for password securely
echo -n "Enter PostgreSQL password for user '$POSTGRES_USER': "
read -s POSTGRES_PASSWORD
echo ""

# Define environment variables
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=agrisense
POSTGRES_USER=agrisense_user

# Exports password for non-interactive authentication
export PGPASSWORD=$POSTGRES_PASSWORD

# Create the database
psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U postgres -d postgres -c "CREATE DATABASE $POSTGRES_DB;"

# Create the user and grant privileges
psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U postgres -d postgres -c "CREATE USER $POSTGRES_USER WITH ENCRYPTED PASSWORD '$POSTGRES_PASSWORD';"
psql -h $POSTGRES_HOST -p $POSTGRES_PORT -U postgres -d postgres -c "GRANT ALL PRIVILEGES ON DATABASE $POSTGRES_DB TO $POSTGRES_USER;"

# Unset password for security
unset PGPASSWORD

echo "Database $POSTGRES_DB and user $POSTGRES_USER created successfully."
