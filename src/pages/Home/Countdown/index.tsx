/* eslint-disable prettier/prettier */

import { differenceInSeconds } from "date-fns";
import { useEffect, useState } from "react";
import { CountDownContainer, Separator } from "./styles";


interface CountdownProp {
    activedCycle : any
    setCycles: any
    activedCycleId: any
}

export function Countdown({activedCycle, setCycles, activedCycleId } : CountdownProp) {

    const [amountSeconds, setAmountSeconds] = useState(0);


    const totalSeconds = activedCycle ? activedCycle.minutesAmount * 60 : 0;
    const currentSeconds = activedCycle ? totalSeconds - amountSeconds : 0;


    useEffect(() => {

        let interval: number;
    
        if (activedCycle) {
          interval = setInterval(() => {
    
          const diff = differenceInSeconds(new Date(), activedCycle.startDate)
    
          if(diff > totalSeconds){
            setCycles(state => state.map((cycle) => {
              if (cycle.id === activedCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }))
    
            clearInterval(interval)
          } else {
            setAmountSeconds(diff)
          }
    
          }, 1000)
        }
    
        return () => {
          clearInterval(interval)
        }
      }, [activedCycle, totalSeconds, activedCycleId])


    return (
        <CountDownContainer>
            <span>{minutes[0]}</span>
            <span>{minutes[1]}</span>

            <Separator>:</Separator>

            <span>{seconds[0]}</span>
            <span>{seconds[1]}</span>
        </CountDownContainer>
    )
}