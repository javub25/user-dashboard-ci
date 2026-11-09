import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { COUNTRIES, INTERESTS, type CountryId, type Interest, type Submission } from '@/data/survey'

interface UserFormProps {
  onSubmit: (submission: Submission) => void
}

export function UserForm({ onSubmit }: UserFormProps) {
  const [country, setCountry] = useState<CountryId | ''>('')
  const [interests, setInterests] = useState<Interest[]>([])

  const toggle = (interest: Interest, checked: boolean) =>
    setInterests((prev) => (checked ? [...prev, interest] : prev.filter((i) => i !== interest)))

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!country || interests.length === 0) return
    onSubmit({ country, interests })
    setCountry('')
    setInterests([])
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tell us about you</CardTitle>
        <CardDescription>Your answers update the dashboard instantly.</CardDescription>
      </CardHeader>
      <form aria-label="User survey" onSubmit={handleSubmit} className="space-y-6">
        <fieldset className="space-y-3">
          <legend className="mb-2 text-sm font-semibold">Which country are you from?</legend>
          <RadioGroup aria-label="Your country" value={country} onValueChange={(v) => setCountry(v as CountryId)}>
            {COUNTRIES.map((c) => (
              <div key={c.id} className="flex items-center gap-2">
                <RadioGroupItem value={c.id} id={`form-country-${c.id}`} aria-label={c.label} />
                <Label htmlFor={`form-country-${c.id}`}>{c.flag} {c.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </fieldset>
        <fieldset className="space-y-3">
          <legend className="mb-2 text-sm font-semibold">What are your interests?</legend>
          <div className="grid grid-cols-2 gap-3">
            {INTERESTS.map((interest) => {
              const id = `interest-${interest.replace(/\W+/g, '-').toLowerCase()}`
              return (
                <div key={interest} className="flex items-center gap-2">
                  <Checkbox
                    id={id}
                    aria-label={interest}
                    checked={interests.includes(interest)}
                    onCheckedChange={(checked) => toggle(interest, checked === true)}
                  />
                  <Label htmlFor={id}>{interest}</Label>
                </div>
              )
            })}
          </div>
        </fieldset>
        <Button type="submit" disabled={!country || interests.length === 0} className="w-full">
          Submit
        </Button>
      </form>
    </Card>
  )
}
