import React from 'react'

const FormBox = ({ outcome }: { outcome: "W" | "D" | "L" }) => {
    const colors = outcome === 'W' ?
        'border-green-500 text-green-500' :
        outcome === 'D' ?
            'border-secondary-800 text-secondary-800' :
            'border-red-500 text-red-500';
    
    return (
        <div className={`${colors} h-6 aspect-square rounded-sm border flex items-center justify-center  font-semibold`}>
            {outcome}
        </div>
    )
};

export default FormBox;