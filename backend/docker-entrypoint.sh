#!/bin/sh
set -e

echo "Running npm install..."
npm i

echo "Waiting for PostgreSQL..."
until nc -z database 5432; do
  sleep 1
done

echo "Running database migrations..."
npm run reset:db

echo "Starting server..."
exec npm run start:dev
