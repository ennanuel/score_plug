import React from 'react'

const DetailsLoading = () => {
    return (
        <div className="flex flex-col gap-2 p-4">
            <div className="h-[200px] animate-loadgradient loading flex items-center justify-center border border-secondary-900/50">
                <hr className="w-full h-0 border-t border-secondary-900/50" />
            </div>
            <div className="animate-loadgradient loading w-full max-w-[200px] rounded-md bg-secondary-900/50 mt-2" />
            <div className="animate-loadgradient loading w-full max-w-[240px] rounded-md bg-secondary-900/50" />
            <div className="animate-loadgradient loading w-full max-w-[150px] rounded-md bg-secondary-900/50" />
            <div className="animate-loadgradient loading w-full max-w-[180px] rounded-md bg-secondary-900/50" />
        </div>
    );
}

export default DetailsLoading
