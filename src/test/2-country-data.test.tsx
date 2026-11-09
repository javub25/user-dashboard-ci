import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { COUNTRIES, INTERESTS } from '@/data/survey'
import { getByRole, getContainer, readChartCounts, renderApp, userClickInteraction } from './helpers'

describe('2) Country-specific data', () => {
  describe.each(COUNTRIES)('$flag $label', ({ id, label }) => {
    const selectCountry = async () => {
      const { user, seed } = renderApp()
      await userClickInteraction(user, 'radio', label, getContainer('dashboard'))
      return { seed }
    }

    it('lists exactly the interest categories in its table', async () => {
      await selectCountry()

      const table = getByRole('table', `Interests in ${label}`)
      const rows = within(table).getAllByRole('rowheader').map((r) => r.textContent)
      expect(rows).toEqual([...INTERESTS])
    })

    it('shows its own values in the chart', async () => {
      const { seed } = await selectCountry()

      expect(readChartCounts()).toEqual(seed[id])
    })

    it.each(COUNTRIES.filter((c) => c.id !== id))('does not render the $label table', async (other) => {
      await selectCountry()

      expect(screen.queryByRole('table', { name: `Interests in ${other.label}` })).not.toBeInTheDocument()
    })
  })
})
