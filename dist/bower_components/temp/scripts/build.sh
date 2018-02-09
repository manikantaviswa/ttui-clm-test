#!/bin/bash -ue

echo "Installing development dependencies..."

npm prune
npm cache clean
npm install

echo "Installing Bower dependencies..."

bower cache clean
bower prune
bower update --config.interactive=false
bower install --config.interactive=false

echo "Building application..."

grunt karma:unit build karma:jenkins
