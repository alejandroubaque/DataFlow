"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Zap } from "lucide-react"

export default function PowerConversionModule() {
  const [dbInput, setDbInput] = useState<string>("")
  const [dbmInput, setDbmInput] = useState<string>("")
  const [wInput, setWInput] = useState<string>("")

  const [results, setResults] = useState<{
    db: number | null
    dbm: number | null
    watts: number | null
    milivatios: number | null
  }>({
    db: null,
    dbm: null,
    watts: null,
    milivatios: null,
  })

  // Conversión desde dB
  const handleCalculateFromDb = () => {
    const db = Number.parseFloat(dbInput)
    if (isNaN(db)) return

    const ratio = Math.pow(10, db / 10)
    const watts = ratio // referencia 1W
    const dbm = db + 30
    const milivatios = watts * 1000

    setResults({ db, dbm, watts, milivatios })
  }

  // Conversión desde dBm
  const handleCalculateFromDbm = () => {
    const dbm = Number.parseFloat(dbmInput)
    if (isNaN(dbm)) return

    const milivatios = Math.pow(10, dbm / 10)
    const watts = milivatios / 1000
    const db = dbm - 30

    setResults({ db, dbm, watts, milivatios })
  }

  // Conversión desde Watts
  const handleCalculateFromWatts = () => {
    const watts = Number.parseFloat(wInput)
    if (isNaN(watts) || watts <= 0) return

    const milivatios = watts * 1000
    const dbm = 10 * Math.log10(milivatios)
    const db = dbm - 30

    setResults({ db, dbm, watts, milivatios })
  }

  const handleClearResults = () => {
    setResults({
      db: null,
      dbm: null,
      watts: null,
      milivatios: null,
    })
    setDbInput("")
    setDbmInput("")
    setWInput("")
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-md">
          <Zap className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 flex items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Módulo 1:
            </span>
            <span>Conversión de Potencia</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-500 mt-1">
            Herramientas para conversión entre <span className="font-semibold">dB, dBm y W</span> en sistemas de RF.
          </p>
        </div>
      </div>

      {/* Three Input Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Desde dB */}
        <Card className="bg-white border border-blue-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Desde dB</h3>
              <p className="text-xs text-neutral-500">Decibeles (referencia 1W)</p>
            </div>
            <span className="text-sm px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold">
              dB → W / dBm
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-1">
                Valor en dB
              </label>
              <input
                type="number"
                value={dbInput}
                onChange={(e) => setDbInput(e.target.value)}
                placeholder="Ej: 40"
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleCalculateFromDb}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>📊</span> Calcular
            </button>
          </div>
        </Card>

        {/* Desde dBm */}
        <Card className="bg-white border border-blue-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Desde dBm</h3>
              <p className="text-xs text-neutral-500">Decibelios-milivatios</p>
            </div>
            <span className="text-sm px-2 py-1 rounded-full bg-orange-50 text-orange-600 font-semibold">
              dBm → W / dB
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-1">
                Valor en dBm
              </label>
              <input
                type="number"
                value={dbmInput}
                onChange={(e) => setDbmInput(e.target.value)}
                placeholder="Ej: 0.02"
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleCalculateFromDbm}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>📊</span> Calcular
            </button>
          </div>
        </Card>

        {/* Desde Watts */}
        <Card className="bg-white border border-blue-200 shadow-sm hover:shadow-md transition-shadow rounded-2xl p-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-lg font-bold text-neutral-900">Desde Watts</h3>
              <p className="text-xs text-neutral-500">Potencia en vatios</p>
            </div>
            <span className="text-sm px-2 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold">
              W → dBm / dB
            </span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-1">
                Valor en W
              </label>
              <input
                type="number"
                value={wInput}
                onChange={(e) => setWInput(e.target.value)}
                placeholder="Ej: 1"
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              onClick={handleCalculateFromWatts}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>📊</span> Calcular
            </button>
          </div>
        </Card>
      </div>

      {/* Results Section */}
      {results.db !== null && (
        <Card className="bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 border-none text-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">➡️</span>
              <h2 className="text-xl md:text-2xl font-bold">
                Resultados de Conversión
              </h2>
            </div>
            <span className="text-xs md:text-sm bg-black/20 border border-white/20 px-3 py-1 rounded-full uppercase tracking-wide">
              Cálculo basado en el último valor ingresado
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-black/15 border border-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-xs md:text-sm text-white/80 mb-1">dB</p>
              <p className="text-2xl font-extrabold">
                {results.db!.toFixed(2)} <span className="text-xs">dB</span>
              </p>
            </div>

            <div className="bg-black/15 border border-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-xs md:text-sm text-white/80 mb-1">dBm</p>
              <p className="text-2xl font-extrabold">
                {results.dbm!.toFixed(2)} <span className="text-xs">dBm</span>
              </p>
            </div>

            <div className="bg-black/15 border border-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-xs md:text-sm text-white/80 mb-1">Watts</p>
              <p className="text-2xl font-extrabold">
                {results.watts!.toFixed(6)} <span className="text-xs">W</span>
              </p>
            </div>

            <div className="bg-black/15 border border-white/20 rounded-xl p-4 text-center backdrop-blur-sm">
              <p className="text-xs md:text-sm text-white/80 mb-1">Milivatios</p>
              <p className="text-2xl font-extrabold">
                {results.milivatios!.toFixed(3)} <span className="text-xs">mW</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClearResults}
            className="w-full bg-black/30 hover:bg-black/40 border border-white/25 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
          >
            Limpiar resultados
          </button>
        </Card>
      )}
    </div>
  )
}
