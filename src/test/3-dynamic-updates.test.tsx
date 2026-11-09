import { describe, expect, it } from 'vitest'
import { COUNTRIES } from '@/data/survey'
import { getByRole, getContainer, readChartCounts, renderApp, userClickInteraction } from './helpers'

describe('3) Dynamic chart updates', () => {
  describe.each(COUNTRIES)('switching to $label', ({ id, label }) => {
    const start = COUNTRIES.find((c) => c.id !== id)!

    const switchCountry = async () => 
      {
      const { user, seed } = renderApp();
      const dashboard = getContainer('dashboard');
      const chart = getContainer('chart');

      await userClickInteraction(user, 'radio', start.label, dashboard)
      const before = readChartCounts()
      await userClickInteraction(user, 'radio', label, dashboard)

      return { seed, before, dashboard , chart }
    }

    it(`tags the chart with ${id}`, async () => {
      const { chart } = await switchCountry();

      expect(chart).toHaveAttribute('data-country', id)
    })

    it(`renders the ${label} dataset`, async () => {
      const { seed } = await switchCountry()

      expect(readChartCounts()).toEqual(seed[id])
    })

    it(`replaces the ${start.label} counts`, async () => {
      const { before } = await switchCountry()

      expect(readChartCounts()).not.toEqual(before)
    })

    it(`checks the ${label} radio`, async () => {
      const { dashboard } = await switchCountry()

      expect(getByRole('radio', label, dashboard)).toBeChecked()
    })

    it(`unchecks the ${start.label} radio`, async () => {
      const { dashboard } = await switchCountry()

      expect(getByRole('radio', start.label, dashboard)).not.toBeChecked()
    })
  })
})
