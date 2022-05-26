#!/bin/bash

echo "-= AFK bot launcher =-"

node bot.js
ERRNO=${?}

while (( $ERRNO == 0 )); do
	echo "Disconnected ! Waiting 5 sec. before reconnection..."
	sleep 5
	node bot.js ${PASS}
	ERRNO=${?}
done

echo "See you !"
