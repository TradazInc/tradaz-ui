import { Toaster } from "@/components/ui/toaster";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { Provider } from "@/app/Provider";
interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <style>{`
          * {
            scrollbar-width: none !important;
            -ms-overflow-style: none !important;
          }
          *::-webkit-scrollbar {
            display: none !important;
          }
        `}</style>
      </head>
      <body>
        <Provider>
          {children}
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
