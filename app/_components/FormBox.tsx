"use memo";

import React, { useMemo } from 'react';
import Image from "next/image";
import { getTeamFormColors } from '../_utils/colors';

const FormBox = ({ outcome, teamCrest }: { outcome: string, teamCrest: string }) => {
    const colors = useMemo(() => getTeamFormColors(outcome), []);
    
    return (
        <div className={`${colors} h-[40px] px-3 aspect-square rounded-md border flex items-center justify-center gap-2`}>
            <Image src={teamCrest} width={20} alt="" className="object-contain aspect-square rounded-md" />
            <hr className="border-none border-l border-secondary-900/50 h-[20px] w-0 outline-none" />
            <span className="text-sm font-bold">{outcome}</span>
        </div>
    )
};

export default FormBox;