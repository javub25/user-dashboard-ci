import { describe, expect, it } from 'vitest'
import { getContainer, readChartCounts, renderApp, userClickInteraction } from './helpers'

describe('4) New category selection', () => {
  it('increments Spain › Technology by exactly one and affects nothing else', async () => {
    const { user, seed } = renderApp()
    const form = getContainer('surveyForm')

    await userClickInteraction(user, 'radio', 'Spain', form)
    await userClickInteraction(user, 'checkbox', 'Technology', form)
    await userClickInteraction(user, 'button', 'Submit', form)

    expect(readChartCounts()).toEqual({ ...seed.spain, Technology: seed.spain.Technology + 1 })
  })
})
