"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";

import { Inter } from "next/font/google";

import { Header, Leftbar, Rightbar, Footer } from './_components';
import CompetitionLayout from "./_components/layouts/competition";
import MatchLayout from "./_components/layouts/match";
import TeamLayout from "./_components/layouts/team";
import { usePathname } from "next/navigation";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function getBody({ pathname, children }: { pathname: string; children: React.ReactNode; }) {
  if (pathname.startsWith("/competition/")) return (<CompetitionLayout>{children}</CompetitionLayout>);
  else if (pathname.startsWith("/match/")) return (<MatchLayout>{children}</MatchLayout>);
  else if (pathname.startsWith("/team/")) return (<TeamLayout>{children}</TeamLayout>);
  return children;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const pageBody = getBody({ children, pathname });

  return (
    <ApolloProvider client={client}>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <div className="grid grid-cols-4">
            <Leftbar />
            <div className="col-span-2 p-4">
              {pageBody}
            </div>
            <Rightbar />
          </div>
          <Footer />
        </body>
      </html>
    </ApolloProvider>
  );
};

