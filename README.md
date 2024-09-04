# Youtube Video Sharing Web Application

## Introduction

This project is a web application that allows users to register, log in, and share YouTube videos with others. The key features include user registration and login, sharing YouTube videos, viewing a list of shared videos, and real-time notifications when new videos are shared.

## Prerequisites

- Node.js (v14.x or later)
- npm (v6.x or later)

## Installation & Configuration

1. Clone the repository:
   ```bash
   https://github.com/anhtt2211/sharing-video.git
   cd sharing-video
   ```
2. Install dependencies:
   ```bash
   npm install pnpm -g
   pnpm install
   ```
3. Configure your environment variables by make a copy from `.env.example`

   ```
   cp .env.example .env
   ```

## Running the Application

1. Start the development server:
   ```bash
   pnpm run dev
   ```
2. Web server start at `http://localhost:3000`.
3. To run the test suite:
   ```bash
   pnpm run test
   ```

## Usage

- **User Registration and Login:** Users can create an account and log in to access the application.
- **Sharing YouTube Videos:** Once logged in, users can share YouTube video links through a dedicated form.
- **Viewing Shared Videos:** Users can view a list of all videos shared by other users.
- **Real-Time Notifications:** Users receive notifications for new video shares displayed as pop-ups or banners, containing the video title and sharer's name.

## Troubleshooting

- **Issue:** Application does not start.

  - **Solution:** Check for any missing dependencies and ensure all environment variables are defined correctly in the `.env` file.

- **Issue:** Real-time notifications not working.
  - **Solution:** Ensure WebSocket connections are correctly established and the server is handling broadcasting correctly.
