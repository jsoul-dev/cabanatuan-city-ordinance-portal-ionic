# Cabanatuan City Ordinance Portal (Ionic Mobile Prototype)

This repository contains the mobile application prototype for the Cabanatuan City Ordinance Portal. It is built using the modern Ionic Framework (v9) and Angular (v19), serving as the mobile interface for local government unit (LGU) announcements and ordinance exploration.

This project was specifically developed to fulfill the architectural guidelines and requirements for Capstone Project Unit 1.

## Key Features

- **Ordinance Explorer:** A declarative interface for citizens to browse, search, and view detailed information on local barangay and city ordinances.
- **LGU News & Updates:** A centralized module for retrieving the latest announcements from the local government.
- **Strict Standalone Architecture:** The application utilizes modern Angular standalone components exclusively, entirely removing the need for `NgModules`.
- **Declarative Navigation:** Features static, imperative-free routing leveraging declarative `routerLink` directives to navigate across the Single Page Application.
- **Service-Based State Management:** Employs centralized Angular services to manage and deliver application state, bypassing complex URL parameter passing.
- **Modern Angular Control Flow:** Fully adopts modern structural directives (`@for`, `@if`, `@empty`) and the latest Signal-based Inputs/Outputs.

## Prerequisites

To run this project locally, ensure you have the following installed on your machine:

- [Node.js](https://nodejs.org/en/download/) (v20 or higher recommended)
- [Ionic CLI](https://ionicframework.com/docs/cli) (`npm install -g @ionic/cli`)

## Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/YOUR_GITHUB_USERNAME/cabanatuan-city-ordinance-portal-ionic.git
   cd cabanatuan-city-ordinance-portal-ionic
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   ionic serve
   ```
   *The application will automatically compile and open in your default web browser at `http://localhost:8100`.*

## Project Structure

- `src/app/pages/`: Contains the primary application views (Home, News, Ordinances, Ordinance Detail).
- `src/app/components/`: Contains highly reusable UI components (e.g., `OrdinanceCardComponent`).
- `src/app/services/`: Contains centralized business logic and state management services.
- `src/theme/variables.scss`: Houses the custom LGU color palette overrides and global CSS properties.

## Documentation

For an in-depth breakdown of how this prototype satisfies the specific grading rubrics (including Component architecture, Routing, Services, and UI/UX design), please refer to the `Lab-1-Defense-Guide.md` and `Lab-1-Presentation-Script.md` located in the `.docs/` directory.
