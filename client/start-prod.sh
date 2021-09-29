#!/bin/bash
export PORT=3900
pm2 start "node_modules/.bin/react-scripts start"
