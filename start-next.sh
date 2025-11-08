#!/bin/bash

npm run dev &
sleep 3
xdg-open http://localhost:3000
wait

# TO DO
# chmod +x start-next.sh
# ./start-next.sh
