#!/usr/bin/env bash
PGBIN=/usr/lib/postgresql/14/bin
PGDATA="$(cd "$(dirname "$0")/.." && pwd)/.postgres"
"$PGBIN/pg_ctl" -D "$PGDATA" -w stop
