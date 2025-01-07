import Image from 'next/image';
import React from 'react';

import errorImage from "@/app/_assets/errorImage.jpg";

const ErrorMessage = ({ text = "Something went wrong while making request.", retry }: { text?: string; retry?: () => void }) => {
    return (
        <div className="relative m-auto w-full rounded-xl border border-white-100/10 overflow-hidden">
            <Image src={errorImage} height={1024} width={1024} alt="background image" className="absolute top-0 left-0 w-full h-auto object-cover" />
            <div className='relative min-h-[30vh] flex flex-col items-start justify-center py-20 px-3 md:px-6 w-full bg-black-900/50'>
                <h2 className="text-red-500 font-bold text-[4rem] md:text-[5rem]">F*ck</h2>
                <span className="text-xs md:text-sm font-semibold text-red-100/80 max-w-[25ch] mt-4 md:mt-6">{text}</span>
                <button className="mt-2 md:mt-4 text-white-600 rounded-full bg-red-100/20 h-8 md:h-10 px-6 flex items-center justify-center backdrop-blur-md">
                    <span className="text-2xs md:text-xs font-semibold">Reload</span>
                </button>
            </div>
        </div>
    )
};

export default ErrorMessage
