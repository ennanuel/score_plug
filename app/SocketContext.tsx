import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { Socket } from "socket.io-client";
import { Match } from "@/types/global.type";
import { io } from "socket.io-client";

type SocketData = {
    matches: { [key: string]: Match };
    competitions: string[];
    teams: string[];
}

const socket = io(`${process.env.NEXT_PUBLIC_API_URI}`)


export const SocketContext = createContext < { socket: Socket, socketData: SocketData } > ({
    socket,
    socketData: {
        matches: {},
        competitions: [],
        teams: []
    }
});


const SocketContextProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => {
    const [socketData, setSocketData] = useState<SocketData>({
        matches: {},
        competitions: [],
        teams: []
    });

    useEffect(() => { 
        socket.on('match-update', (data: SocketData) => {
            console.log(data);
            setSocketData(data);
        })
    }, [socket]);

    return (
        <SocketContext.Provider value={{ socket, socketData }}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContextProvider;