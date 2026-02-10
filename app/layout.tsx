import { Provider } from "./ui/Provider";
import { nunito } from "./ui/fonts";
import { ColorModeProvider } from "../components/ui/color-mode";

interface Props {
  children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<Props>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Provider>
          <ColorModeProvider defaultTheme="dark" forcedTheme="dark">
            {children}
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  );
}
