/* eslint-disable prettier/prettier */
import { createContext, ReactNode, useState, useReducer, useEffect } from "react";
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { ActionTypes, addNewCycleAction, finishCycleAction, interruptCycleAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";

interface CreateCycleData {
  task: string
  minutesAmount: number
}



interface CycleContextType {
  cycles: Cycle[]
  activedCycle: Cycle | undefined
  activedCycleId: string | null
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

export function CyclesContextProvider({ children }: CycleContextProp) {


  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    activedCycleId: null
  }, () => {
    const storedState = localStorage.getItem('@pomodoro-timer:cycles-state')

    if (storedState) {
      return JSON.parse(storedState);
    }
  })

  const { cycles, activedCycleId } = cyclesState;

  const activedCycle: Cycle | undefined = cycles.find(cycle => cycle.id === activedCycleId)


  const [amountSeconds, setAmountSeconds] = useState(() => {
    
    if(activedCycle){
      return differenceInSeconds(new Date(), new Date(activedCycle.startDate))
    }

    return 0

  });


  function markCurrentCyleAsFinished() {
    dispatch(finishCycleAction())
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

    dispatch(addNewCycleAction(newCycle))
    setAmountSeconds(0)

  }

  function interruptCycle() {

    dispatch(interruptCycleAction())
  }

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)
    localStorage.setItem('@pomodoro-timer:cycles-state', stateJSON)
  }, [cyclesState])

  return (
    <CycleContext.Provider value={{ activedCycle, activedCycleId, markCurrentCyleAsFinished, amountSeconds, handleAmountPassed, createNewCycle, interruptCycle, cycles }}>
      {children}
    </CycleContext.Provider>
  )

}