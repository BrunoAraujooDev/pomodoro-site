/* eslint-disable prettier/prettier */

import { Play } from 'phosphor-react'
import { CountDownContainer, FormContainer, HomeContainer, MinusAmountInput, Separator, StartCountdownButton, TaskInput } from './styles'


export function Home() {
  return (
    <HomeContainer>
      <form action="">
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id="task" list="task-suggestion"  placeholder='Dê um nome para o seu projeto'/>
          
          <datalist id="task-suggestion">
            <option value="Projeto 1"></option>
          </datalist>

          <label htmlFor="minutesAmount">durante</label>
          <MinusAmountInput type="number" id="minutesAmount" placeholder='00' step={5} min={5} max={60}/>

          <span>minutos.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>

          <Separator>:</Separator>

          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <StartCountdownButton type="submit" disabled>
          <Play/>
          Começar
        </StartCountdownButton>
      </form>
    </HomeContainer>
  )
}
