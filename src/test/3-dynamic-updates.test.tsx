import { within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { COUNTRIES } from '@/data/survey'
import { chart, dashboard, readChartCounts, renderApp } from './helpers'

describe('3) Dynamic chart updates', () => {
  it.each(COUNTRIES)('refreshes the chart with the latest $label dataset', async ({ id, label }) => {
    const { user, seed } = renderApp()
    // Start from a different country so a stale/cached chart would be detected.
    const start = COUNTRIES.find((c) => c.id !== id)!
    await user.click(within(dashboard()).getByRole('radio', { name: start.label }))
    const before = readChartCounts()
    expect(before).toEqual(seed[start.id])

    await user.click(within(dashboard()).getByRole('radio', { name: label }))

    expect(chart()).toHaveAttribute('data-country', id)
    expect(readChartCounts()).toEqual(seed[id])
    expect(readChartCounts()).not.toEqual(before)
  })
})
