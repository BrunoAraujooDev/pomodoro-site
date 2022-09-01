/* eslint-disable prettier/prettier */

import { useForm } from "react-hook-form";
import { FormContainer, MinusAmountInput, TaskInput } from "./styles";
import * as zod from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";


const newCycleFormSchema = zod.object({
    task: zod.string().min(1, 'Informe a tarefa'),
    minutesAmount: zod.number().min(1, 'O intervalo precisa ser de no mínimo 5 minutos').max(60, 'O intervalo precisa ser de no máximo 60 minutos')
  })

type newCycleData = zod.infer<typeof newCycleFormSchema>

export function NewCycleForm() {

    const { register, handleSubmit, watch, reset } = useForm<newCycleData>({
        resolver: zodResolver(newCycleFormSchema),
        defaultValues: {
          task: '',
          minutesAmount: 0
        }
      });

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
            <MinusAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={1} max={60}
                {...register('minutesAmount', { valueAsNumber: true })}
                disabled={!!activedCycle}
            />

            <span>minutos.</span>
        </FormContainer>

    )
}