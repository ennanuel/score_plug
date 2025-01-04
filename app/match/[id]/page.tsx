"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { Match } from '@/types/global.type';
import { gql, useQuery } from '@apollo/client';
import { useParams } from 'next/navigation';
import { ErrorMessage, NothingWasFound } from '@/app/_components';
import { DetailsLoading } from '@/app/_components/loading';
import { IoPerson } from 'react-icons/io5';
import { GiCookingGlove, GiRun, GiSoccerKick, GiStrong } from 'react-icons/gi';
import { BsCaretDownFill } from 'react-icons/bs';


const QUERY = gql`
  query GetMatchByID($id: ID!) {
    match(id: $id) {
      homeTeam {
        _id
        name
        crest
        averageSquadAge
        coach {
          _id
          name
        }

        matches(status: "FINISHED", limit: 5, sort: -1) {
          _id
          homeTeam {
            _id
            name
            shortName
            crest
          }
          awayTeam {
            _id
            name
            shortName
            crest
          }
          score {
            fullTime {
              home
              away
            }
          }
        }

        squad(excludeStartingEleven: true) {
          startingEleven {
            goalkeeper {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
            defence {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
            midfield {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
            offence {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
          }

          otherPlayers {
            _id
            name
            position {
              area
              specialty
            }
            age
            nationality
          }
        }
        
      }

      awayTeam {
        _id
        name
        crest
        averageSquadAge
        coach {
          _id
          name
        }

        matches(status: "FINISHED", limit: 5, sort: -1) {
          _id
          homeTeam {
            _id
            name
            shortName
            crest
          }
          awayTeam {
            _id
            name
            shortName
            crest
          }
          score {
            fullTime {
              home
              away
            }
          }
        }

        squad(excludeStartingEleven: true) {
          startingEleven {
            goalkeeper {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
            defence {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
            midfield {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
            offence {
              _id
              name
              position {
                area
                specialty
              }
              age
              nationality
            }
          }

          otherPlayers {
            _id
            name
            position {
              area
              specialty
            }
            age
            nationality
          }
        }
        
      }
    }
  }
`;

