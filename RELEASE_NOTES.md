# 📦 Release Notes – `stingr`

> _Status: Alpha – Early Development Phase_

---

## 🚀 Overview

The `stingr` continues to evolve toward a seamless matchmaking and booking platform for tattoo clients and artists. This release includes critical backend integration, enhanced calendar logic, and improved profile handling.

---

## ✅ Features Implemented

- 🌐 Project scaffolded with monorepo structure (frontend + backend)
- 🎨 Frontend UI:
  - Booking management (create, view, reschedule, delete)
  - Landing page (initial)
  - Sign up page for artists
  - Browse artists (swipe-based discovery)
- 🔧 Backend Integration:
  - AWS Lambda + DynamoDB for storing/retrieving booking data and artist profile data 
  - `/profile` and `/booking` API endpoints 
- 📦 Support for environment variables via `.env`

---

## ⚠️ Known Issues & Limitations

- 🔌 **Sign-up form not fully connected with backend**
- 📋 **Unable to upload images to S3 bucket**
- 🔐 **No user authentication/authorization**
- 🔗 **URLs are not encrypted**
- 🖼 **Placeholder images missing**
- 🔘 **Some buttons require being clicked twice**
- 🧭 **Navigation can be unresponsive on first click**
- 🧪 **Testing coverage is minimal**

---

## 🛠 Planned Improvements

- Full backend integration for artist/client profiles and image uploading
- Complete user login & registration flows  
- Implement secure authentication  
- Add loading states and form validation feedback  
- Encrypt sensitive URL parameters  
- UI polish: improve dropdowns, button behavior, and responsiveness 
- Placeholder art and loading animations
- Begin frontend testing
- Implement secure messaging platform

---

## 📂 Repository Structure

See the [Project Structure](#) section in the README for a breakdown of the codebase.

---

## 🧪 Testing

Minimal unit tests exist for backend logic. Frontend tests are planned in future iterations using tools like Playwright or React Testing Library.

---

## 🔄 Next Release Preview

In the next release, we expect to:

- ✅ Complete backend support profile creation and image uploads  
- 🧑‍🎨 Launch initial artist profile viewer with swiping interface  
- 🔐 Roll out basic login/signup with token-based auth  
- 🗓 Refine page UI/UX flow  

---

_Thank you for checking out `stingr`! Feedback, issues, and PRs are welcome._
