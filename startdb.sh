#!/usr/bin/env bash

echo "Starting database container"
docker run -p 5432:5432 --name hbc-postgres -v "`pwd`/database/volume:/var/lib/postgresql/data" -v "`pwd`/secrets:/run/secrets" -v "`pwd`/database/init:/docker-entrypoint-initdb.d" -e POSTGRES_PASSWORD_FILE=/run/secrets/postgres-passwd -d postgres
