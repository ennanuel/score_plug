"use memo";

import React, { useMemo } from 'react';
import Image from "next/image";
import { getTeamFormColors } from '../_utils/colors';

function FormBox({ outcome, teamCrest }: { outcome: string, teamCrest: string }) {
    const colors = useMemo(() => getTeamFormColors(outcome), []);
    
    return (
        <div className={`${colors} px-2 h-[30px] border flex items-center justify-center gap-2`}>
            <Image src={teamCrest} height={20} width={24} alt="" className="object-contain" />
            <span className="text-sm font-bold">{outcome}</span>
        </div>
    )
};

export default FormBox;