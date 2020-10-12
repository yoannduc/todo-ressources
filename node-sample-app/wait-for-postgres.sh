#!/bin/sh
# wait-for-postgres.sh

set -e

shift
cmd="$@"

>&2 echo "POSTGRES USER $DATABASE_USERNAME"

until PGPASSWORD=$DATABASE_PASSWORD psql -h $DATABASE_IP -U $DATABASE_USERNAME $DATABASE_NAME -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
