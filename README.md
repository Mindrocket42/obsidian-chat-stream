# Chat Stream 🔀

![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/rpggio/obsidian-chat-stream?style=for-the-badge&sort=semver) [![Obsidian Downloads](https://img.shields.io/badge/dynamic/json?logo=obsidian&color=%23483699&label=downloads&query=%24%5B%22chat-stream%22%5D.downloads&url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json&style=for-the-badge)](https://obsidian.md/plugins?search=chat%20stream)

An Obsidian plugin for conversing with GPT AI via canvas notes. Ancestor notes/files are included in the chat context. You can quickly create chat streams, and control what other notes are sent to the AI.

<img src="static/chat-stream-example.gif"/>

## 1. Introduction

**Purpose:** Chat Stream enables conversations with AI models directly within Obsidian canvas notes. It sends the selected note and its ancestors as context to the AI.

**Target Audience:** Anyone using Obsidian who wants to integrate AI conversations into their note-taking workflow. This README includes options for users with minimal coding experience.

## 2. Features

- Connect to OpenAI's API for AI-powered conversations
- Include ancestor notes for context-aware conversations
- Control the conversation flow through canvas connections

### - this plugin uses fixed model references which is clumsy because new OpenAI models mean the model list has to be updated. This process is both painful and time consuming. As a work around we recommend that you use the "MANUAL PROCESSING" option (great for custom models or offline use). No API call is made. Instead the payload for the API call is saved to a JSON file. From there it can be copy pasted to the LLM of your choice

## 3. Prerequisites

- [Obsidian](https://obsidian.md/) (desktop version)
- For API mode: An [OpenAI API key](https://platform.openai.com/account/api-keys)
- For development: Node.js and pnpm

## 4. Quick Start Guide

### Install

Choose one of these methods:

1. **Community Plugin (Recommended for most users)**

   - Open Obsidian
   - Go to Settings → Community plugins → Browse
   - Search for "Chat Stream" and install

2. **BRAT (For testing beta versions)**
   - Install [BRAT](https://github.com/TfTHacker/obsidian42-brat) plugin
   - Add `rpggio/obsidian-chat-stream` to BRAT

### Setup

1. **For API Mode**

   - Go to Settings → Community plugins → Chat Stream
   - Add your OpenAI API key
   - Select your preferred model

2. **For Manual Processing (No API required)**
   - Go to Settings → Community plugins → Chat Stream
   - Select "manual-processing" from the Model dropdown
   - Set a "Payload notes folder" (e.g., "Chat Stream Payloads")

## 5. Usage

### Basic Workflow

1. Create or open a canvas in Obsidian
2. Select a note in the canvas
3. Press Alt+Shift+G to generate a new AI response using the current note + ancestors
4. To create a new note for your response, press Alt+Shift+N

### Manual Processing Workflow

When using the "manual-processing" model:

1. Press Alt+Shift+G as usual
2. A new purple note will appear with instructions
3. A JSON file with the complete prompt will be created in your specified folder
4. Copy the JSON payload and send it to your preferred AI service/model
5. Copy the response back to the purple note in your canvas

## 6. Development Guide

If you want to modify the plugin, here's the most straightforward approach:

### Simple Development Workflow (Recommended)

1. **Set up the development environment:**

   ```
   pnpm install js-tiktoken tslib @types/node --save
   ```

2. **Make your changes to the source code**

3. **Build the project:**

   ```
   pnpm run build
   ```

4. **Manually copy the files to your Obsidian plugins folder:**

   - Copy `main.js`, `manifest.json`, and `styles.css` to:
     - Windows: `%APPDATA%\Obsidian\plugins\chat-stream\`
     - Mac: `~/Library/Application Support/obsidian/plugins/chat-stream/`
     - Linux: `~/.config/obsidian/plugins/chat-stream/`

5. **Restart Obsidian or reload the plugin**

This approach avoids potential issues with symbolic links and hot reloading.

### Advanced Development Setup (Optional)

For a more streamlined development experience:

1. Install the [hot reload plugin](https://github.com/pjeby/hot-reload) in Obsidian
2. Create a symbolic link from this project dir to your Obsidian plugins folder
3. Run the development server: `pnpm run dev`

Note that this method may encounter issues with file duplication or permissions on some systems.

## Attribution

- Canvas plugin code from [Canvas MindMap](https://github.com/Quorafind/Obsidian-Canvas-MindMap)
