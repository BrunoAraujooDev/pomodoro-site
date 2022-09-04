/* eslint-disable prettier/prettier */

import { ActionTypes } from "./actions"

export interface Cycle {
    id: string
    task: string
    minutesAmount: number
    startDate: Date
    interruptedDate?: Date
    finishedDate?: Date
}

interface CycleState {
    cycles: Cycle[]
    activedCycleId: string | null
}




export function cyclesReducer(state: CycleState, action: any) {

    switch (action.type) {
        case ActionTypes.ADD_NEW_CYCLE:
            return {
                ...state,
                cycles: [...state.cycles, action.payload.newCycle],
                activedCycleId: action.payload.newCycle.id
            }

        case ActionTypes.INTERRUPT_CURRENT_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activedCycleId) {
                        return { ...cycle, interruptedDate: new Date() }
                    } else {
                        return cycle
                    }
                }),
                activedCycleId: null
            }

        case ActionTypes.FINISH_CURRENT_CYCLE:
            return {
                ...state,
                cycles: state.cycles.map((cycle) => {
                    if (cycle.id === state.activedCycleId) {
                        return { ...cycle, finishedDate: new Date() }
                    } else {
                        return cycle
                    }
                }),
                activedCycleId: null
            }

        default:
            return state;
    }

}