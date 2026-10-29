# Changelog

## [Unreleased]

### Security

- Updated React Router 7, Vite 8, Vitest 4, and vulnerable transitive dependencies within their existing supported version ranges.
- Refreshed the npm lockfile and documented reproducible installs with `npm ci`.
- Marked Vite and Vitest configuration files as ES modules for compatibility with the updated Vite config loader.

## [2.0.0] - 25/03/2026

### Changed

- Rebuilt the template on top of `Vite 8`, `React 19`, `React Router 7`, `Redux Toolkit 2`, `Bootstrap 5`, and current TypeScript tooling.
- Replaced the legacy CRA and `react-app-rewired` runtime with a modern Vite-based build, preview, and test workflow.
- Migrated application routing to a data-router setup with guarded redirects for guests and authenticated demo sessions.
- Reworked the SCSS theme layer for the current stack and refreshed dashboard, tables, recent posts, quick links, and maps styling.
- Updated the project documentation to reflect the current runtime, demo credentials, optional environment variables, and deployment base path support.

### Added

- Added local demo authentication based on browser session storage with `user / password` credentials.
- Added Redux Toolkit slices for demo posts and UI state.
- Added `Vitest` and Testing Library coverage for session and routing regressions.
- Added accessibility improvements for header and sidebar navigation, including skip-to-content support and improved ARIA labeling.
- Added a keyless maps fallback using embedded OpenStreetMap, with optional Google Maps rendering when `VITE_GOOGLE_MAPS_API_KEY` is configured.

### Removed

- Removed the legacy GraphQL demo backend, old Redux action/reducer structure, browser JWT/polyfill hacks, and other unused CRA-era code paths.
- Removed deprecated or unnecessary dependencies carried over from the previous template implementation.

### Fixed

- Fixed the root route so `/` redirects correctly instead of falling into the 404 page.
- Fixed dashboard widget and table styling regressions introduced during the platform migration.

## [1.5.0] - 14/09/2023

- Added react-scripts version 5 along with webpack version 5 support.
- Added support for node.js version > 20
- Updated React.js from 16 to 18 version
- Removed old webpack configs.
- Removed unnecessary dev dependencies.
- Replaced deprecated glyphicons-halflings icon library with bootstrap-icons

## [1.4.2] - 22/12/2023

- Updated dependencies

## [1.4.1]
 
### Updated
- Added link to flatlogic on login page

## [1.4.0]
 
### Updated
- Update libs, fixed text visibility

## [1.3.0]
 
### Updated
- Update libs
 
## [1.2.0]
 
### Updated
- Update libs
- Merge PR 
 
## [1.1.0]

### Updated

Following libs have beed updated to the recent versions:
- React - 16.7.1
- React-router - 4.3.1
- Reactstrap - 7.1.0

## [1.0.0]

### New Features

- Shadow added to image
