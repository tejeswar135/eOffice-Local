#!/bin/bash
echo "Starting e-Tappal Full-Stack System..."
cd /working_dir/etappal-fullstack/backend && npm run dev &
cd /working_dir/etappal-fullstack/frontend && npm run dev &
wait
