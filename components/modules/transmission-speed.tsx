"use client"

import { useState } from "react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"
import { Card } from "@/components/ui/card"

export default function TransmissionSpeedModule() {
  const [bandwidth, setBandwidth] = useState(20)
  const [frequency, setFrequency] = useState(2.4)
  const [snr, setSNR] = useState(20)
  const [fileSize, setFileSize] = useState(10) // MB
  const [results, setResults] = useState<{ speed: number; capacity: number; transmissionTime: string } | null>(null)
  const [speedData, setSpeedData] = useState<{ name: string; velocidad: number }[]>([])

  // Calculate transmission speed using Shannon
  const calculateTransmissionSpeed = () => {
    // Shannon formula: C = B * log2(1 + SNR)
    const snrLinear = Math.pow(10, snr / 10)
    const shannonCapacity = bandwidth * Math.log2(1 + snrLinear)

    // Practical speed with 90% efficiency
    const practicalSpeed = shannonCapacity * 0.9

    // Calculate transmission time (converting file size from MB to bits)
    const fileSizeBits = fileSize * 8 * 1024 * 1024 // Convert MB to bits
    const transmissionTimeSeconds = fileSizeBits / (practicalSpeed * 1e6) // speed is in Mbps

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
      transmissionTime: transmissionTime,
    })

    // Generate chart data
    const data = []
    for (let i = 5; i <= 30; i += 5) {
      const snrLin = Math.pow(10, i / 10)
      const cap = bandwidth * Math.log2(1 + snrLin) * 0.9
      data.push({ name: `${i}dB`, velocidad: Math.round(cap * 100) / 100 })
    }
    setSpeedData(data)
  }

  const clearResults = () => {
    setResults(null)
    setSpeedData([])
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Cálculo de Velocidad de Transmisión</h2>
        <p className="text-muted-foreground">
          Calcula la velocidad de datos y tiempo de transmisión basado en parámetros de RF usando la teoría de Shannon
        </p>
      </div>

      {/* Input parameters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-background border-border">
          <label className="text-sm font-medium text-foreground mb-2 block">Ancho de Banda (MHz)</label>
          <input
            type="number"
            value={bandwidth}
            onChange={(e) => setBandwidth(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: 20"
            min="1"
            max="160"
          />
          <p className="text-xs text-muted-foreground mt-1">Típico: 5, 10, 20, 40, 80 MHz</p>
        </Card>

        <Card className="p-4 bg-background border-border">
          <label className="text-sm font-medium text-foreground mb-2 block">Frecuencia (GHz)</label>
          <input
            type="number"
            value={frequency}
            onChange={(e) => setFrequency(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: 2.4"
            step="0.1"
            min="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">2.4 GHz, 5 GHz, 6 GHz</p>
        </Card>

        <Card className="p-4 bg-background border-border">
          <label className="text-sm font-medium text-foreground mb-2 block">Relación SNR (dB)</label>
          <input
            type="number"
            value={snr}
            onChange={(e) => setSNR(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: 20"
            min="0"
            max="50"
          />
          <p className="text-xs text-muted-foreground mt-1">Señal/Ruido en dB</p>
        </Card>

        <Card className="p-4 bg-background border-border">
          <label className="text-sm font-medium text-foreground mb-2 block">Tamaño del Archivo (MB)</label>
          <input
            type="number"
            value={fileSize}
            onChange={(e) => setFileSize(Number.parseFloat(e.target.value) || 0)}
            className="w-full px-3 py-2 bg-secondary text-foreground rounded border border-border focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Ej: 10"
            min="0.1"
            max="10000"
            step="0.1"
          />
          <p className="text-xs text-muted-foreground mt-1">Archivo a transmitir en MB</p>
        </Card>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <button
          onClick={calculateTransmissionSpeed}
          className="flex-1 bg-primary text-primary-foreground py-2 px-4 rounded font-medium hover:bg-primary/90 transition"
        >
          Calcular Velocidad
        </button>
        <button
          onClick={clearResults}
          className="flex-1 bg-secondary text-foreground py-2 px-4 rounded font-medium hover:bg-secondary/90 transition"
        >
          Limpiar Resultados
        </button>
      </div>

      {/* Results */}
      {results && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="p-4 bg-background border border-primary">
            <div className="text-sm text-muted-foreground mb-1">Velocidad de Transmisión</div>
            <div className="text-2xl font-bold text-primary">{results.speed.toFixed(2)} Mbps</div>
            <p className="text-xs text-muted-foreground mt-2">Velocidad práctica con 90% eficiencia</p>
          </Card>

          <Card className="p-4 bg-background border border-primary">
            <div className="text-sm text-muted-foreground mb-1">Capacidad de Shannon</div>
            <div className="text-2xl font-bold text-primary">{results.capacity.toFixed(2)} Mbps</div>
            <p className="text-xs text-muted-foreground mt-2">Límite teórico máximo</p>
          </Card>

          <Card className="p-4 bg-background border border-primary">
            <div className="text-sm text-muted-foreground mb-1">Tiempo de Transmisión</div>
            <div className="text-2xl font-bold text-primary">{results.transmissionTime}</div>
            <p className="text-xs text-muted-foreground mt-2">Para archivo de {fileSize} MB</p>
          </Card>

          <Card className="p-4 bg-background border border-primary">
            <div className="text-sm text-muted-foreground mb-1">Configuración</div>
            <div className="space-y-1 text-sm">
              <p>
                <span className="text-muted-foreground">BW:</span>{" "}
                <span className="text-primary font-medium">{bandwidth} MHz</span>
              </p>
              <p>
                <span className="text-muted-foreground">SNR:</span>{" "}
                <span className="text-primary font-medium">{snr} dB</span>
              </p>
            </div>
          </Card>
        </div>
      )}

      {/* Speed vs SNR chart */}
      {speedData.length > 0 && (
        <Card className="p-4 bg-background border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Velocidad vs Relación SNR</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={speedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#888" />
                <YAxis stroke="#888" label={{ value: "Velocidad (Mbps)", angle: -90, position: "insideLeft" }} />
                <Tooltip contentStyle={{ backgroundColor: "#1a1a1a", border: "1px solid #333" }} />
                <Line type="monotone" dataKey="velocidad" stroke="#3b82f6" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  )
}
