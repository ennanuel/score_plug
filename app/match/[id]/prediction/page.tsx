

const MatchPrediction = () => {
  const createCoordinate = (cx: number, cy: number, radius : number, angle : number) => {
    const angleInRadians = (angle - 90) * Math.PI / 180.0;

    return {
      x: cx + (radius * Math.cos(angleInRadians)),
      y: cy + (radius * Math.sin(angleInRadians))
    }
  }

  const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = createCoordinate(x, y, radius, endAngle);
    const end = createCoordinate(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [ 'M', start.x, start.y, "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y ].join(' ');
  }

  return (
    <div className="mt-2 p-2">
      <ul className="mx-3 flex items-center gap-3">
        <li>
          <button className="h-[30px] rounded-[15px] px-4 bg-secondary-400 border boder-secondary-400 text-sm text-primary-600 font-bold">Full-time</button>
        </li>
        <li>
          <button className="h-[30px] rounded-[15px] px-4 border border-secondary-700 text-sm text-secondary-700 font-bold">Half-time</button>
        </li>
      </ul>
      <div className="border border-secondary-900/50 p-4 mt-3">
        <h3 className='font-semibold text-sm text-center'>Outcome</h3>
        <div className="mt-4 flex items-center justify-around gap-1">
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-400' fill="transparent" d={describeArc(45, 45, 40, 0, 300)} />
                <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">70%</text>
              </svg>
              <p className="text-sm text-secondary-600">Home</p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-600' fill="transparent" d={describeArc(45, 45, 40, 0, 60)} />
                <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">20%</text>
              </svg>
              <p className="text-sm text-secondary-600">Draw</p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-700' fill="transparent" d={describeArc(45, 45, 40, 0, 30)} />
                <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">10%</text>
              </svg>
              <p className="text-sm text-secondary-600">Away</p>
            </div>
          </div>

          <h3 className='font-semibold text-sm mt-6 text-center'>Goals</h3>
          <div className="flex flex-col mt-2">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Over 0.5</p>
              <div className="flex-1 h-[6px] rounded-lg bg-secondary-900">
                <div className="h-full w-[90%] rounded-lg bg-highlight-400"></div>
              </div>
              <p className="w-10 text-sm text-right font-semibold text-highlight-200">90%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Under 0.5</p>
              <div className="flex-1 h-[6px] rounded-lg bg-secondary-900">
                <div className="h-full w-[10%] rounded-lg bg-highlight-600"></div>
              </div>
              <p className="w-10 text-sm text-right font-semibold text-highlight-400">10%</p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Over 1.5</p>
              <div className="flex-1 h-[6px] rounded-lg bg-secondary-900">
                <div className="h-full w-[60%] rounded-lg bg-highlight-400"></div>
              </div>
              <p className="w-10 text-sm text-right font-semibold text-highlight-200">60%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Under 1.5</p>
              <div className="flex-1 h-[6px] rounded-lg bg-secondary-900">
                <div className="h-full w-[40%] rounded-lg bg-highlight-600"></div>
              </div>
              <p className="w-10 text-sm text-right font-semibold text-highlight-400">40%</p>
            </div>
          </div>
          <div className="flex flex-col mt-3">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Over 2.5</p>
              <div className="flex-1 h-[6px] rounded-lg bg-secondary-900">
                <div className="h-full w-[30%] rounded-lg bg-highlight-400"></div>
              </div>
              <p className="w-10 text-sm text-right font-semibold text-highlight-200">30%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Under 2.5</p>
              <div className="flex-1 h-[6px] rounded-lg bg-secondary-900">
                <div className="h-full w-[70%] rounded-lg bg-highlight-600"></div>
              </div>
              <p className="w-10 text-sm text-right font-semibold text-highlight-400">70%</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MatchPrediction
