# Techfest 2026 Interactive 3D Web Application

An immersive, high-performance 3D web application built for the IIT Bombay Techfest web development competition. Designed to push the boundaries of modern web interfaces, this application features a fully reactive 3D WebGL environment integrated seamlessly with a cyberpunk-inspired React architecture.

## 🚀 Features

* **Persistent 3D Universe**: Powered by `three.js` and `@react-three/fiber`, the 3D background features a central rotating core, orbital rings, and dynamic particle fields that persist seamlessly across page navigations without re-rendering or WebGL context loss.
* **Scroll-Reactive Physics**: The entire 3D environment reacts dynamically to your scroll position—accelerating rotations, shifting axes, and bringing the geometric core closer to the viewport.
* **Deep Interactivity**: Interactive floating background geometries (Octahedrons, Torus rings, Boxes) react to mouse hover states with vector scaling and intense emissive glow, and execute rapid spin mechanics when clicked.
* **Cyberpunk HUD System**: A complex, responsive HTML/CSS overlay mimicking a futuristic heads-up display, complete with scanlines, coordinate tracking, system load monitoring, and a custom magnetic cyber-cursor.
* **GSAP Animations**: Buttery-smooth page transitions, staggered `.info-card` reveals, and 3D CSS perspective hover states powered by GSAP ScrollTrigger and advanced CSS transforms.
* **Bulletproof Architecture**: Equipped with custom React Error Boundaries and built exclusively with native standard materials to guarantee GPU stability across all devices (no silent shader crashes).

## 🛠 Tech Stack

* **Core Framework**: React (Vite), React Router DOM (v6)
* **3D Rendering**: Three.js, React Three Fiber
* **Animations**: GSAP (GreenSock Animation Platform)
* **Styling**: Vanilla CSS with advanced Custom Properties, CSS variables, and Glassmorphism techniques
* **Typography**: Google Fonts (`Syncopate` for display, `Share Tech Mono` for data)

## 📦 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/parthbadgire-code/techfest-wd-2.git
   cd techfest-wd-2
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```
   *The application will launch locally at `http://localhost:5173`.*

4. **Build for Production**:
   ```bash
   npm run build
   ```
   *The optimized static output will be generated in the `/dist` directory.*

## 📂 Project Structure

* `/src/App.jsx` - The main application hub managing the layout, HUD logic, routing, and custom cursor.
* `/src/Scene.jsx` - The dedicated 3D WebGL environment containing all `three.js` meshes, lighting, and interactivity.
* `/src/index.css` - The global design system, including all CSS animations and styling tokens.
* `/src/pages/` - Contains the modular React route components (`Home`, `Events`, `Databanks`, `Register`).
* `/src/ErrorBoundary.jsx` - Safety wrapper to gracefully catch and isolate WebGL/React crashes.

## 🎨 Design Philosophy

The application eschews traditional "flat" web design in favor of a "Z-axis first" approach. By combining deep blacks (`#030303`), high-contrast neon accents (Cyan `#00f0ff` & Crimson `#ff003c`), and floating glassmorphism panels, the interface feels less like a website and more like a tactile, living terminal.

## 📝 License

Developed for IIT Bombay Techfest. All rights reserved.
