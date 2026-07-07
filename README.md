# Premium Developer Portfolio Template

A premium, interactive, space-themed developer portfolio template built using React, Vite, TypeScript, Tailwind CSS v4, and Framer Motion. Easily customizable for any developer.

## ✨ Features

- 🌌 **Interactive Particle Network Background**: High-performance canvas-based network particle effect that responds to mouse hover and pushes particles away gently.
- 🖱️ **Cursor Glow Spotlight**: Smooth mouse-tracking radial gradient overlay.
- 🚀 **Dynamic Typing Tagline**: Auto-looping animated subtitles.
- 📊 **Quick Stats Dashboard**: Showcases coding metrics, competitive programming stats, and leadership highlights.
- 🛡️ **Interactive Projects Filter**: Filterable grid displaying projects categorized by tech stack.
- ✉️ **Functional Contact Form**: Connected to **Web3Forms** for instant email routing straight to your inbox.
- 📱 **Fully Responsive Layout**: Premium look-and-feel optimized across mobile, tablet, and desktop viewports.

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
   git clone https://github.com/yourusername/Portfolio.git
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

## ⚙️ Customization

### 1. Personalize Portfolio Data
All content (name, stats, skills, projects, timeline, and certifications) is serialized in a single configuration file. Modify `src/data/portfolio.ts` to update the site with your own details.

### 2. Activate Contact Form
Get a free Access Key from [Web3Forms](https://web3forms.com/) and replace the placeholder in `src/App.tsx`:
```typescript
formData.append("access_key", "YOUR_ACCESS_KEY_HERE")
```
