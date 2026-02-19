import type { Metadata, Viewport } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { LoadingProvider } from "@/components/LoadingProvider";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://devmama.dev"),
  title: "Dev Mama - Digital Agency | High-End Web Design & Development",
  description: "We are a digital agency specializing in high-end design and development for brands that refuse to blend in. Crafting lasting impressions through modern web experiences.",
  keywords: ["web design", "web development", "digital agency", "react", "next.js", "frontend", "UI/UX"],
  authors: [{ name: "Dev Mama" }],
  creator: "Dev Mama",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devmama.dev",
    siteName: "Dev Mama",
    title: "Dev Mama - Digital Agency",
    description: "High-end design and development for brands that refuse to blend in.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Dev Mama Digital Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Mama - Digital Agency",
    description: "High-end design and development for brands that refuse to blend in.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <head>
        {/* Preconnect to external domains for faster resource loading */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="preconnect" href="https://i.pinimg.com" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://i.pinimg.com" />
        
        {/* Preload critical above-fold images */}
        <link 
          rel="preload" 
          as="image" 
          href="https://res.cloudinary.com/dhvljfjkd/image/upload/v1771436561/landingagency-poster.jpg"
          type="image/jpeg"
        />
        
        {/* Preload critical fonts */}
        <link 
          rel="preload" 
          href={`${manrope.variable}`}
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href={`${playfair.variable}`}
          as="font" 
          type="font/woff2" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <LoadingProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </LoadingProvider>
        <Toaster />
        <Analytics />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js')
                    .then((registration) => {
                      console.log('SW registered: ', registration);
                    })
                    .catch((error) => {
                      console.log('SW registration failed: ', error);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
