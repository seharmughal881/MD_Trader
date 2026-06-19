#!/usr/bin/env bash
# Start the dedicated MD Traders Postgres cluster.
PGBIN=/usr/lib/postgresql/14/bin
PGDATA="$(cd "$(dirname "$0")/.." && pwd)/.postgres"
SOCK=/tmp/mdpg
mkdir -p "$SOCK"
"$PGBIN/pg_ctl" -D "$PGDATA" -o "-p 5544 -k $SOCK -c listen_addresses='127.0.0.1'" -l "$PGDATA/server.log" -w start
