#!/bin/bash
echo "Installing dependencies..."
npm ci

echo "Building with Vite..."
node ./node_modules/.bin/vite build

echo "Build completed!"
