import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { COUNTRIES } from '@/data/survey'
import { dashboard, readChartCounts, renderApp } from './helpers'

describe('4) New category selection', () => {
  it('increments Spain › Technology by exactly one and affects nothing else', async () => {
    const { user, seed } = renderApp()
    const form = screen.getByRole('form', { name: 'User survey' })

    await user.click(within(form).getByRole('radio', { name: 'Spain' }))
    await user.click(within(form).getByRole('checkbox', { name: 'Technology' }))
    await user.click(within(form).getByRole('button', { name: 'Submit' }))

    // Spain is the default dashboard country: the chart reflects the change immediately.
    expect(readChartCounts()).toEqual({ ...seed.spain, Technology: seed.spain.Technology + 1 })

    // No other country is affected.
    for (const other of COUNTRIES.filter((c) => c.id !== 'spain')) {
      await user.click(within(dashboard()).getByRole('radio', { name: other.label }))
      expect(readChartCounts()).toEqual(seed[other.id])
    }
  })
})