const MatchInfo = () => {
  const { id } = useParams();
  const { loading, error, data } = useQuery<{ match: Match }>(QUERY, {
    variables: { id },
    fetchPolicy: 'no-cache'
  });

  const [displayPlayerInfo, setDisplayPlayerInfo] = useState("position");
  const [showOtherPlayers, setShowOtherPlayers] = useState(false);
  const toggleShowOtherPlayers = () => setShowOtherPlayers(!showOtherPlayers);

  if (loading) return <DetailsLoading />;
  else if (error) return <ErrorMessage />;
  else if (!data) return <NothingWasFound />;

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="rounded-xl overflow-hidden bg-[#202020] border border-transparent">
        <div className="flex flex-col gap-[1px]">
          <div className="flex justify-between items-center p-4 bg-[#303030]">
            <span className="flex items-center justify-start gap-4">
              <span className='text-2xs text-white-300'>{data.match.homeTeam.averageSquadAge}</span>
              <span className='flex items-center gap-2'>
                <Image src={data.match.homeTeam.crest} alt={`${data.match.homeTeam.name} crest`} height={20} width={20} className="h-6 aspect-square object-contain" />
                <span className="text-2xs text-white-300">{data.match.homeTeam.name}</span>
              </span>
              <span className='text-2xs text-white-300'>4-3-3</span>
            </span>
            
            <span className="flex flex-row-reverse items-center justify-end gap-4">
              <span className='text-2xs text-white-300'>{data.match.awayTeam.averageSquadAge}</span>
              <span className='flex flex-row-reverse items-center gap-2'>
                <Image src={data.match.awayTeam.crest} alt={`${data.match.awayTeam.name} crest`} height={20} width={20} className="h-6 aspect-square object-contain" />
                <span className="text-2xs text-white-300">{data.match.awayTeam.name}</span>
              </span>
              <span className='text-2xs text-white-300'>4-3-3</span>
            </span>
          </div>

          <div className="flex items-center gap-2 px-4 py-3 bg-[#303030]">
            {
              ['Position', 'Age', 'Country']
                .map((title, index) => (
                  <button key={index} onClick={() => setDisplayPlayerInfo(title.toLowerCase())} className={`${displayPlayerInfo === title.toLowerCase() ? 'bg-white-100 text-black-900' : 'bg-black-900/20 text-white-300 hover:text-white-600'} flex items-center justify-center px-4 h-7 rounded-full`}>
                    <span className="text-3xs font-semibold">{title}</span>
                  </button>
                ))
            }
          </div>
        </div>

        <div className="grid grid-cols-2 relative bg-[#282828]">
          <div className="absolute w-full h-full">
            <div className="absolute top-1/2 -translate-y-1/2 left-0 flex items-center w-full h-full max-h-[280px]">
              <span className="border-5 border-l-0 border-[#303030] rounded-r-lg w-1/2 max-w-[120px] h-full flex items-center justify-start">
                <span className="w-[40%] h-1/2 border-5 border-l-0 rounded-r-lg border-inherit"></span>
              </span>
              <span className='h-full max-h-[120px] aspect-square overflow-hidden block'>
                <span className="block w-full h-full rounded-full border-5 border-[#303030] translate-x-[-70%]"></span>
              </span>
            </div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[5px] bg-[#303030] flex items-center justify-center">
              <span className="block h-full max-h-[160px] aspect-square rounded-full border-5 border-[#303030]"></span>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-0 flex items-center justify-end w-full h-full max-h-[280px]">
              <span className='h-full max-h-[120px] aspect-square overflow-hidden block'>
                <span className="block w-full h-full rounded-full border-5 border-[#303030] translate-x-[70%]"></span>
              </span>
              <span className="border-5 border-r-0 border-[#303030] rounded-r-lg w-1/2 max-w-[120px] h-full flex items-center justify-end">
                <span className="w-[40%] h-1/2 border-5 border-r-0 rounded-l-lg border-inherit"></span>
              </span>
            </div>
          </div>
          <div className="relative flex justify-between items-stretch px-4 py-8 gap-3">
            {
              Object
                .entries(data.match.homeTeam.squad.startingEleven)
                .sort(([key]) => key === 'goalkeeper' ? -4 : key === 'defence' ? -3 : key === 'midfield' ? -2 : -1)
                .reverse()
                .map(([key, players]) => (
                  ['goalkeeper', 'defence', 'midfield', 'offence'].includes(key) ?
                    <div key={key} className="flex flex-col flex-1 justify-between items-center gap-10">
                      {
                        players.map((player, index) => (
                          <span key={player._id} title={`${player.name} - ${player.position.specialty}`} className={`flex-1 flex flex-col gap-2 items-center ${index === 0 && players.length > 1 ? 'justify-end' : index === players.length - 1 && players.length > 1 ? 'justify-start' : 'justify-center'}`}>
                            <span className="relative w-10 max-h-10 aspect-square rounded-full bg-[#404040] flex items-center justify-center">
                              <span className="w-full h-full rounded-full overflow-hidden flex justify-center items-end bg-[#404040]">
                                <IoPerson size={32} className="text-white-600 mb-[-2px]" />
                              </span>
                              {
                                displayPlayerInfo === 'age' ?
                                  <span className="absolute top-0 right-0 translate-x-2 -translate-y-1 px-1 h-4 flex items-center justify-center text-2xs text-white-400 rounded-full bg-[#282828] border border-[#404040]">{player.age}</span> :
                                  displayPlayerInfo === 'country' ?
                                    <span title={player.nationality} className="absolute bottom-0 right-0 translate-x-2 translate-y-1 px-1 h-4 min-w-3 flex items-center justify-center text-3xs text-white-600 rounded-full bg-[#282828] border border-[#404040] uppercase">{player?.nationality?.substring(0, 3)}</span> :
                                  <span title={player.nationality} className="absolute top-0 left-0 -translate-x-1 -translate-y-1 p-[2px] h-4 aspect-square max-w-4 flex rounded-full bg-[#282828] border border-[#404040] uppercase">
                                    <span className="w-full h-full flex items-center justify-center rounded-full bg-blue-400 text-black-900">
                                      {
                                        player.position.area === 'goalkeeper' ?
                                          <GiCookingGlove size={8} /> :
                                          player.position.area === 'defence' ?
                                            <GiStrong size={8} /> :
                                            player.position.area === 'midfield' ?
                                            <GiRun size={8} /> :
                                            <GiSoccerKick size={8} />
                                      }
                                    </span>
                                  </span>
                              }

                            </span>
                            <span className='text-2xs text-white-400 max-w-[12ch] truncate'>{player.name}</span>
                          </span>
                        ))
                      }
                    </div> :
                    null
                ))
            }
          </div>
          <div className="relative flex justify-between items-stretch p-4 gap-3">
            {
              Object
                .entries(data.match.awayTeam.squad.startingEleven)
                .sort(([key]) => key === 'goalkeeper' ? -4 : key === 'defence' ? -3 : key === 'midfield' ? -2 : -1)
                .map(([key, players]) => (
                  ['goalkeeper', 'defence', 'midfield', 'offence'].includes(key) ?
                    <div key={key} className="flex flex-col flex-1 justify-between items-center gap-10">
                      {
                        [...players].reverse().map((player, index) => (
                          <span key={player._id} title={`${player.name} - ${player.position.specialty}`} className={`flex-1 flex flex-col gap-2 items-center ${index === 0 && players.length > 1 ? 'justify-end' : index === players.length - 1 && players.length > 1 ? 'justify-start' : 'justify-center'}`}>
                            <span className="relative w-10 max-h-10 aspect-square rounded-full bg-[#404040] flex items-center justify-center">
                              <span className="w-full h-full rounded-full overflow-hidden flex justify-center items-end bg-[#404040]">
                                <IoPerson size={32} className="text-white-600 mb-[-2px]" />
                              </span>
                              {
                                displayPlayerInfo === 'age' ?
                                  <span className="absolute top-0 right-0 translate-x-2 -translate-y-1 px-1 h-4 flex items-center justify-center text-2xs text-white-400 rounded-full bg-[#282828] border border-[#404040]">{player.age}</span> :
                                  displayPlayerInfo === 'country' ?
                                    <span title={player.nationality} className="absolute bottom-0 right-0 translate-x-2 translate-y-1 px-1 h-4 min-w-3 flex items-center justify-center text-3xs text-white-600 rounded-full bg-[#282828] border border-[#404040] uppercase">{player?.nationality?.substring(0, 3)}</span> :
                                  <span title={player.nationality} className="absolute top-0 left-0 -translate-x-1 -translate-y-1 p-[2px] h-4 aspect-square max-w-4 flex rounded-full bg-[#282828] border border-[#404040] uppercase">
                                    <span className="w-full h-full flex items-center justify-center rounded-full bg-blue-400 text-black-900">
                                      {
                                        player.position.area === 'goalkeeper' ?
                                          <GiCookingGlove size={8} /> :
                                          player.position.area === 'defence' ?
                                            <GiStrong size={8} /> :
                                            player.position.area === 'midfield' ?
                                            <GiRun size={8} /> :
                                            <GiSoccerKick size={8} />
                                      }
                                    </span>
                                  </span>
                              }
                            </span>
                            <span className='text-2xs text-white-400 max-w-[12ch] truncate'>{player.name}</span>
                          </span>
                        ))
                      }
                    </div> :
                    null
                ))
            }
          </div>
        </div>

        <div className="grid gap-4 grid-cols-[1fr,_auto,_1fr] items-center px-4 py-3">
          <span className="flex justify-start items-center gap-3">
            <span className="w-6 aspect-square rounded-full overflow-hidden bg-white-100/10 text-white-600 flex justify-center items-end">
              <IoPerson size={20} className='mb-[-2px]' />
            </span>
            <span className="text-2xs text-white-200">{data.match.homeTeam.coach.name || 'Coach unavailable'}</span>
          </span>
          <span className="text-sm font-semibold text-white-400">Coach</span>
          <span className="flex justify-end items-center gap-3">
            <span className="text-2xs text-white-200">{data.match.awayTeam.coach.name || 'Coach unavailable'}</span>
            <span className="w-6 aspect-square rounded-full overflow-hidden bg-white-100/10 text-white-600 flex justify-center items-end">
              <IoPerson size={20} className='mb-[-2px]' />
            </span>
          </span>
        </div>

        <div className="border-t border-white-100/10 flex flex-col">
            <button onClick={toggleShowOtherPlayers} className="flex items-center justify-center gap-1 hover:underline text-white-400 p-4">
              <span className="text-2xs font-semibold">Benched / Injured and suspended players</span>
              <BsCaretDownFill size={10} />
            </button>
            {
              showOtherPlayers ?
                    
                <div className="grid grid-cols-2 gap-4 px-4">
                  <ul className="flex flex-col">
                    {
                      data.match.homeTeam.squad.otherPlayers.map((player) => (
                        <li key={player._id} className='flex items-center gap-4 py-3 border-b border-white-100/10 last:border-transparent'>
                          <span className="flex items-end justify-center w-6 aspect-square rounded-full bg-white-100/10 text-white-600 overflow-hidden">
                            <IoPerson size={20} className="mb-[-2px]" />
                          </span>
                          <span className="flex items-center justify-center w-5 h-4 px-1 bg-white-100/10 rounded-full text-2xs text-white-400">{player.age}</span>
                          <div className="flex flex-col">
                            <span className="text-2xs text-white-400">{player.name}</span>
                            <span className="text-2xs text-white-700 capitalize">{player.position.area}</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                  <ul className="flex flex-col">
                    {
                      data.match.awayTeam.squad.otherPlayers.map((player) => (
                        <li key={player._id} className='flex items-center gap-4 py-3 border-b border-white-100/10 last:border-transparent'>
                          <span className="flex items-end justify-center w-6 aspect-square rounded-full bg-white-100/10 text-white-600 overflow-hidden">
                            <IoPerson size={20} className="mb-[-2px]" />
                          </span>
                          <span className="flex items-center justify-center w-5 h-4 px-1 bg-white-100/10 rounded-full text-2xs text-white-400">{player.age}</span>
                          <div className="flex flex-col">
                            <span className="text-2xs text-white-400">{player.name}</span>
                            <span className="text-2xs text-white-700 capitalize">{player.position.area}</span>
                          </div>
                        </li>
                      ))
                    }
                  </ul>
                </div> :
                null
            }
        </div>

      </div>

      <div className="rounded-xl p-4 pb-6 gap-8 bg-[#202020] flex flex-col">
        <h3 className="text-center text-sm font-semibold text-white-100">Team form</h3>
        <div className="grid grid-cols-2 gap-4">
          <ul className="flex flex-col gap-6">
            {
              data.match.homeTeam.matches.map((match) => (
                <li key={match._id} className="grid grid-cols-[1fr,_auto,_1fr] gap-3 items-center">
                  <span className='text-right text-2xs text-white-400'>{match.homeTeam.shortName}</span>
                  <span className={`relative flex items-center justify-center h-[22px] w-10 rounded-md text-xs font-semibold text-white-100 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-6 before:rounded-full ${((match.homeTeam._id === data.match.homeTeam._id && match.score.fullTime.home > match.score.fullTime.away) || (match.awayTeam._id === data.match.awayTeam._id && match.score.fullTime.away > match.score.fullTime.home)) ? 'bg-green-600 before:bg-green-600' : match.score.fullTime.home === match.score.fullTime.away ? 'bg-white-700' : 'bg-red-600'}`}>
                    {`${match.score.fullTime.home} - ${match.score.fullTime.away}`}
                  </span>
                  <span className='text-left text-2xs text-white-400'>{match.awayTeam.name}</span>
                </li>
              ))
            }
          </ul>
          <ul className="flex flex-col gap-6">
            {
              data.match.awayTeam.matches.map((match) => (
                <li key={match._id} className="grid grid-cols-[1fr,_auto,_1fr] gap-3 items-center">
                  <span className='text-right text-2xs text-white-400'>{match.homeTeam.shortName}</span>
                  <span className={`relative flex items-center justify-center h-[22px] w-10 rounded-md text-xs font-semibold text-white-100 before:absolute before:-bottom-1 before:left-1/2 before:-translate-x-1/2 before:h-[2px] before:w-6 before:rounded-full ${((match.homeTeam._id === data.match.homeTeam._id && match.score.fullTime.home > match.score.fullTime.away) || (match.awayTeam._id === data.match.awayTeam._id && match.score.fullTime.away > match.score.fullTime.home)) ? 'bg-green-600 before:bg-green-600' : match.score.fullTime.home === match.score.fullTime.away ? 'bg-white-700' : 'bg-red-600'}`}>
                    {`${match.score.fullTime.home} - ${match.score.fullTime.away}`}
                  </span>
                  <span className='text-left text-2xs text-white-400'>{match.awayTeam.name}</span>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

export default MatchInfo
