import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Для Моли 💗',
  description: 'Маленький уголок, созданный специально для Моли.',
  applicationName: 'Для Моли',
  openGraph: {
    title: 'Для Моли 💗',
    description: 'Маленький уголок, созданный специально для тебя.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#fff1f5',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
