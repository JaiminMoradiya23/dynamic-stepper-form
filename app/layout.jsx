import './globals.css';

export const metadata = {
  title: 'Dynamic Step Form',
  description: 'Dynamic Step-Form Using Next js App Router With tailwindcss',
  generator: 'R&D',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body>{children}</body>
    </html>
  );
}
