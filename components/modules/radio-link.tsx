"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Radio } from "lucide-react"

export default function RadioLinkModule() {
  const [distance, setDistance] = useState(50)
  const [frequency, setFrequency] = useState(2.4)
  const [txPower, setTxPower] = useState(20)
  const [antennaGain, setAntennaGain] = useState(5)
  const [cableAttenuation, setCableAttenuation] = useState(2)

  // Friis Free Space Path Loss Formula
  const calculatePathLoss = () => {
    const fspl =
      20 * Math.log10(distance) +
      20 * Math.log10(frequency) +
      20 * Math.log10(Math.PI * 2e8)
    return fspl.toFixed(2)
  }

  // Calculate Fresnel Zone
  const calculateFresnelZone = () => {
    const wavelength = 299792458 / (frequency * 1e9)
    const fresnelRadius = 0.5 * Math.sqrt((distance * wavelength) / 2)
    return fresnelRadius.toFixed(2)
  }

  // Calculate received power
  const rxPower = (
    txPower +
    2 * antennaGain -
    Number.parseFloat(calculatePathLoss()) -
    cableAttenuation
  ).toFixed(2)

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
      ? "#2563eb" // azul
      : Number.parseFloat(rxPower) > -90
      ? "#f97316" // naranja
      : Number.parseFloat(rxPower) > -100
      ? "#f97316"
      : "#ef4444" // rojo

  // Path loss data for chart
  const pathLossData = Array.from({ length: 20 }, (_, i) => ({
    distancia: (i + 1) * 10,
    perdida:
      -(
        20 * Math.log10((i + 1) * 10) +
        20 * Math.log10(frequency) +
        20 * Math.log10(Math.PI * 2e8)
      ),
  }))

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-md">
          <Radio className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 flex flex-wrap gap-2 items-center">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Módulo 4:
            </span>
            <span>Enlace de Radio</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-500 mt-1">
            Calcula la propagación de señales usando la pérdida en espacio libre
            de Friis y parámetros básicos de radioenlace.
          </p>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Parámetros */}
        <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm hover:shadow-md transition-shadow space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-neutral-900">
              Parámetros del enlace
            </h3>
            <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold uppercase tracking-wide">
              Entrada
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Distancia: <span className="font-semibold">{distance} m</span>
              </label>
              <input
                type="range"
                min="1"
                max="500"
                value={distance}
                onChange={(e) => setDistance(Number.parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Distancia punto a punto entre antenas.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Frecuencia:{" "}
                <span className="font-semibold">
                  {frequency.toFixed(1)} GHz
                </span>
              </label>
              <input
                type="range"
                min="0.8"
                max="6"
                step="0.1"
                value={frequency}
                onChange={(e) =>
                  setFrequency(Number.parseFloat(e.target.value))
                }
                className="w-full accent-blue-600"
              />
              <p className="text-xs text-neutral-500 mt-1">
                Bandas típicas: 2.4 GHz, 5 GHz, etc.
              </p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Potencia TX:{" "}
                <span className="font-semibold">{txPower} dBm</span>
              </label>
              <input
                type="range"
                min="0"
                max="30"
                value={txPower}
                onChange={(e) => setTxPower(Number.parseInt(e.target.value))}
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Ganancia de antena:{" "}
                <span className="font-semibold">{antennaGain} dB</span>
              </label>
              <input
                type="range"
                min="0"
                max="12"
                value={antennaGain}
                onChange={(e) =>
                  setAntennaGain(Number.parseInt(e.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Atenuación de cable:{" "}
                <span className="font-semibold">{cableAttenuation} dB</span>
              </label>
              <input
                type="range"
                min="0"
                max="5"
                step="0.5"
                value={cableAttenuation}
                onChange={(e) =>
                  setCableAttenuation(Number.parseFloat(e.target.value))
                }
                className="w-full accent-blue-600"
              />
            </div>
          </div>
        </div>

        {/* Resultados rápidos */}
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm">
            <div className="text-sm text-neutral-500 mb-2">
              Pérdida en espacio libre
            </div>
            <div className="text-3xl font-extrabold text-orange-600">
              {calculatePathLoss()} dB
            </div>
            <p className="text-xs text-neutral-500 mt-2">Fórmula de Friis.</p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm">
            <div className="text-sm text-neutral-500 mb-2">
              Potencia recibida (RX)
            </div>
            <div className="text-3xl font-extrabold" style={{ color: signalColor }}>
              {rxPower} dBm
            </div>
            <div
              className="text-sm font-semibold mt-2 uppercase tracking-wide"
              style={{ color: signalColor }}
            >
              Señal: {signalQuality}
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-blue-200 shadow-sm">
            <div className="text-sm text-neutral-500 mb-2">Zona de Fresnel</div>
            <div className="text-3xl font-extrabold text-blue-600">
              {calculateFresnelZone()} m
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Radio de la primera zona de Fresnel en el punto medio del
              enlace.
            </p>
          </div>

          <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800">
            <h4 className="font-semibold text-white mb-3">
              Presupuesto de enlace
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-neutral-400">Potencia TX:</span>
                <span className="text-white font-medium">
                  +{txPower} dBm
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Ganancia total antenas:</span>
                <span className="text-white font-medium">
                  +{2 * antennaGain} dB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">Atenuación cable:</span>
                <span className="text-white font-medium">
                  -{cableAttenuation} dB
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-700 pt-2 mt-2">
                <span className="text-neutral-400">Pérdida espacio libre:</span>
                <span className="text-orange-400 font-medium">
                  -{calculatePathLoss()} dB
                </span>
              </div>
              <div className="flex justify-between border-t border-neutral-700 pt-2 mt-2 font-bold">
                <span className="text-white">Potencia RX:</span>
                <span style={{ color: signalColor }}>{rxPower} dBm</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-5 rounded-2xl border border-blue-200 shadow-sm h-80">
        <h3 className="text-lg font-semibold text-neutral-900 mb-4">
          Pérdida de camino vs distancia
        </h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pathLossData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="distancia"
              stroke="#6b7280"
              label={{
                value: "Distancia (m)",
                position: "insideBottomRight",
                offset: -5,
                fill: "#111827",
              }}
            />
            <YAxis
              stroke="#6b7280"
              label={{
                value: "Pérdida (dB)",
                angle: -90,
                position: "insideLeft",
                fill: "#111827",
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #1f2937",
                color: "#f9fafb",
              }}
            />
            <Line
              type="monotone"
              dataKey="perdida"
              stroke="#2563eb"
              strokeWidth={2.2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
