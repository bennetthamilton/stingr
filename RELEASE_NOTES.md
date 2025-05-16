# 📦 Release Notes – `stingr`

> _Status: Alpha – Early Development Phase_

---

## 🚀 Overview

The `stingr` project is in the early stages of development. We're focused on building out core features to support a full booking experience for tattoo clients and artists. This release captures the current progress and highlights known issues and next steps.

---

## ✅ Features Implemented

- 🌐 Project scaffolded with monorepo structure (frontend + backend)
- 🎨 Frontend UI with:
  - Booking form with input fields
  - Appointment type dropdown
  - Terms and Conditions agreement checkbox
- 🔧 Initial backend server and AWS integration setup
- 📦 Support for environment variables via `.env`

---

## ⚠️ Known Issues & Limitations

- 🔌 **Booking form not yet connected to backend**
- 🔐 **No user authentication/authorization**
- 🔗 **URLs are not encrypted**
- 🖼 **Placeholder images missing**
- 🔘 **Some buttons require being clicked twice**
- 🧭 **Navigation can be unresponsive on first click**
- 📋 **Consultation dropdown has poor readability**
- 🧪 **Testing coverage is minimal**

---

## 🛠 Planned Improvements

- Full backend integration for appointment creation and retrieval  
- User login & registration flows  
- Implement secure authentication with JWT  
- Add loading states and form validation feedback  
- Encrypt sensitive URL parameters  
- UI polish: improve dropdowns, button behavior, and responsiveness  
- Placeholder art and loading animations

---

## 📂 Repository Structure

See the [Project Structure](#) section in the README for a breakdown of the codebase.

---

## 🧪 Testing

Minimal unit tests exist for backend logic. Frontend tests are planned in future iterations using tools like Playwright or React Testing Library.

---

## 🔄 Next Release Preview

In the next release, we expect to:

- Enable real appointment submission to the backend  
- Launch artist profiles and image galleries  
- Complete login/signup with backend authentication  
- Polish booking calendar selection

---

_Thank you for checking out `stingr`! Feedback, issues, and PRs are welcome._
