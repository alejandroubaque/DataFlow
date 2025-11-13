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
    const watts = ratio // Considerando 1W como referencia
    const dbm = db + 30 // dBm = dB + 30 cuando la referencia es 1W
    const milivatios = watts * 1000

    setResults({
      db: db,
      dbm: dbm,
      watts: watts,
      milivatios: milivatios,
    })
  }

  // Conversión desde dBm
  const handleCalculateFromDbm = () => {
    const dbm = Number.parseFloat(dbmInput)
    if (isNaN(dbm)) return

    const milivatios = Math.pow(10, dbm / 10)
    const watts = milivatios / 1000
    const db = dbm - 30

    setResults({
      db: db,
      dbm: dbm,
      watts: watts,
      milivatios: milivatios,
    })
  }

  // Conversión desde Watts
  const handleCalculateFromWatts = () => {
    const watts = Number.parseFloat(wInput)
    if (isNaN(watts) || watts <= 0) return

    const milivatios = watts * 1000
    const dbm = 10 * Math.log10(milivatios)
    const db = dbm - 30

    console.log("[v0] Watts:", watts, "mW:", milivatios, "dBm:", dbm, "dB:", db)

    setResults({
      db: db,
      dbm: dbm,
      watts: watts,
      milivatios: milivatios,
    })
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
        <Zap className="w-8 h-8 text-chart-1 mt-1 flex-shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Módulo 1: Conversión de Potencia</h1>
          <p className="text-muted-foreground mt-1">
            Herramientas para conversión entre dB, dBm, W y cálculos relacionados con potencia de RF
          </p>
        </div>
      </div>

      {/* Three Input Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Desde dB */}
        <Card className="bg-background p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-1">Desde dB</h3>
          <p className="text-sm text-muted-foreground mb-4">Decibeles (referencia 1W)</p>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Valor en dB</label>
              <input
                type="number"
                value={dbInput}
                onChange={(e) => setDbInput(e.target.value)}
                placeholder="Ej: 40"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handleCalculateFromDb}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>📊</span> Calcular
            </button>
          </div>
        </Card>

        {/* Desde dBm */}
        <Card className="bg-background p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-1">Desde dBm</h3>
          <p className="text-sm text-muted-foreground mb-4">Decibelesmilivatios</p>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Valor en dBm</label>
              <input
                type="number"
                value={dbmInput}
                onChange={(e) => setDbmInput(e.target.value)}
                placeholder="Ej: 0,02"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handleCalculateFromDbm}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>📊</span> Calcular
            </button>
          </div>
        </Card>

        {/* Desde Watts */}
        <Card className="bg-background p-6 border-border">
          <h3 className="text-lg font-bold text-foreground mb-1">Desde Watts</h3>
          <p className="text-sm text-muted-foreground mb-4">Potencia en vatios</p>

          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground block mb-1">Valor en W</label>
              <input
                type="number"
                value={wInput}
                onChange={(e) => setWInput(e.target.value)}
                placeholder="Ej: 1"
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <button
              onClick={handleCalculateFromWatts}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <span>📊</span> Calcular
            </button>
          </div>
        </Card>
      </div>

      {/* Results Section */}
      {results.db !== null && (
        <Card className="bg-background p-6 border-border">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">→</span>
            <h2 className="text-xl font-bold text-foreground">Resultados de Conversión</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-background/50 border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">dB</p>
              <p className="text-2xl font-bold text-primary">
                {results.db.toFixed(2)} <span className="text-sm">dB</span>
              </p>
            </div>

            <div className="bg-background/50 border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">dBm</p>
              <p className="text-2xl font-bold text-primary">
                {results.dbm.toFixed(2)} <span className="text-sm">dBm</span>
              </p>
            </div>

            <div className="bg-background/50 border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Watts</p>
              <p className="text-2xl font-bold text-primary">
                {results.watts.toFixed(6)} <span className="text-sm">W</span>
              </p>
            </div>

            <div className="bg-background/50 border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Milivatios</p>
              <p className="text-2xl font-bold text-primary">
                {results.milivatios.toFixed(3)} <span className="text-sm">mW</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClearResults}
            className="w-full bg-background border border-border hover:bg-background/80 text-foreground font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Limpiar Resultados
          </button>
        </Card>
      )}
    </div>
  )
}
