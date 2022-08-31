/* eslint-disable prettier/prettier */

import { Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer, MinusAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as zod from 'zod'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O intervalo precisa ser de no mínimo 5 minutos').max(60, 'O intervalo precisa ser de no máximo 60 minutos')
})


type newCycleData = zod.infer<typeof newCycleFormSchema>


export function Home() {

  const { register, handleSubmit, watch, reset } = useForm<newCycleData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });

  function handleCreateNewCycle(data: newCycleData){
    console.log(data);

    reset();
    
  }

  const task = watch("task")

  return (
    <HomeContainer>
      <form action="" onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id="task" list="task-suggestion"  placeholder='Dê um nome para o seu projeto'
            {...register('task')}
          />
          
          <datalist id="task-suggestion">
            <option value="Projeto 1"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinusAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={5} max={60}
            {...register('minutesAmount', {valueAsNumber : true})}
          />

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled={!task}>
          <Play/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
