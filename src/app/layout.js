import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from '@/components/ui/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Ali Zohaib | Full Stack Developer',
  description: 'Premium futuristic portfolio of Ali Zohaib, Full Stack Developer and AI/Robotics Graduate',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased`}>
        <Navigation />
        <main className="relative min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
