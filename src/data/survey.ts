export const COUNTRIES = [
  { id: 'spain', label: 'Spain', flag: '🇪🇸' },
  { id: 'germany', label: 'Germany', flag: '🇩🇪' },
  { id: 'france', label: 'France', flag: '🇫🇷' },
  { id: 'italy', label: 'Italy', flag: '🇮🇹' },
] as const

export const INTERESTS = [
  'Technology', 'Sports', 'Education', 'Business',
  'Entertainment', 'Travel', 'Science', 'Art & Design',
] as const

export type CountryId = (typeof COUNTRIES)[number]['id']
export type Interest = (typeof INTERESTS)[number]
export type InterestCounts = Record<Interest, number>
export type SurveyData = Record<CountryId, InterestCounts>

export interface Submission {
  country: CountryId
  interests: Interest[]
}

export const DEFAULT_COUNTRY: CountryId = 'spain'

export function createInitialData(): SurveyData {
  return {
    spain:   { Technology: 42, Sports: 35, Education: 18, Business: 22, Entertainment: 30, Travel: 27, Science: 12, 'Art & Design': 15 },
    germany: { Technology: 51, Sports: 28, Education: 24, Business: 33, Entertainment: 19, Travel: 21, Science: 26, 'Art & Design': 10 },
    france:  { Technology: 31, Sports: 23, Education: 20, Business: 17, Entertainment: 25, Travel: 29, Science: 16, 'Art & Design': 34 },
    italy:   { Technology: 26, Sports: 39, Education: 14, Business: 20, Entertainment: 28, Travel: 32, Science: 11, 'Art & Design': 37 },
  }
}

export function applySubmission(data: SurveyData, submission: Submission): SurveyData {
  const updated = { ...data[submission.country] }
  for (const interest of new Set(submission.interests)) updated[interest] += 1
  return { ...data, [submission.country]: updated }
}

export function toChartData(counts: InterestCounts) {
  return INTERESTS.map((name) => ({ name, value: counts[name] }))
}
