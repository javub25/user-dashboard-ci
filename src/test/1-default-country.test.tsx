import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { chart, dashboard, readChartCounts, renderApp } from './helpers'

describe('1) Default country selection', () => {
  it('selects Spain by default when the dashboard loads', () => {
    const { seed } = renderApp()
    expect(within(dashboard()).getByRole('radio', { name: 'Spain' })).toBeChecked()
    expect(chart()).toHaveAttribute('data-country', 'spain')
    expect(screen.getByRole('table', { name: 'Interests in Spain' })).toBeInTheDocument()
    expect(readChartCounts()).toEqual(seed.spain)
  })
})
