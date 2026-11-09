import { useState } from 'react'
import { InterestsDashboard } from '@/components/InterestsDashboard'
import { UserForm } from '@/components/UserForm'
import { applySubmission, createInitialData, DEFAULT_COUNTRY, type CountryId, type SurveyData } from '@/data/survey'

interface AppProps {
  initialData?: SurveyData
}

export default function App({ initialData }: AppProps) {
  const [data, setData] = useState<SurveyData>(() => initialData ?? createInitialData())
  const [country, setCountry] = useState<CountryId>(DEFAULT_COUNTRY)

  return (
    <main className="mx-auto grid max-w-5xl gap-6 p-4 md:grid-cols-2 md:p-8">
      <h1 className="text-2xl font-bold md:col-span-2">User Dashboard</h1>
      <UserForm onSubmit={(s) => setData((prev) => applySubmission(prev, s))} />
      <InterestsDashboard data={data} country={country} onCountryChange={setCountry} />
    </main>
  )
}
