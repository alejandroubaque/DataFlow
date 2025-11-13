"use client"

import { useState } from "react"

export default function IoTModule() {
  const [connectUrl, setConnectUrl] = useState("")

  const esp32Specs = [
    { label: "Procesador", value: "Tensilica Xtensa 32-bit LX6" },
    { label: "Velocidad de Reloj", value: "160 / 240 MHz" },
    { label: "Memoria RAM", value: "520 KB SRAM" },
    { label: "Almacenamiento", value: "4 MB Flash" },
    { label: "Conexión WiFi", value: "802.11 b/g/n (2.4 GHz)" },
    { label: "Bluetooth", value: "Bluetooth v4.2 (2.4 GHz)" },
    { label: "ADC", value: "12-bit, 18 canales" },
    { label: "DAC", value: "2 canales de 8-bit" },
    { label: "UART", value: "3 puertos" },
    { label: "SPI", value: "4 puertos" },
    { label: "I2C", value: "2 puertos" },
    { label: "Voltaje de Operación", value: "3.3V" },
  ]

  const handleConnect = () => {
    const url = prompt("Ingresa la URL de la página web de Arduino (Ej: http://192.168.1.100:80)")
    if (url && url.trim()) {
      window.open(url, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Módulo ESP32</h2>
        <p className="text-muted-foreground">
          Características técnicas del microcontrolador ESP32 y conexión con la interfaz web de Arduino
        </p>
      </div>

      <button
        onClick={handleConnect}
        className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-semibold hover:bg-primary/90 transition text-lg"
      >
        Conectar con Arduino
      </button>

      <div className="bg-background p-6 rounded-lg border border-border">
        <h3 className="text-lg font-bold text-foreground mb-6">Especificaciones Técnicas ESP32</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {esp32Specs.map((spec, idx) => (
            <div key={idx} className="p-4 rounded-lg bg-secondary border border-border">
              <div className="text-xs text-muted-foreground font-medium mb-2">{spec.label}</div>
              <div className="text-sm font-bold text-foreground">{spec.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
