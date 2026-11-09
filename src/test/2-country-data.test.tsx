import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { COUNTRIES, INTERESTS } from '@/data/survey'
import { dashboard, readChartCounts, renderApp } from './helpers'

describe('2) Country-specific data', () => {
  it.each(COUNTRIES)('$flag $label shows only its own categories and values', async ({ id, label }) => {
    const { user, seed } = renderApp()
    await user.click(within(dashboard()).getByRole('radio', { name: label }))

    const table = screen.getByRole('table', { name: `Interests in ${label}` })
    const rows = within(table).getAllByRole('rowheader').map((r) => r.textContent)
    expect(rows).toEqual([...INTERESTS])
    expect(readChartCounts()).toEqual(seed[id])
    for (const other of COUNTRIES.filter((c) => c.id !== id)) {
      expect(screen.queryByRole('table', { name: `Interests in ${other.label}` })).not.toBeInTheDocument()
    }
  })
})
