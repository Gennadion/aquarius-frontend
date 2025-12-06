'use client'

import { useState } from 'react'
import { getSummary, SummaryModel } from '@/services/summary'

export default function TestPage() {
  const [summary, setSummary] = useState<SummaryModel | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [targetDate, setTargetDate] = useState('')

  const handleFetch = async () => {
    setLoading(true)
    setError(null)

    try {
      const data = await getSummary(
        targetDate ? { targetDate } : undefined
      )
      setSummary(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-cyan-400">
          Summary API Test
        </h1>

        <div className="flex gap-4 mb-8">
          <input
            type="text"
            placeholder="DD.MM.YYYY (optional)"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
            className="flex-1 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg focus:outline-none focus:border-cyan-500 transition-colors"
          />
          <button
            onClick={handleFetch}
            disabled={loading}
            className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-700 disabled:text-slate-500 rounded-lg font-medium transition-colors"
          >
            {loading ? 'Loading...' : 'Fetch'}
          </button>
        </div>

        {error && (
          <div className="p-4 bg-red-900/50 border border-red-700 rounded-lg mb-8 text-red-300">
            {error}
          </div>
        )}

        {summary && (
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-slate-300">
              Response
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <DataRow label="Data Date" value={summary.dataDate.toLocaleDateString()} />
              <DataRow label="Fetched At" value={summary.fetchedAt.toLocaleString()} />
              <DataRow label="Total %" value={`${summary.totalPercentage}%`} />
              <DataRow label="Last Year %" value={`${summary.lastYearPercentage}%`} />
              <DataRow label="Delta" value={summary.delta.toString()} />
              <DataRow label="Storage (MCM)" value={summary.totalStorageMcm.toLocaleString()} />
              <DataRow label="Capacity (MCM)" value={summary.totalCapacityMcm.toLocaleString()} />
            </div>

            <details className="mt-6">
              <summary className="cursor-pointer text-slate-500 hover:text-slate-400">
                Raw JSON
              </summary>
              <pre className="mt-2 p-4 bg-slate-950 rounded-lg text-xs overflow-auto text-cyan-300">
                {JSON.stringify(summary, null, 2)}
              </pre>
            </details>
          </div>
        )}
      </div>
    </div>
  )
}

function DataRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-sm text-slate-500">{label}</span>
      <span className="text-lg font-medium">{value}</span>
    </div>
  )
}


