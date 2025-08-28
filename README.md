# 🐱 Cats Cats Everywhere

A **Next.js + React** application built using the [Cat API](https://thecatapi.com/) to display adorable cats 🐾. This project demonstrates **frontend engineering practices**, including clean architecture, reusable components, hooks for state management, API route handling and TypeScript for type safety.

## Features

### Cat Listing Page

- Displays **15 cats per page** with pagination (`Next` & `Previous` buttons).
- Sorting functionality:
  - Random
  - Ascending
  - Descending
- Supports direct linking to a specific page with the selected sort order.
- Skeleton loading states for a smoother UX.
- Uses Next.js Image Optimization for lazy loading, responsive resizing, and error handling.
- Placeholder images if a cat image fails to load.

### Cat Details Page

- Clicking on any cat image opens its **details page**.
- Displays the following details:
  - Name
  - Description
  - Origin
  - Temperament
  - Life Span
  - Energy Level
  - Weight

### Additional Highlights

- **Backend API routes in Next.js** used to **secure the API key** instead of exposing it on the client.
- Strongly typed with **TypeScript**.
- Shared **Header** and **Footer** across pages for consistent branding.

## Getting Started

1. Clone the repo

   ```bash
   git clone https://github.com/your-username/cats-cats-everywhere.git
   cd cats-cats-everywhere
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Configure environment variables

- A sample file env.template is already provided.
- Copy it to your .env and add your Cat API key.

4. Run the development server

   ```bash
   npm run dev
   ```
