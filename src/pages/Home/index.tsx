/* eslint-disable prettier/prettier */

import { HandPalm, Play } from 'phosphor-react'
import {  HomeContainer,  StartCountdownButton, StopCountdownButton } from './styles'
import { useForm , FormProvider} from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NewCycleForm } from './NewCycleForm'
import { Countdown } from './Countdown'
import * as zod from 'zod'
import { useContext } from 'react'
import { CycleContext } from '../../contexts/CyclesContext'


const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5, 'O intervalo precisa ser de no mínimo 5 minutos').max(60, 'O intervalo precisa ser de no máximo 60 minutos')
})

type newCycleData = zod.infer<typeof newCycleFormSchema>


export function Home() {

 
  const { createNewCycle, interruptCycle, activedCycle } = useContext(CycleContext)

  const newCycleForm = useForm<newCycleData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0
    }
  });


  const {  handleSubmit, watch,  reset  } = newCycleForm

  function handleCreateNewCycle(data : newCycleData) {
    createNewCycle(data)

    reset();
  }
  

  

  const task = watch("task")


  return (
    <HomeContainer>
      <form action=""  onSubmit={handleSubmit(handleCreateNewCycle)} >

        
           
           <FormProvider {...newCycleForm}>
            <NewCycleForm/> 
           </FormProvider>
          <Countdown />

        {
          activedCycle ? (
            <StopCountdownButton type="button" onClick={interruptCycle}>
              <HandPalm />
              Interromper
            </StopCountdownButton>)
            : (
              <StartCountdownButton type="submit"  disabled={!task}>
                <Play />
                Começar
              </StartCountdownButton>)
        }
      </form>
    </HomeContainer>
  )
}
