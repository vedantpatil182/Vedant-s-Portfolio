import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SplashCursor from "@/components/SplashCursor";
import PixelBlast from "@/components/PixelBlast";
import AiAgentChat from "@/components/AiAgentChat";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          geist.variable,
          geistMono.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            COLOR_UPDATE_SPEED={10}
            SHADING
            RAINBOW_MODE={false}
            COLOR="#A855F7"
          />
          <TooltipProvider delayDuration={0}>

            <div className="relative z-10 max-w-2xl mx-auto pb-24 px-6">
              {children}
            </div>
            <Navbar />
            <AiAgentChat />
            <div className="absolute inset-x-0 bottom-0 h-[150px] overflow-hidden z-0 pointer-events-none">
              <PixelBlast
                variant="square"
                pixelSize={3}
                color="#D8B4FE"
                patternScale={2}
                patternDensity={1}
                liquid={false}
                enableRipples={true}
                edgeFade={0.5}
                transparent={true}
                className="w-full h-full"
                style={{
                  maskImage: "linear-gradient(to top, black, transparent)",
                  WebkitMaskImage: "linear-gradient(to top, black, transparent)",
                }}
              />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
