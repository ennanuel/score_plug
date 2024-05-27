
const NothingWasFound = ({ text = "Nothing was found" }: { text?: string }) => {
  return (
    <div className="p-8 min-h-[30vh] rounded-md border border-secondary-900/50 text-sm font-semibold text-white-600">
      {text}
    </div>
  )
}

export default NothingWasFound
