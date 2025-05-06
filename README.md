# 🐝 Stingr - Tattoo Artist Discovery Platform

Stingr is a modern web app designed to connect tattoo clients with artists in an intuitive, swipe-based format. Our mission is to create a seamless experience for discovering artists, booking consultations, and supporting independent tattoo professionals.

## Overview for Developers
This repository is for **internal development** and is intended for Stingr's **engineering team**. Below, you'll find guidelines for setting up, contributing, and maintaining the project.

## Release notes
stingr is in its early stages of development. We’re currently focusing on integrating the booking feature by connecting the frontend with the backend. Next up, we’ll complete the login and sign-up interfaces and build the supporting backend API.
# Bugs
- Booking form is not yet connected to the backend
- User authentication and authorization are not implemented
- No URL encryption
- No placeholder images
- Page navigation can be inconsistent
- Some buttons are non-functional or require multiple clicks
- Consultation dropdown is hard to read

## Features
- **Swipe-based artist discovery** – Find artists based on style, location, and availability.
- **Instant booking & consultations** – Simplify the appointment process with built-in scheduling.
- **Curated artist profiles** – Showcase portfolios, pricing, and reviews.
- **Fair & artist-friendly** – A platform that prioritizes independent artists and emerging talent.

## Tech Stack
- **Frontend:** React (Next.js) with Tailwind CSS
- **Backend:** Node.js with Express & PostgreSQL
- **Authentication:** Firebase/Auth0
- **Hosting:** Vercel/DigitalOcean

## Roadmap
- [ ] Design finalized in Figma
- [ ] Build initial MLP (Minimum LOVABLE Product)
- [ ] Implement authentication & artist profiles
- [ ] Add booking functionality
- [ ] Beta testing with early users

## Development Setup
### Prerequisites
- Node.js & npm installed
- PostgreSQL database setup
- Firebase/Auth0 credentials (for authentication)

### Installation
```bash
# Clone the repository
git clone https://github.com/yourusername/stingr.git

# Navigate to backend api directory
cd stingr/src/stingr-backend/api

# Install dependencies
npm install

# Run the backend
npm run dev

# (In a new Terminal)

# Navigate to frontend api directory
cd stingr/src/stingr-frontend/src/app

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## Project Structure
```
stingr/
│── src/                # Source code
│   ├── components/     # Reusable UI components
│   ├── pages/          # Next.js pages
│   ├── api/            # Backend API routes
│── public/             # Static assets
│── docs/               # Documentation
│── tests/              # Unit & integration tests
│── .env.example        # Environment variables template
│── package.json        # Project dependencies
│── README.md           # Project overview
```

## Contribution Guidelines
### Branching Strategy
- **`main`** – Stable production-ready code.
- **`dev`** – Active development branch.
- **Feature branches** – Create feature branches from `dev` (e.g., `feature/auth-system`).

### Code Standards
- Follow **ESLint & Prettier** formatting.
- Use **JSDoc comments** for documentation.
- Ensure all commits follow the **conventional commit** format.

### Testing
- Run tests before committing:
```bash
npm test
```
- Write **unit tests** for new features using **Jest**.

---

## Documentation & Resources
- 📜 [System Design Document](docs/system-design.md)
- 🛠️ [Projects](https://github.com/yourusername/stingr/projects)
- ❗ [Issues](https://github.com/yourusername/stingr/issues)
- 📄 [License](LICENSE)

### Reporting Issues
If you encounter a bug or want to request a feature, submit an issue in our [Issue Tracker](https://github.com/yourusername/stingr/issues).

This README is for **internal developers only**. Please follow best practices to maintain code quality and ensure a smooth development workflow. 🚀

