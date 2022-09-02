/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useState } from "react";

interface CreateCycleData {
    task: string
    minutesAmount: number
}

interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
  }

interface CycleContextType {
    cycles: Cycle[]
    activedCycle: Cycle | undefined
    activedCycleId: string| null
    amountSeconds: number
    markCurrentCyleAsFinished: () => void
    handleAmountPassed: (seconds: number) => void
    createNewCycle: (data: CreateCycleData) => void
    interruptCycle: () => void
  }

  interface CycleContextProp {
    children: ReactNode
  }

export const CycleContext = createContext({} as CycleContextType);

export function CyclesContextProvider({ children}: CycleContextProp) {

    const [cycles, setCycles] = useState<Cycle[]>([]);
    const [activedCycleId, setActivedCycleId] = useState<string | null>(null);
    const [amountSeconds, setAmountSeconds] = useState(0);

    const activedCycle: Cycle | undefined | string = cycles.find(cycle => cycle.id === activedCycleId)

    function markCurrentCyleAsFinished() {
        setCycles(state => state.map((cycle) => {
          if (cycle.id === activedCycleId) {
            return { ...cycle, finishedDate: new Date() }
          } else {
            return cycle
          }
        }))
      }

      function handleAmountPassed(seconds: number) {
        setAmountSeconds(seconds)
      }

      
  function createNewCycle(data: CreateCycleData) {
    const newCycle: Cycle = {
      id: String(new Date().getTime()),
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date()
    }

    setCycles(state => [...state, newCycle])
    setActivedCycleId(newCycle.id)
    setAmountSeconds(0)

  }

  function interruptCycle() {

    setCycles( state => state.map((cycle) => {
      if (cycle.id === activedCycleId) {
        return { ...cycle, interruptedDate: new Date() }
      } else {
        return cycle
      }
    }))


    setActivedCycleId(null)
  }

      return (
        <CycleContext.Provider value={{ activedCycle, activedCycleId, markCurrentCyleAsFinished, amountSeconds, handleAmountPassed, createNewCycle, interruptCycle, cycles }}>
            {children}
        </CycleContext.Provider>
      )

}