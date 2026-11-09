import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '@/App'
import { createInitialData, INTERESTS, type InterestCounts } from '@/data/survey'

export function renderApp() {
  const user = userEvent.setup()
  render(<App initialData={createInitialData()} />)
  return { user, seed: createInitialData() }
}

export const dashboard = () => screen.getByRole('radiogroup', { name: 'Dashboard country' })
export const chart = () => screen.getByTestId('pie-chart')

export function readChartCounts(): InterestCounts {
  const fig = chart()
  return Object.fromEntries(
    INTERESTS.map((i) => [i, Number(within(fig).getByTestId(`count-${i}`).textContent)]),
  ) as InterestCounts
}
