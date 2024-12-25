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
  return children;
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  const pathname = usePathname();
  const pageBody = getBody({ children, pathname });

  return (
    <ApolloProvider client={client}>
      <SocketContextProvider>
        <html lang="en">
          <head>
            <title>Scoreplug - Your sure plug for football scores</title>
          </head>
          <body style={{ '--max-width': '1240px' } as React.CSSProperties} className={`${inter.className} min-h-screen bg-black-900`}>
            <Header />
            <div className="grid grid-cols-[240px,_1fr,_240px] gap-4 mt-6 lg:mt-20 m-auto max-w-[var(--max-width)]">
              <Leftbar />
              {pageBody}
              <Rightbar />
            </div>
            <Footer />
          </body>
        </html>
      </SocketContextProvider>
    </ApolloProvider>
  );
};

