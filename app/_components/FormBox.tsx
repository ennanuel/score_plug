"use memo";

import React, { useMemo } from 'react';
import Image from "next/image";
import { getTeamFormColors } from '../_utils/colors';

const FormBox = ({ outcome, teamCrest }: { outcome: string, teamCrest: string }) => {
    const colors = useMemo(() => getTeamFormColors(outcome), []);
    
    return (
        <div className={`${colors} py-1 px-2 aspect-square rounded-md border flex items-center justify-center gap-2 font-semibold`}>
            <Image src={teamCrest} width={10} height={10} alt="" className="object-contain" />
            <span className="text-sm font-bold">{outcome}</span>
        </div>
    )
};

export default FormBox;