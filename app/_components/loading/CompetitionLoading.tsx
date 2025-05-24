const POSSIBLE_WIDTHS = ['50%', '60%', '40%', '55%'];

function createArrayOfWidthLengths(size: number) {
    const arrayOfWidthLengths = [];
    for (let index = 0; index < size; index++) arrayOfWidthLengths.push(POSSIBLE_WIDTHS[index % POSSIBLE_WIDTHS.length]);
    return arrayOfWidthLengths;
}

const CompetitionLoading = ({ size, small }: { size: number, small?: boolean }) => {
    const competitions = createArrayOfWidthLengths(size);

    return (
        <ul className={`h-fit flex flex-col ${small ? '' : 'gap-3'}`}>
            {
                competitions.map((width, index) => (
                    <li
                        key={index}
                        className={`${small ? 'h-8' : 'p-3 min-h-14 rounded-lg bg-white-100/5'} w-full flex items-center gap-2 px-3`}
                    >
                        <span className={`${small ? 'w-4' : 'w-8'} aspect-square rounded-full bg-white-100/10`}></span>
                        <div className="flex flex-col gap-2 flex-1">
                            <span style={{ width: width }} className={`${small ? 'h-3' : 'h-4'} block min-w-[30%] animate-loadopacity w-full rounded-sm bg-white-100/10`}></span>
                            {
                                !small ? 
                                    <span className="animate-loadopacity block h-2 w-full max-w-12 rounded-md bg-white-100/5"></span> :
                                    null
                            }
                        </div>
                    </li>
                ))
            }
        </ul>
    )
}

export default CompetitionLoading
