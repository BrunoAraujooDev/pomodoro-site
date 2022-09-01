/* eslint-disable prettier/prettier */

import { HandPalm, Play } from 'phosphor-react'
import {  HomeContainer,  StartCountdownButton, StopCountdownButton } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'






interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}


export function Home() {

  const [cycles, setCycles] = useState<Cycle[]>([]);
  const [activedCycleId, setActivedCycleId] = useState<string | null>(null);
  

  



  function handleCreateNewCycle(data: newCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])
    setActivedCycleId(newCycle.id)
    setAmountSeconds(0)

    reset();

  }

  function handleInterruptCycle() {

    setCycles( state => state.map((cycle) => {
      if (cycle.id === activedCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))


    setActivedCycleId(null)
  }

  const activedCycle: Cycle | undefined | string = cycles.find(cycle => cycle.id === activedCycleId)
  
  

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  const task = watch("task")

  

  useEffect(() => {

    if (activedCycle) {
      document.title = `${minutes}:${seconds}`
    }

  }, [minutes, seconds, activedCycle])

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <NewCycleForm/>

        <Countdown activedCycle={activedCycle} setCycles={setCycles} activedCycleId={activedCycleId}/>

        {
          activedCycle ? (
            <StopCountdownButton type="button" onClick={handleInterruptCycle}>
              <HandPalm />
              Interromper
            </StopCountdownButton>)
            : (
              <StartCountdownButton type="submit" disabled={!task}>
                <Play />
                Começar
              </StartCountdownButton>)
        }
      </form>
    </HomeContainer>
  )
}
