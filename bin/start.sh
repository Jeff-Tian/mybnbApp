#!/bin/sh

if [ -n "$1" ]; then
    PORT=$1
fi

if [ -n "$2" ]; then
    APP_NAME=$2
fi

if [ -z "$PORT" ]; then
    echo "port no set"
    exit 1
fi

if [ -z "$APP_NAME" ]; then
    echo "app name not set"
    exit 1
fi

################################
#     START PM2 INSTANCE	   #
################################
if [ -n "$PORT" ]; then
	echo "Listening on port: $PORT"
	export PORT
	#export NODE_ENV
fi

#export NODE_ENV

CURRENT_PATH=`dirname $0`
pm2 start "$CURRENT_PATH/www" --name "$APP_NAME"
exit $?