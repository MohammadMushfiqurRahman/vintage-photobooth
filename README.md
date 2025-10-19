<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vintage Photobooth

This is a single-page React application built with Vite and TypeScript. It's designed to be a "vintage photobooth" experience, allowing users to capture photos with different frames.

## Run Locally

**Prerequisites:**  Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Architecture

This is a single-page React application built with Vite and TypeScript. It's a "vintage photobooth" that lets users capture photos with different frames.

Here's a breakdown of the architecture:

*   **`App.tsx`**: The main component, managing the application's state (photos, selected frame, and the photo modal).
*   **`CameraView.tsx`**: Handles the camera feed, countdown, and image capture.
*   **`FrameSelector.tsx`**: Allows users to select a frame for their photos.
*   **`PhotoGallery.tsx`**: Displays a gallery of captured photos.
*   **`PhotoModal.tsx`**: Shows a larger view of a selected photo with the frame and allows downloading the final image.

The data flows from the `CameraView` (capturing the photo) up to the `App` component, which then updates the `PhotoGallery`. When a user clicks a photo, the `PhotoModal` is displayed, which uses the `html2canvas` library to create a downloadable image.

In essence, it's a well-organized React application that uses a component-based structure to create an interactive photobooth.