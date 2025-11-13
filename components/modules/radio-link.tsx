"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

export default function RadioLinkModule() {
  const [distance, setDistance] = useState(50)
  const [frequency, setFrequency] = useState(2.4)
  const [txPower, setTxPower] = useState(20)
  const [antennaGain, setAntennaGain] = useState(5)
  const [cableAttenuation, setCableAttenuation] = useState(2)

  // Friis Free Space Path Loss Formula
  const calculatePathLoss = () => {
    const fspl = 20 * Math.log10(distance) + 20 * Math.log10(frequency) + 20 * Math.log10(Math.PI * 2e8)
    return fspl.toFixed(2)
  }

  // Calculate Fresnel Zone
  const calculateFresnelZone = () => {
    // Fresnel zone radius: R = 0.5 * sqrt(distance * wavelength / 2)
    const wavelength = 299792458 / (frequency * 1e9) // speed of light / frequency
    const fresnelRadius = 0.5 * Math.sqrt((distance * wavelength) / 2)
    return fresnelRadius.toFixed(2)
  }

  // Calculate received power
  const rxPower = (txPower + 2 * antennaGain - Number.parseFloat(calculatePathLoss()) - cableAttenuation).toFixed(2)

  // Signal quality assessment
  const signalQuality =
    Number.parseFloat(rxPower) > -80
      ? "Excelente"
      : Number.parseFloat(rxPower) > -90
        ? "Buena"
        : Number.parseFloat(rxPower) > -100
          ? "Regular"
          : "Pobre"
  const signalColor =
    Number.parseFloat(rxPower) > -80
      ? "#10b981"
      : Number.parseFloat(rxPower) > -90
        ? "#f59e0b"
        : Number.parseFloat(rxPower) > -100
          ? "#f59e0b"
          : "#ef4444"

  // Path loss data for chart
  const pathLossData = Array.from({ length: 20 }, (_, i) => ({
    distancia: (i + 1) * 10,
    perdida: -(20 * Math.log10((i + 1) * 10) + 20 * Math.log10(frequency) + 20 * Math.log10(Math.PI * 2e8)),
  }))

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Cálculo de Enlace de Radio</h2>
        <p className="text-muted-foreground">
          Calcula la propagación de señales usando la fórmula de Pérdida en Espacio Libre de Friis
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-background p-4 rounded-lg border border-border space-y-4">
          <h3 className="font-semibold text-foreground">Parámetros del Enlace</h3>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Distancia: {distance} m</label>
            <input
              type="range"
              min="1"
              max="500"
              value={distance}
              onChange={(e) => setDistance(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Frecuencia: {frequency.toFixed(1)} GHz
            </label>
            <input
              type="range"
              min="0.8"
              max="6"
              step="0.1"
              value={frequency}
              onChange={(e) => setFrequency(Number.parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Potencia TX: {txPower} dBm</label>
            <input
              type="range"
              min="0"
              max="30"
              value={txPower}
              onChange={(e) => setTxPower(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Ganancia Antena: {antennaGain} dB</label>
            <input
              type="range"
              min="0"
              max="12"
              value={antennaGain}
              onChange={(e) => setAntennaGain(Number.parseInt(e.target.value))}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground block mb-2">
              Atenuación Cable: {cableAttenuation} dB
            </label>
            <input
              type="range"
              min="0"
              max="5"
              step="0.5"
              value={cableAttenuation}
              onChange={(e) => setCableAttenuation(Number.parseFloat(e.target.value))}
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">Pérdida en Espacio Libre</div>
            <div className="text-3xl font-bold text-destructive">{calculatePathLoss()} dB</div>
            <p className="text-xs text-muted-foreground mt-2">Fórmula de Friis</p>
          </div>

          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">Potencia Recibida (RX)</div>
            <div className="text-3xl font-bold" style={{ color: signalColor }}>
              {rxPower} dBm
            </div>
            <div className="text-sm font-medium mt-2" style={{ color: signalColor }}>
              Señal: {signalQuality}
            </div>
          </div>

          <div className="bg-background p-4 rounded-lg border border-border">
            <div className="text-sm text-muted-foreground mb-2">Zona de Fresnel</div>
            <div className="text-3xl font-bold text-primary">{calculateFresnelZone()} m</div>
            <p className="text-xs text-muted-foreground mt-2">Radio de primera zona de Fresnel</p>
          </div>

          <div className="bg-background p-4 rounded-lg border border-border">
            <h4 className="font-semibold text-foreground mb-3">Presupuesto de Enlace</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Potencia TX:</span>
                <span className="text-foreground font-medium">+{txPower} dBm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ganancia Antena:</span>
                <span className="text-foreground font-medium">+{2 * antennaGain} dB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Atenuación Cable:</span>
                <span className="text-foreground font-medium">-{cableAttenuation} dB</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2">
                <span className="text-muted-foreground">Pérdida Espacio Libre:</span>
                <span className="text-destructive font-medium">-{calculatePathLoss()} dB</span>
              </div>
              <div className="flex justify-between border-t border-border pt-2 mt-2 font-bold">
                <span>Potencia RX:</span>
                <span style={{ color: signalColor }}>{rxPower} dBm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-background p-4 rounded-lg border border-border h-80">
        <h3 className="text-lg font-semibold text-foreground mb-4">Pérdida de Camino vs Distancia</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pathLossData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis
              dataKey="distancia"
              stroke="#888"
              label={{ value: "Distancia (m)", position: "insideBottomRight", offset: -5 }}
            />
            <YAxis stroke="#888" label={{ value: "Pérdida (dB)", angle: -90, position: "insideLeft" }} />
            <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
            <Line type="monotone" dataKey="perdida" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
