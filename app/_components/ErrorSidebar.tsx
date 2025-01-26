

export default function ErrorSidebar({ text = "Somehthing went wrong while fetching request" }: { text?: string; }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-20 px-6 rounded-xl border border-transparent bg-[#191919] h-fit">
            <span className="text-white-600 text-4xl font-semibold">Oh no!</span>
            <p className="text-xs text-white-800 text-center max-w-[28ch]">{text}</p>
        </div>
    )
}