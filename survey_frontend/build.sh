#!/bin/bash
echo "Installing dependencies..."
npm ci

echo "Building with Vite..."
npx --yes vite build

echo "Build completed!"
