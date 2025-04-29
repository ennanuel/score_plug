"use client";

import { gql, useQuery } from "@apollo/client";
import { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { MdClose } from "react-icons/md";
import { CompetitionLoading } from "./loading";
import { Competition, Match, Team } from "@/types/global.type";
import Link from "next/link";
import Image from "next/image";
import MatchCardAlt from "./MatchCardAlt";
import { BsSearch } from "react-icons/bs";
import { IoPerson } from "react-icons/io5";
import { TbSoccerField } from "react-icons/tb";
import { FaTrophy } from "react-icons/fa6";

const QUERY = gql`
    query GetSearchResult($search: String!) {
        competitionsSearch(q: $search) {
            count
            result {
                _id
                name
                emblem
                area {
                    name
                }
            }
        }
        teamsSearch(q: $search) {
            count
            result {
                _id
                name
                shortName
                tla
                crest
                area {
                    name
                }
            }
        }
        matchesSearch(q: $search) {
            count
            result {
                _id
                utcDate
                status
                minute
                score {
                    fullTime {
                        home
                        away
                    }
                }
                homeTeam {
                    _id
                    name
                    shortName
                    crest
                }
                awayTeam {
                    _id
                    name
                    shortName
                    crest
                }
            }
        }
    }
`

const OPTIONS = [
    {
        title: "All",
        value: ""
    },
    {
        title: "Matches",
        value: "matches"
    },
    {
        title: "Competitions",
        value: "competitions"
    },
    {
        title: "Teams",
        value: "teams"
    },
];

type QueryResult = {
    competitionsSearch: { count: number; result: Competition[] };
    matchesSearch: { count: number; result: Match[] };
    teamsSearch: { count: number; result: Team[] };
}

export default function Search() {
    const [searchValue, setSearchValue] = useState("");
    
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");

    const { loading, error, data } = useQuery<QueryResult>(QUERY, { 
        variables: {
            search: searchValue
        }
    });

    const openSearch = () => setShowSearch(true);

    const closeSearch = () => {
        setShowSearch(false);
        setSearch("");
    }

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        setSearchValue(search);
        openSearch();
    }

    return (
        <div className={`${showSearch ? 'fixed h-screen md:h-auto md:relative bg-[#191919] md:bg-transparent w-full md:w-auto' : 'relative'} top-0 left-0 z-[999] flex flex-col`}>
            <form onSubmit={handleSubmit} action="/search" method="GET" className="m-3 md:m-0 pl-2 flex items-center rounded-full bg-white-100/10 md:bg-[#191919] md:bg-white-100/10">
                <label htmlFor="search" className="text-white-500 flex items-center justify-center">
                    <BiSearch size={16} />
                </label>
                <input 
                    className="h-8 text-2xs px-2 md:text-xs flex-1 bg-transparent border-none outline-none focus:outline-none text-white-500 placeholder:text-white-600 autofill:bg-transparent autofill:text-green-500 pr-2" 
                    type="text"
                    name="q" 
                    id="search" 
                    onFocus={openSearch}
                    onChange={(event) => setSearch(event.target.value)}
                    value={search}
                    placeholder="Barcelona v Chelsea" 
                />
                <button 
                    onClick={closeSearch}
                    type="button"
                    className={`${showSearch ? 'flex' : 'hidden'} items-center justify-center hover:text-white-100 text-white-600 hover:bg-white-100/10 w-6 aspect-square max-h-6 rounded-full mr-1`}
                >
                    <MdClose size={16} />
                </button>
            </form>
            <div className={`${showSearch ? 'block' : 'hidden'} flex-1 md:w-[400px] relative md:absolute md:top-[calc(100%_+_8px)] left-0 rounded-xl md:bg-[#191919] md:shadow-lg shadow-black-900/50 border border-black-900/5`}>
                <div className="flex p-3 items-center justify-start gap-2 overflow-x-auto overflow-y-hidden border-b border-white-100/10">
                    {
                        OPTIONS.map(({ title, value }) => (
                            <button key={value} onClick={() => setFilter(value)} className={`${value === filter ? 'bg-white-100 text-black-900' : 'bg-white-100/10 text-white-600'} px-3 rounded-full flex items-center justify-center h-7 min-w-16`}>
                                <span className="text-2xs font-semibold">{title}</span>
                            </button>
                        ))
                    }
                </div>
                <div className="md:min-h-[30vh]">
                    {
                        loading ?
                            <div className="p-2">
                                <CompetitionLoading size={6} />
                            </div> :
                            !(data?.competitionsSearch?.result?.length || data?.teamsSearch?.result?.length || data?.matchesSearch?.result?.length) && searchValue && !filter ?
                                <div className="flex flex-col justify-center items-center gap-8 py-10">
                                    <span className="flex items-center justify-center w-20 aspect-square">
                                        <BsSearch size={80} className="text-white-900" />
                                    </span>
                                    <span className="text-2xs text-white-800 text-center">No results found for <span className="font-semibold">{searchValue}</span></span>
                                </div> :
                            <div className="overflow-y-auto max-h-[70vh] pt-4 pb-2 flex flex-col gap-4">
                                {
                                    data?.teamsSearch?.result?.length && filter !== "matches" && filter !== "competitions" ?
                                        <ul className="flex flex-col">
                                            {
                                                data
                                                    .teamsSearch
                                                    .result
                                                    .slice(0, 6)
                                                    .map(({ _id, name, crest, area }) => (
                                                        <li key={_id} onClick={closeSearch}>
                                                            <Link href={`/competition/${_id}`} className="flex items-center justify-start gap-3 p-3 hover:bg-white-100/10">
                                                                <Image src={crest} alt={`${name} emblem`} height={40} width={40} className="w-6 aspect-square max-h-6 object-contain" />
                                                                <div className="flex flex-col">
                                                                    <span className="text-3xs font-semibold text-white-100">{name}</span>
                                                                    <span className="text-3xs text-white-700">{area.name}</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                            }
                                        </ul> :
                                        !loading && !data?.teamsSearch?.result?.length && searchValue && filter === "teams" ?
                                            <div className="flex flex-col justify-center items-center gap-8 py-10">
                                                <span className="w-20 p-2 aspect-square rounded-lg bg-white-100/5 flex flex-col gap-1">
                                                    <span className="w-8 aspect-square rounded-full bg-white-100/5 text-white-100/5 overflow-hidden flex items-end justify-center">
                                                        <IoPerson size={28} />
                                                    </span>
                                                    <div className="flex flex-1 gap-1 flex-col">
                                                        <div className="flex flex-1 gap-2 justify-between">
                                                            <span className="block w-12 rounded-md bg-white-100/5"></span>
                                                            <span className="block w-3 rounded-md bg-white-100/5"></span>
                                                        </div>
                                                        <div className="flex flex-1 gap-2 justify-between">
                                                            <span className="block w-8 rounded-md bg-white-100/5"></span>
                                                            <span className="block w-3 rounded-md bg-white-100/5"></span>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span className="text-2xs text-white-800 text-center">No results found for <span className="font-semibold">{search}</span></span>
                                            </div> :
                                            null
                                }
                                {
                                    data?.competitionsSearch?.result?.length && filter !== "teams" && filter !== "matches" ?
                                        <ul className="flex flex-col">
                                            {
                                                data
                                                    .competitionsSearch
                                                    .result
                                                    .slice(0, 5)
                                                    .map(({ _id, name, emblem, area }) => (
                                                        <li key={_id} onClick={closeSearch}>
                                                            <Link href={`/competition/${_id}`} className="flex items-center justify-start gap-3 p-3 hover:bg-white-100/10">
                                                                <Image src={emblem} alt={`${name} emblem`} height={40} width={40} className="w-6 aspect-square max-h-6 object-contain" />
                                                                <div className="flex flex-col">
                                                                    <span className="text-3xs font-semibold text-white-100">{name}</span>
                                                                    <span className="text-3xs text-white-700">{area.name}</span>
                                                                </div>
                                                            </Link>
                                                        </li>
                                                    ))
                                            }
                                        </ul> :
                                        !loading && !data?.competitionsSearch?.result?.length && searchValue && filter === "competitions" ?
                                            <div className="flex flex-col justify-center items-center gap-8 py-10">
                                                <span className="w-20 p-2 aspect-square rounded-lg bg-white-100/5 flex flex-col gap-1">
                                                    <span className="w-8 aspect-square text-white-900 flex items-center justify-center">
                                                        <FaTrophy size={32} />
                                                    </span>
                                                    <div className="flex flex-1 gap-1 flex-col">
                                                        <div className="flex flex-1 gap-2 justify-between">
                                                            <span className="block w-12 rounded-md bg-white-100/5"></span>
                                                            <span className="block w-3 rounded-md bg-white-100/5"></span>
                                                        </div>
                                                        <div className="flex flex-1 gap-2 justify-between">
                                                            <span className="block w-8 rounded-md bg-white-100/5"></span>
                                                            <span className="block w-3 rounded-md bg-white-100/5"></span>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span className="text-2xs text-white-800 text-center">No results found for <span className="font-semibold">{search}</span></span>
                                            </div> :
                                        null
                                }
                                {
                                    data?.matchesSearch?.result?.length && filter !== "competitions" && filter !== "teams" ?
                                        <ul className="flex flex-col">
                                            {
                                                data
                                                    .matchesSearch
                                                    .result
                                                    .slice(0, 5)
                                                    .map((match) => (
                                                        <li key={match._id} onClick={closeSearch} className="border-b border-white-100/10 last:border-transparent">
                                                            <MatchCardAlt match={match} />
                                                        </li>
                                                    ))
                                            }
                                        </ul> :
                                        !loading && !data?.matchesSearch?.result?.length && searchValue && filter === "matches" ?
                                            <div className="flex flex-col justify-center items-center gap-8 py-10">
                                                <span className="w-20 p-2 aspect-square rounded-lg bg-white-100/5 flex flex-col gap-1">
                                                    <span className="w-8 aspect-square text-white-900 flex items-center justify-center">
                                                        <TbSoccerField size={32} />
                                                    </span>
                                                    <div className="flex flex-1 gap-1 flex-col">
                                                        <div className="flex flex-1 gap-2 justify-between">
                                                            <span className="block w-12 rounded-md bg-white-100/5"></span>
                                                            <span className="block w-3 rounded-md bg-white-100/5"></span>
                                                        </div>
                                                        <div className="flex flex-1 gap-2 justify-between">
                                                            <span className="block w-8 rounded-md bg-white-100/5"></span>
                                                            <span className="block w-3 rounded-md bg-white-100/5"></span>
                                                        </div>
                                                    </div>
                                                </span>
                                                <span className="text-2xs text-white-800 text-center">No results found for <span className="font-semibold">{search}</span></span>
                                            </div> :
                                        null
                                }
                            </div>
                    }
                </div>
            </div>
        </div>
    )
};