"use client";

import { Inter, Figtree } from "next/font/google";

import { ApolloProvider } from "@apollo/client";

import { Footer, Header, Leftbar, Rightbar } from "./_components";

import CompetitionLayout from "./_components/layouts/competition";
import MatchLayout from "./_components/layouts/match";
import TeamLayout from "./_components/layouts/team";

import client from "@/apolloClient";
import SocketContextProvider from "./SocketContext";
import { usePathname } from "next/navigation";
import RecordVisitor from "./_components/RecordVisitor";


const inter = Inter({ subsets: ["latin"] });
const figtree = Figtree({ subsets: ["latin"] });


export default function Body({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const pageBody = getBody({ children, pathname });

    return (
        <ApolloProvider client={client}>
            <SocketContextProvider>
                <html lang="en">
                    <head>
                        <title id="site-title">Scoreplug - Your sure plug for football scores</title>
                    </head>
                    <body className={`${inter.className} ${figtree.className} font-figtree min-h-screen bg-black-900`}>
                        <RecordVisitor />
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