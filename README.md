<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Vintage Photobooth

This is a single-page React application built with Vite and TypeScript that provides a "vintage photobooth" experience, allowing users to capture photos with different frames.

## Features

*   **Camera Integration**: Access the user's camera to capture photos.
*   **Frame Selection**: Choose from a variety of frames to apply to your photos.
*   **Photo Gallery**: View a gallery of all your captured photos.
*   **Photo Modal**: View a larger version of your photo, apply filters, and download the final image.
*   **Shareable Images**: Share your creations with friends and family.

## Run Locally

**Prerequisites:** Node.js

1.  Install dependencies:
    `npm install`
2.  Run the app:
    `npm run dev`

## Technologies Used

*   **React**: A JavaScript library for building user interfaces.
*   **Vite**: A fast build tool for modern web projects.
*   **TypeScript**: A typed superset of JavaScript.
*   **Tailwind CSS**: A utility-first CSS framework.
*   **html2canvas**: A library to take "screenshots" of webpages or parts of it.

## Architecture

This is a single-page React application that uses a component-based structure to create an interactive photobooth.

*   **`App.tsx`**: The main component, managing the application's state (photos, selected frame, and the photo modal).
*   **`CameraView.tsx`**: Handles the camera feed, countdown, and image capture.
*   **`FrameSelector.tsx`**: Allows users to select a frame for their photos.
*   **`PhotoGallery.tsx`**: Displays a gallery of captured photos.
*   **`PhotoModal.tsx`**: Shows a larger view of a selected photo with the frame, allows applying filters, and enables downloading and sharing the final image.

The data flows from the `CameraView` (capturing the photo) up to the `App` component, which then updates the `PhotoGallery`. When a user clicks a photo, the `PhotoModal` is displayed, which uses the `html2canvas` library to create a downloadable image.