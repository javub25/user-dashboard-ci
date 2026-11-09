import { describe, expect, it } from 'vitest'
import { COUNTRIES } from '@/data/survey'
import { getByRole, getContainer, readChartCounts, renderApp } from './helpers'

describe('1) Default country selection', () => {
  it('checks the Spain radio when the dashboard loads', () => {
    renderApp();

    const dashboard = getContainer('dashboard')

    const spainRadio = getByRole('radio', 'Spain', dashboard)
    
    expect(spainRadio).toBeChecked()
  })

  it.each(COUNTRIES.filter((c) => c.id !== 'spain'))('leaves $label unchecked', ({ label }) => {
    renderApp()

    const dashboard = getContainer('dashboard');

    const countriesRadio = getByRole('radio', label, dashboard)

    expect(countriesRadio).not.toBeChecked()
  })

  it('tags the chart with the spain country', () => {
    renderApp();

    const chart = getContainer('chart');

    expect(chart).toHaveAttribute('data-country', 'spain')
  })

  it('renders the Spain dataset in the chart', () => {
    const { seed } = renderApp()

    expect(readChartCounts()).toEqual(seed.spain)
  })
})
