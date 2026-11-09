import { render, screen, within, type ByRoleMatcher } from '@testing-library/react'
import userEvent, { type UserEvent } from '@testing-library/user-event'
import App from '@/App'
import { createInitialData, INTERESTS, type InterestCounts } from '@/data/survey'

export function renderApp() {
  const user = userEvent.setup()
  render(<App initialData={createInitialData()} />)
  return { user, seed: createInitialData() }
}

export const getByRole = (role: ByRoleMatcher, name: string, container?: HTMLElement) => {

  if(container) 
  {
    return within(container).getByRole(role, { name })
  }
  return screen.getByRole(role, { name })
}

export const userClickInteraction = (user: UserEvent, role: ByRoleMatcher, name: string, container?: HTMLElement) => 
{
  const htmlElement = getByRole(role, name, container);

  return user.click(htmlElement);
}



const containers = 
{
  dashboard: () => getByRole('radiogroup', 'Dashboard country'),
  surveyForm: () => getByRole('form', 'User survey'),
  chart: () => screen.getByTestId('pie-chart'),
} satisfies Record<string, () => HTMLElement>

export type ContainerName = keyof typeof containers

export const getContainer = (name: ContainerName): HTMLElement => containers[name]()

export function readChartCounts(): InterestCounts {
  const fig = getContainer('chart')
  return Object.fromEntries(
    INTERESTS.map((i) => [i, Number(within(fig).getByTestId(`count-${i}`).textContent)]),
  ) as InterestCounts
}
