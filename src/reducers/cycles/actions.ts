/* eslint-disable prettier/prettier */

import { Cycle } from "./reducer";

export enum ActionTypes {
    ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
    INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
    FINISH_CURRENT_CYCLE = 'FINISH_CURRENT_CYCLE',
}

export function addNewCycleAction(newCycle: Cycle) {
    return {

        type: ActionTypes.ADD_NEW_CYCLE,
        payload: {
            newCycle,
        }

    }
}

export function interruptCycleAction() {
    return {
        type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
    }
}

export function finishCycleAction() {
    return {
        type: ActionTypes.FINISH_CURRENT_CYCLE,
    }
}
