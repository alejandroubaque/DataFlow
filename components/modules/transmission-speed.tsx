"use client"

import { useState } from "react"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts"
import { Card } from "@/components/ui/card"
import { Gauge } from "lucide-react"

export default function TransmissionSpeedModule() {
  const [bandwidth, setBandwidth] = useState(20)
  const [frequency, setFrequency] = useState(2.4)
  const [snr, setSNR] = useState(20)
  const [fileSize, setFileSize] = useState(10) // MB
  const [results, setResults] = useState<{
    speed: number
    capacity: number
    transmissionTime: string
  } | null>(null)
  const [speedData, setSpeedData] = useState<{ name: string; velocidad: number }[]>([])

  // Calculate transmission speed using Shannon
  const calculateTransmissionSpeed = () => {
    // Shannon formula: C = B * log2(1 + SNR)
    const snrLinear = Math.pow(10, snr / 10)
    const shannonCapacity = bandwidth * Math.log2(1 + snrLinear) // Mbps si BW en MHz

    // Practical speed with 90% efficiency
    const practicalSpeed = shannonCapacity * 0.9

    // Calculate transmission time (converting file size from MB to bits)
    const fileSizeBits = fileSize * 8 * 1024 * 1024 // Convert MB to bits
    const transmissionTimeSeconds = fileSizeBits / (practicalSpeed * 1e6) // speed in Mbps

    // Format transmission time
    let transmissionTime = ""
    if (transmissionTimeSeconds < 60) {
      transmissionTime = `${transmissionTimeSeconds.toFixed(2)} segundos`
    } else if (transmissionTimeSeconds < 3600) {
      const minutes = transmissionTimeSeconds / 60
      transmissionTime = `${minutes.toFixed(2)} minutos`
    } else {
      const hours = transmissionTimeSeconds / 3600
      transmissionTime = `${hours.toFixed(2)} horas`
    }

    setResults({
      speed: practicalSpeed,
      capacity: shannonCapacity,
      transmissionTime,
    })

    // Generate chart data (velocidad vs SNR)
    const data: { name: string; velocidad: number }[] = []
    for (let i = 5; i <= 30; i += 5) {
      const snrLin = Math.pow(10, i / 10)
      const cap = bandwidth * Math.log2(1 + snrLin) * 0.9
      data.push({ name: `${i} dB`, velocidad: Math.round(cap * 100) / 100 })
    }
    setSpeedData(data)
  }

  const clearResults = () => {
    setResults(null)
    setSpeedData([])
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-md">
          <Gauge className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 flex flex-wrap gap-2 items-center">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Módulo 3:
            </span>
            <span>Velocidad de Transmisión</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-500 mt-1">
            Calcula la velocidad de datos y el tiempo de transmisión usando la capacidad de Shannon
            y parámetros de RF.
          </p>
        </div>
      </div>

      {/* Input parameters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <label className="text-sm font-medium text-neutral-800 mb-2 block">
            Ancho de banda (MHz)
          </label>
          <input
            type="number"
            value={bandwidth}
            onChange={(e) => setBandwidth(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white text-neutral-900 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 20"
            min="1"
            max="160"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Típico: 5, 10, 20, 40, 80 MHz.
          </p>
        </Card>

        <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <label className="text-sm font-medium text-neutral-800 mb-2 block">
            Frecuencia (GHz)
          </label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white text-neutral-900 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 2.4"
            step="0.1"
            min="0.1"
          />
          <p className="text-xs text-neutral-500 mt-1">
            2.4 GHz, 5 GHz, 6 GHz.
          </p>
        </Card>

        <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <label className="text-sm font-medium text-neutral-800 mb-2 block">
            Relación SNR (dB)
          </label>
          <input
            type="number"
            value={snr}
            onChange={(e) => setSNR(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white text-neutral-900 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 20"
            min="0"
            max="50"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Relación Señal/Ruido en dB.
          </p>
        </Card>

        <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
          <label className="text-sm font-medium text-neutral-800 mb-2 block">
            Tamaño del archivo (MB)
          </label>
          <input
            type="number"
            value={fileSize}
            onChange={(e) => setFileSize(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-white text-neutral-900 rounded-lg border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ej: 10"
            min="0.1"
            max="10000"
            step="0.1"
          />
          <p className="text-xs text-neutral-500 mt-1">
            Tamaño del archivo a transmitir.
          </p>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={calculateTransmissionSpeed}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
        >
          Calcular velocidad
        </button>
        <button
          onClick={clearResults}
          className="flex-1 bg-neutral-900 text-white py-2 px-4 rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
        >
          Limpiar resultados
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm">
            <div className="text-sm text-neutral-500 mb-1">Velocidad de transmisión</div>
            <div className="text-2xl font-extrabold text-blue-600">
              {results.speed.toFixed(2)} Mbps
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Velocidad práctica (≈ 90% de la capacidad de Shannon).
            </p>
          </Card>

          <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm">
            <div className="text-sm text-neutral-500 mb-1">Capacidad de Shannon</div>
            <div className="text-2xl font-extrabold text-orange-600">
              {results.capacity.toFixed(2)} Mbps
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Límite teórico máximo para este canal.
            </p>
          </Card>

          <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm">
            <div className="text-sm text-neutral-500 mb-1">Tiempo de transmisión</div>
            <div className="text-xl font-extrabold text-neutral-900">
              {results.transmissionTime}
            </div>
            <p className="text-xs text-neutral-500 mt-2">
              Para un archivo de {fileSize} MB.
            </p>
          </Card>

          <Card className="p-4 bg-white border border-blue-200 rounded-2xl shadow-sm">
            <div className="text-sm text-neutral-500 mb-1">Configuración usada</div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-neutral-500">BW:</span>{" "}
                <span className="text-blue-600 font-semibold">{bandwidth} MHz</span>
              </p>
              <p>
                <span className="text-neutral-500">Frecuencia:</span>{" "}
                <span className="text-blue-600 font-semibold">
                  {frequency} GHz
                </span>
              </p>
              <p>
                <span className="text-neutral-500">SNR:</span>{" "}
                <span className="text-blue-600 font-semibold">{snr} dB</span>
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Speed vs SNR chart */}
      {speedData.length > 0 && (
        <Card className="p-5 bg-white border border-blue-200 rounded-2xl shadow-sm">
          <h3 className="text-lg font-semibold text-neutral-900 mb-4">
            Velocidad vs relación SNR
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  stroke="#6b7280"
                  label={{
                    value: "SNR (dB)",
                    position: "insideBottomRight",
                    offset: -5,
                    fill: "#111827",
                  }}
                />
                <YAxis
                  stroke="#6b7280"
                  label={{
                    value: "Velocidad (Mbps)",
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
                  dataKey="velocidad"
                  stroke="#2563eb"
                  strokeWidth={2.2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}

      {/* Educational note */}
      <Card className="bg-neutral-900 p-5 border border-neutral-800 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-3">
          Nota rápida sobre Shannon
        </h3>
        <p className="text-sm text-neutral-300">
          La capacidad de canal de Shannon se calcula como{" "}
          <span className="font-mono text-white">C = B · log₂(1 + SNR)</span>, donde{" "}
          <span className="font-mono text-white">B</span> es el ancho de banda (Hz) y{" "}
          <span className="font-mono text-white">SNR</span> es la relación señal-ruido en
          forma lineal. En la práctica, siempre se pierde parte de esa capacidad por
          protocolos, errores y overhead.
        </p>
      </Card>
    </div>
  )
}
