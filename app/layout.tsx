import Body from "./body";
import "./globals.css";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {

  return (
    <Body>
      {children}
    </Body>
  );
};

