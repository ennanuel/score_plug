"use memo";

import React, { useMemo } from 'react';
import Image from "next/image";
import { getTeamFormColors } from '../_utils/colors';

const FormBox = ({ outcome, teamCrest }: { outcome: string, teamCrest: string }) => {
    const colors = useMemo(() => getTeamFormColors(outcome), []);
    
    return (
        <div className={`${colors} px-2 h-[30px] rounded-md border flex items-center justify-center gap-2`}>
            <Image src={teamCrest} height={24} alt="" className="object-contain aspect-square rounded-md" />
            <span className="text-sm font-bold">{outcome}</span>
        </div>
    )
};

export default FormBox;