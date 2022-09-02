/* eslint-disable prettier/prettier */

import { FormContainer, MinusAmountInput, TaskInput } from "./styles";
import { useContext } from "react";
import { useFormContext} from 'react-hook-form'
import { CycleContext } from "../../../contexts/CyclesContext";




export function NewCycleForm() {

    const { activedCycle} = useContext(CycleContext)
    const { register} = useFormContext()

    

    return (
        <FormContainer>
            <label htmlFor="task">Vou trabalhar em</label>
            <TaskInput type="text" id="task" list="task-suggestion" placeholder='Dê um nome para o seu projeto'
                {...register('task')}
                disabled={!!activedCycle}
            />

            <datalist id="task-suggestion">
                <option value="Projeto 1"></option>
            </datalist>

            <label htmlFor="minutesAmount">durante</label>
            <MinusAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={5} max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activedCycle}
            />

            <span>minutos.</span>
        </FormContainer>

    )
}