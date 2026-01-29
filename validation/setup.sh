#!/bin/bash

echo "🎤 Voice Survey - Technical Validation Setup"
echo "==========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Create samples directory
if [ ! -d "samples" ]; then
    mkdir samples
    echo "✅ Created samples/ directory"
else
    echo "✅ samples/ directory already exists"
fi

# Check for OpenAI API key
if [ -z "$OPENAI_API_KEY" ]; then
    echo ""
    echo "⚠️  Warning: OPENAI_API_KEY environment variable not set"
    echo ""
    echo "To set your API key:"
    echo "   export OPENAI_API_KEY=\"sk-proj-your-key-here\""
    echo ""
    echo "Get your API key from: https://platform.openai.com/api-keys"
else
    echo "✅ OPENAI_API_KEY is set"
fi

echo ""
echo "==========================================="
echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Open record-samples.html in your browser"
echo "2. Record 10-20 Swedish voice samples"
echo "3. Move audio files to samples/ folder"
echo "4. Run: node test-transcription.js"
echo ""
echo "See README.md for detailed instructions."
echo "==========================================="
