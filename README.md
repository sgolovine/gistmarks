## Gistmarks.io

Gistmarks.io is a bookmark manager that uses Github Gist to save and share bookmarks.

[![Build Status](https://github.com/sgolovine/gistmarks/actions/workflows/ci.yml/badge.svg)](https://github.com/sgolovine/gistmarks/actions/workflows/ci.yml)

## Development

### Pre-requisites

- NodeJS v10+ (any recent node version will work)
- Yarn (npm install -g yarn)

### Setup

1. Clone the repository (`git clone git@github.com:sgolovine/gistmarks.git`)
2. Copy `.env.example` to `.env` and replace the keys inside with your own.
3. Run `yarn install` to install dependencies
4. Run `yarn start` to start the development server

### Deployment

WIP

## 1.0 Plan

- Get bookmarks categories working, should filter by category
- Implement Search (if easy)
- Implement Github Authentication (should already be implemented, just hook it up again)
- Implement saving to github
- After saving the first time, user should have the ability to select "autosave on changes" or otherwise the app will show a "save" button every time changes are made
  - Button should be green if saved
  - Button should be red if unsaved.
- Implement viewing a collection via link
  - `/v/<gistID>`
  - `/view/<gistID>`
- Add ability to save to JSON
- Move main app to `/app`
- Add homepage to `/`
  - Homepage should describe what it does
  - Allow visitors to see a collection (simple link to view)
  - Allow visitors to create their own
- Onboarding Flow
  - Ask if they want to create a local one or one with gist
  - If with gist then go through auth and store credentials
  - If with local inform user that they can change this later.
- Create quick add bookmarklet

## Release Tasks

This should be expanded on further

- Blog Posts
- Product Hunt
- Reddit
- Dev.to
- Hacker News
- Twitter
- IndieHackers
