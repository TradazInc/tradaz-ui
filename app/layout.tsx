import { SWRProvider } from "@/components/shared/SWRProvider";
import { Provider } from "@/components/ui/provider";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";
import { raleway, spaceGrotesk } from "./fonts";

export const metadata: Metadata = {
  title: "Tradaz",
  description:
    "Simplify your business operations with tools that make inventory, sales, customer and staff management easy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body>
        <Provider>
          <SWRProvider>
            {children}
            <Toaster />
          </SWRProvider>
        </Provider>
      </body>
    </html>
  );
}
