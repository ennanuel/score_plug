"use client";

import { Suspense, useEffect } from "react";
import { getIpAddress, saveToDB } from "../_utils";
import { COLLECTION_ID } from "../_assets/constants";
import { useSearchParams } from "next/navigation";

export default function RecordVisitorWrapper() {
    return (
        <Suspense>
            <RecordVisitor />
        </Suspense>
    )
}

function RecordVisitor() {
    const searchParams = useSearchParams();
    
    useEffect(() => {
        const skipVisitor = Date.now() <= Number(localStorage.getItem('omit')) || searchParams.get('omit') === 'true';

        if(skipVisitor) {
            const nextThreeDays = Date.now() + 259200000;
            localStorage.setItem('omit', String(nextThreeDays));
        } else {
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
                    console.error(error);
            });
        }
    }, []);

  return null;
}