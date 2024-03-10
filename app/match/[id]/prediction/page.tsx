"use client";

import { describeArc } from "@/app/_utils/shape";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";


const MatchPrediction = () => {
  const homeArc = describeArc({ x: 45, y: 45, radius: 40, startAngle: 0, endAngle: 300});
  const awayArc = describeArc({ x: 45, y: 45, radius: 40, startAngle: 0, endAngle: 30 });
  const drawArc = describeArc({ x: 45, y: 45, radius: 40, startAngle: 0, endAngle: 60 });
  
  const params = useSearchParams();
  const pathname = usePathname();
  const showHalfTimeResults = params.get("time") === 'half-time';

  return (
    <div className="mt-2 p-2">
      <ul className="mx-3 flex items-center gap-3">
        <Link href={`${pathname}?time=full-time`}>
          <button className="h-[30px] rounded-md px-4 bg-secondary-400 text-sm text-primary-600 font-semibold">Full-time</button>
        </Link>
        <Link href={`${pathname}?time=half-time`}>
          <button className="h-[30px] rounded-md px-4 bg-secondary-900/50 text-sm text-secondary-700 hover:text-secondary-500">Half-time</button>
        </Link>
      </ul>
      <div className="border border-secondary-900/50 p-4 mt-3">
        <h3 className='font-semibold text-sm text-center'>Outcome</h3>
        <div className="mt-4 flex items-center justify-around gap-1">
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-400' fill="transparent" d={homeArc} />
                <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">70%</text>
              </svg>
              <p className="text-sm text-secondary-600">Home</p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-600' fill="transparent" d={drawArc} />
                <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">20%</text>
              </svg>
              <p className="text-sm text-secondary-600">Draw</p>
            </div>
            <div className="flex flex-col gap-1 items-center justify-center">
              <svg width="90px" height="90px">
                <circle className="stroke-[6px] stroke-secondary-900" fill="transparent" cx={45} cy={45} r={38} />
                <path className='stroke-[8px] stroke-highlight-700' fill="transparent" d={awayArc} />
                <text className='fill-highlight-300 font-bold text-lg translate-y-[2px]' x="50%" y="50%" textAnchor='middle' dominantBaseline="middle">10%</text>
              </svg>
              <p className="text-sm text-secondary-600">Away</p>
            </div>
          </div>

          <h3 className='font-semibold text-sm mt-6 text-center'>Goals</h3>
          <div className="flex flex-col mt-2 gap-1">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Ov. 0.5</p>
              <div className="w-[calc(50%-80px)] min-w-[60px] h-[25px] flex items-center justify-end border border-highlight-400 bg-highlight-400/10 px-2">
                <p className="text-highlight-400 font-semibold text-xs">40.39%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Un. 0.5</p>
              <div className="w-[calc(60%-80px)] min-w-[60px]  h-[25px] flex items-center justify-end border border-highlight-600 bg-highlight-600/10 px-2">
                <p className="text-highlight-600 font-semibold text-xs">59.61%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-1">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Ov. 1.5</p>
              <div className="w-[calc(70%-80px)] min-w-[60px] h-[25px] flex items-center justify-end border border-highlight-400 bg-highlight-400/10 px-2">
                <p className="text-highlight-400 font-semibold text-xs">70.00%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Un. 1.5</p>
              <div className="w-[calc(30%-80px)] min-w-[60px]  h-[25px] flex items-center justify-end border border-highlight-600 bg-highlight-600/10 px-2">
                <p className="text-highlight-600 font-semibold text-xs">30.00%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-1">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Ov. 2.5</p>
              <div className="w-[calc(25%-80px)] min-w-[60px] h-[25px] flex items-center justify-end border border-highlight-400 bg-highlight-400/10 px-2">
                <p className="text-highlight-400 font-semibold text-xs">23.25%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Un. 2.5</p>
              <div className="w-[calc(75%-80px)] min-w-[60px]  h-[25px] flex items-center justify-end border border-highlight-600 bg-highlight-600/10 px-2">
                <p className="text-highlight-600 font-semibold text-xs">76.75%</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col mt-2 gap-1">
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Ov. 3.5</p>
              <div className="w-[calc(10%-80px)]  min-w-[60px] h-[25px] flex items-center justify-end border border-highlight-400 bg-highlight-400/10 px-2">
                <p className="text-highlight-400 font-semibold text-xs">10.22%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <p className="w-14 text-xs text-secondary-600">Un. 3.5</p>
              <div className="w-[calc(90%-80px)] min-w-[60px]  h-[25px] flex items-center justify-end border border-highlight-600 bg-highlight-600/10 px-2">
                <p className="text-highlight-600 font-semibold text-xs">89.78%</p>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default MatchPrediction
