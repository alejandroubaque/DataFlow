"use client"

import { useState } from "react"
import PowerConversionModule from "@/components/modules/power-conversion"
import NetworkDimensioningModule from "@/components/modules/network-dimensioning"
import TransmissionSpeedModule from "@/components/modules/transmission-speed"
import RadioLinkModule from "@/components/modules/radio-link"
import IoTModule from "@/components/modules/iot-module"

export default function Home() {
  const [activeModule, setActiveModule] = useState<string>("power")

  const modules = [
    { id: "power", label: "Conversión de dB", icon: "⚡" },
    { id: "network", label: "Dimensionamiento de Red", icon: "🌐" },
    { id: "transmission", label: "Velocidad de Transmisión", icon: "📡" },
    { id: "radiolink", label: "Enlace de Radio", icon: "🔗" },
    { id: "iot", label: "ESP32", icon: "🚀" },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Component Removed */}

      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Comunicación de Datos</h1>
          <p className="text-muted-foreground">Herramientas para cálculos de RF y telecomunicaciones</p>
        </div>

        {/* Module Navigation */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-4">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                activeModule === module.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-accent"
              }`}
            >
              {module.icon} {module.label}
            </button>
          ))}
        </div>

        {/* Module Content */}
        <div className="rounded-lg border border-border bg-card p-6">
          {activeModule === "power" && <PowerConversionModule />}
          {activeModule === "network" && <NetworkDimensioningModule />}
          {activeModule === "transmission" && <TransmissionSpeedModule />}
          {activeModule === "radiolink" && <RadioLinkModule />}
          {activeModule === "iot" && <IoTModule />}
        </div>
      </main>
    </div>
  )
}
