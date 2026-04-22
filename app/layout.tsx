import { Provider } from "./ui/Provider";
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
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
        </Provider>
      </body>
    </html>
  );
}