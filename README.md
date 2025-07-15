# Terminal based Portfolio

A modern, interactive portfolio web application for Amisha Sharma, a Full Stack Developer. This project showcases skills, experience, and social profiles in a visually appealing and responsive format.

## Features

- **Personal ID Card**: Displays profile image, name, role, location, email, and phone number.
- **Social Links**: Quick access to Github, LinkedIn, LeetCode, Codeforces, X (Twitter), and Hackerrank profiles with interactive icons.
- **Terminal Component**: Simulates a terminal interface for a unique, developer-centric experience.
- **Responsive Design**: Built with Tailwind CSS for modern, mobile-friendly layouts.
- **Easy Customization**: Modular React components for easy updates and extension.

## Tech Stack

- **Frontend**: React.js (with hooks)
- **Styling**: Tailwind CSS, custom CSS
- **Icons**: Lucide React, React Icons
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js (v16 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd terminal-portfolio
   ```
2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
4. Open [http://localhost:5173](http://localhost:5173) to view the app in your browser.

## Project Structure

```
terminal-portfolio/
├── public/                # Static assets (images, resume)
├── src/
│   ├── components/        # React components (IDCard, Terminal, etc.)
│   ├── hooks/             # Custom React hooks
│   ├── styles/            # CSS files
│   ├── utils/             # Utility functions (e.g., terminal commands)
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── index.html             # HTML template
├── tailwind.config.js     # Tailwind CSS config
├── vite.config.js         # Vite config
└── README.md              # Project documentation
```

## Customization
- Update your personal information and social links in `src/components/IDCard.jsx`.
- Replace images in the `public/` folder as needed.
- Add or modify terminal commands in `src/utils/commands.js`.

## License

This project is for personal portfolio use. Feel free to fork and adapt for your own portfolio!

---

**Developed by Amisha Sharma** 
