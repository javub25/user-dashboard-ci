import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { COUNTRIES, toChartData, type CountryId, type SurveyData } from '@/data/survey'

const COLORS = ['#2563eb', '#16a34a', '#f59e0b', '#9333ea', '#e11d48', '#0891b2', '#65a30d', '#db2777']

interface InterestsDashboardProps {
  data: SurveyData
  country: CountryId
  onCountryChange: (country: CountryId) => void
}

export function InterestsDashboard({ data, country, onCountryChange }: InterestsDashboardProps) {
  const chartData = toChartData(data[country])
  const meta = COUNTRIES.find((c) => c.id === country)!

  return (
    <Card>
      <CardHeader>
        <CardTitle>Interests by country</CardTitle>
        <CardDescription>Showing {meta.flag} {meta.label}</CardDescription>
      </CardHeader>
      <RadioGroup
        aria-label="Dashboard country"
        value={country}
        onValueChange={(v) => onCountryChange(v as CountryId)}
        className="mb-4 flex flex-wrap gap-4"
      >
        {COUNTRIES.map((c) => (
          <div key={c.id} className="flex items-center gap-2">
            <RadioGroupItem value={c.id} id={`dash-${c.id}`} aria-label={c.label} />
            <Label htmlFor={`dash-${c.id}`}>{c.flag} {c.label}</Label>
          </div>
        ))}
      </RadioGroup>

      <figure data-testid="pie-chart" data-country={country} className="flex flex-col items-center">
        <PieChart width={340} height={320}>
          <Pie data={chartData} dataKey="value" nameKey="name" outerRadius={110} isAnimationActive={false}>
            {chartData.map((entry, i) => <Cell key={entry.name} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
        {/* Accessible data table mirroring the chart (screen readers + tests) */}
        <table aria-label={`Interests in ${meta.label}`} className="mt-4 w-full text-sm">
          <tbody>
            {chartData.map((d) => (
              <tr key={d.name} className="border-t border-[var(--border)]">
                <th scope="row" className="py-1 text-left font-normal">{d.name}</th>
                <td data-testid={`count-${d.name}`} className="py-1 text-right tabular-nums">{d.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </figure>
    </Card>
  )
}
