/* eslint-disable prettier/prettier */

import { differenceInSeconds } from "date-fns";
import { useContext, useEffect } from "react";
import { CycleContext } from "../../../contexts/CyclesContext";
import { CountDownContainer, Separator } from "./styles";




export function Countdown() {

  const { activedCycle, activedCycleId, markCurrentCyleAsFinished, amountSeconds, handleAmountPassed } = useContext(CycleContext);



  const totalSeconds = activedCycle ? activedCycle.minutesAmount * 60 : 0;
  const currentSeconds = activedCycle ? totalSeconds - amountSeconds : 0;

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')


  

  useEffect(() => {

    if (activedCycle) {
      document.title = `${minutes}:${seconds}`
    }

  }, [minutes, seconds, activedCycle])


  useEffect(() => {

    let interval: number;

    if (activedCycle) {
      interval = setInterval(() => {

        const diff = differenceInSeconds(new Date(), activedCycle.startDate)

        if (diff > totalSeconds) {
          
          markCurrentCyleAsFinished()
          clearInterval(interval)

        } else {
          handleAmountPassed(diff)
        }

      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [activedCycle, totalSeconds, activedCycleId, markCurrentCyleAsFinished, handleAmountPassed])


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