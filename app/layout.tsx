"use client";

import { ApolloProvider } from "@apollo/client";
import client from "@/apolloClient";

import { Inter } from "next/font/google";
import { usePathname } from "next/navigation";

import { Header, Leftbar, Rightbar, Footer } from './_components';
import CompetitionLayout from "./_components/layouts/competition";
import MatchLayout from "./_components/layouts/match";
import TeamLayout from "./_components/layouts/team";

import SocketContextProvider from "./SocketContext";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

function getBody({ pathname, children }: { pathname: string; children: React.ReactNode; }) {
  if (pathname.startsWith("/competition/")) return (<CompetitionLayout>{children}</CompetitionLayout>);
  else if (pathname.startsWith("/match/")) return (<MatchLayout>{children}</MatchLayout>);
  else if (pathname.startsWith("/team/")) return (<TeamLayout>{children}</TeamLayout>);
  return (
    <div className="mobile-layout md:tablet-layout lg:desktop-layout grid gap-4">
      <div className="leftbar">
        <Leftbar />
      </div>
      <div className="page-content mb-8 md:mb-0">
        {children}
      </div>
      <div className="rightbar">
        <Rightbar />
      </div>
    </div>
  );
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  const pageBody = getBody({ children, pathname });

  return (
    <ApolloProvider client={client}>
      <SocketContextProvider>
        <html lang="en" className="font-figtree">
          <head>
            <title>Scoreplug - Your sure plug for football scores</title>
          </head>
          <body style={{ '--max-width': '1240px' } as React.CSSProperties} className={`${inter.className} min-h-screen bg-black-900`}>
            <Header />
            <div className="mt-10 md:mt-20 m-auto max-w-[var(--max-width)] px-2 sm:px-4 lg:px-0">
              {pageBody}
            </div>
            <Footer />
          </body>
        </html>
      </SocketContextProvider>
    </ApolloProvider>
  );
};

