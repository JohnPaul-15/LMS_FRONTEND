<<<<<<< HEAD
# LMS_FRONTEND
=======
# LibDash - Modern Library Management Dashboard

A sleek, dark-themed library management system built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Dark Theme**: Sleek, dark UI with vibrant accent colors (orange and yellow) for a modern look.
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices.
- **Dashboard Overview**: Key metrics and recent activity displayed in an easy-to-read format.
- **Books Management**: CRUD operations for managing library books, including search and filtering.
- **Borrowers Management**: Track borrowers, their borrowed books, and due dates.
- **User Management**: Admin and librarian roles with appropriate permissions.
- **Authentication**: Secure login, registration, and password reset flows.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Charts**: Recharts
- **Animations**: Framer Motion

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd libdash
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
libdash/
├── src/
│   ├── app/              # Next.js app router pages
│   │   ├── layout/      # Layout components (e.g., DashboardLayout)
│   │   └── ui/          # UI components (e.g., buttons, cards)
│   ├── lib/             # Utility functions and hooks
│   └── styles/          # Global styles and Tailwind config
├── public/              # Static assets
├── tailwind.config.js   # Tailwind CSS configuration
├── next.config.js       # Next.js configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production application
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code linting

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [Recharts](https://recharts.org/)
- [Framer Motion](https://www.framer.com/motion/)
>>>>>>> fea21de (Initial Commit)
