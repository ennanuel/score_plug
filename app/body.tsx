"use client";

import { usePathname } from "next/navigation";
import { Inter, Figtree } from "next/font/google";

import { useEffect } from "react";

import { ApolloProvider } from "@apollo/client";

import { Footer, Header, Leftbar, Rightbar } from "./_components";

import CompetitionLayout from "./_components/layouts/competition";
import MatchLayout from "./_components/layouts/match";
import TeamLayout from "./_components/layouts/team";

import client from "@/apolloClient";
import SocketContextProvider from "./SocketContext";
import { COLLECTION_ID } from "./_assets/constants";
import { getIpAddress, saveToDB } from "./_utils";


const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });


export default function Body({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const pageBody = getBody({ children, pathname });
    
  useEffect(() => {
    getIpAddress()
      .then((location) => {
        const payload = {
          location,
          userAgent: navigator.userAgent,
          platform: "Scoreplug",
          url: window.location.href
        };

        saveToDB(payload, COLLECTION_ID);
      })
      .catch((error) => {
        console.error(error)
    });
  }, []);

    return (
        <ApolloProvider client={client}>
        <SocketContextProvider>
            <html lang="en">
            <head>
                <title>Scoreplug - Your sure plug for football scores</title>
            </head>
            <body 
                style={{ '--max-width': '1240px' } as React.CSSProperties} 
                className={`${inter.className} ${figtree.className} font-figtree min-h-screen bg-black-900`}
            >
                <Header />
                <main className="px-2 sm:px-4">
                <div className="mt-10 md:mt-20 mx-auto max-w-[var(--max-width)]">
                    {pageBody}
                </div>
                </main>
                <Footer />
            </body>
            </html>
        </SocketContextProvider>
        </ApolloProvider>
    )
};

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