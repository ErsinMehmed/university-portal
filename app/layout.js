import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Provider from "../providers/MainProvider";
import Colors from "@/components/Colors";
import { AuthProvider } from "../providers/AuthProvider";

export const metadata = {
  title: "Job portal",
  description: "Job portal",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" sizes="32x32" href="/images/logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <AuthProvider>
          <Provider>
            {children}
            <Analytics />

            <SpeedInsights />

            <Colors />
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
