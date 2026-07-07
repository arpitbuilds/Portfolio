# Developer Portfolio

A premium, interactive, space-themed developer portfolio website built using React, Vite, TypeScript, Tailwind CSS v4, and Framer Motion.

## ✨ Features

- 🌌 **Interactive Particle Network Background**: High-performance canvas-based network particle effect that responds to mouse hover and pushes particles away gently.
- 🖱️ **Cursor Glow Hover Overlay**: Smooth mouse-tracking radial gradient spotlight.
- 🚀 **Dynamic Typing Tagline**: Auto-looping animated subtitles.
- 📊 **Quick Stats Dashboard**: Showcases LeetCode metrics, competitive programming stats, and GDSC Core Team membership.
- 🛡️ **Interactive Projects Filter**: Filterable grid displaying MERN Stack and AI/Optimization projects.
- ✉️ **Functional Contact Form**: Connected to **Web3Forms** for instant email routing straight to your inbox.
- 📱 **Fully Responsive Layout**: Premium look-and-feel optimized across all screen sizes.

## 🛠️ Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS v4, Framer Motion
- **Utilities/Icons:** Lucide-React, clsx, tailwind-merge
- **Build Tool:** Vite
- **Email Service:** Web3Forms API

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/arpitbuilds/Portfolio.git
   cd Portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📬 Contact Form Activation

To activate email forwarding for the contact form, get a free Access Key from [Web3Forms](https://web3forms.com/) and replace `"YOUR_ACCESS_KEY_HERE"` inside `src/App.tsx`:
```typescript
formData.append("access_key", "f10f05a1-c85c-4392-b6b9-5fea613ac2e2")
```
