# Codantrix Labs

**Codantrix Labs** is an enterprise-grade AI/ML solutions partner, delivering pragmatic intelligence for measurable industrial and business ROI. This repository contains the source code for the Codantrix Labs web platform, built with modern web technologies for performance, scalability, and SEO.

## 🚀 Tech Stack

*   **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
*   **Backend / Auth:** Cloudflare Workers + D1 (sessions)
*   **Icons:** [Lucide React](https://lucide.dev/)
*   **Animations:** [Framer Motion](https://www.framer.com/motion/)
*   **Form Handling:** React Hook Form + Zod
*   **Email:** Resend

## 📂 Project Structure

```
src/
├── app/                 # Next.js App Router pages & layouts
│   ├── blog/            # Blog & Article pages
│   ├── careers/         # Careers & Job Application pages
│   ├── case-studies/    # Portfolio & Case Studies
│   ├── contact/         # Contact page
│   ├── services/        # Service offering pages
│   ├── testimonials/    # Social proof & Client success
│   └── ...
├── components/          # Reusable UI components
│   ├── cards/           # Service, Case Study, & Contact cards
│   ├── careers/         # Job application forms & listings
│   ├── home/            # Homepage sections (Hero, Industry, etc.)
│   ├── layout/          # Navbar, Footer, & Shell
│   └── ui/              # Base UI elements
├── lib/                 # Utility functions & helpers
└── utils/               # Misc utilities
```

## ⚡ Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your machine.

### Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-org/codantrix-labs.git
    cd codantrix-labs
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    Create a `.env.local` file in the root directory and add your API keys:
    ```env
    GROQ_API_KEY=your_groq_key
    RESEND_API_KEY=your_resend_key
    SETUP_KEY=change_me_setup_key
    ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the site.

### Building for Production

To create an optimized production build:

```bash
npm run build
```

To start the production server:

```bash
npm start
```

## 🛠️ Key Features

*   **Responsive Design:** Fully adaptive layouts for Mobile, Tablet, Laptop, and Desktop screens.
*   **Performance:** Optimized images, fonts, and code splitting via Next.js.
*   **Dynamic Content:** Data-driven Blog, Case Studies, and Services sections.
*   **Interactive UI:** Glassmorphism effects, smooth transitions, and engaging animations.
*   **Enterprise Navigation:** Multi-tier responsive navbar with mega-menu capabilities for larger screens.

## 🤝 Contributing

1.  Create a feature branch (`git checkout -b feature/amazing-feature`).
2.  Commit your changes (`git commit -m 'Add some amazing feature'`).
3.  Push to the branch (`git push origin feature/amazing-feature`).
4.  Open a Pull Request.

## 📄 License

Proprietary software. All rights reserved by **Codantrix Labs**.
