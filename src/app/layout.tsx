import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import Navbar from "@/components/layouts/Navbar";
import React from "react";
import { sharedTitle, sharedDescription } from "@/app/shared-metadata";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Analytics } from "@vercel/analytics/react";
import { getSocials } from "@/lib/contentful";
import { ReCaptchaProvider } from "next-recaptcha-v3";
import { Toaster } from "@/components/ui/sonner";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollToTop from "@/components/ScrollToTop";
import LenisScrollProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://tuna.one"),
  robots: {
    index: true,
    follow: true,
  },
  title: sharedTitle,
  description: sharedDescription,
  openGraph: {
    title: {
      template: `%s`,
      default: sharedTitle,
    },
    description: sharedDescription,
    type: "website",
    url: "/",
    siteName: sharedTitle,
    locale: "en_US",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    site: `@b2rbecue`,
    creator: `@b2rbecue`,
  },
  other: {
    pinterest: "nopin",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  async function fetchData() {
    return await getSocials();
  }
  const socials = await fetchData();
  return (
    <ReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
      hidden
    >
      <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <body>
          <LenisScrollProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <div className="mx-5 xl:mx-0">
                <Navbar socials={socials} />
                {children}
              </div>
            </ThemeProvider>
          </LenisScrollProvider>
          <ScrollToTop />

          <SpeedInsights />
          <Analytics />
          <Toaster />
        </body>
      </html>
    </ReCaptchaProvider>
  );
}
