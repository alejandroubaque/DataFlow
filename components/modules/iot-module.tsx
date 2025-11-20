"use client"

import { useState } from "react"
import { Cpu } from "lucide-react"

const IOT_URL = "http://192.168.1.92/" // IP de tu ESP32

export default function IoTModule() {
  const [connectUrl] = useState("")

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
    { label: "Voltaje de Operación", value: "3.3 V" },
  ]

  // Abrir la página web del ESP32/IoT
  const handleConnectIoT = () => {
    if (typeof window === "undefined") return
    window.open(IOT_URL, "_blank") // nueva pestaña
    // o window.location.href = IOT_URL  // misma pestaña
  }

  // Intentar abrir la app LookCam desde la web
  const handleOpenLookCam = () => {
    if (typeof window === "undefined") return

    // ⚠️ OJO: este esquema es un EJEMPLO.
    // Si descubres el scheme real de LookCam, cámbialo aquí.
    const deeplink = "lookcam://open"

    // Intento de abrir la app
    window.location.href = deeplink

    // Fallback: si no abre la app, después de un rato manda a la tienda
    setTimeout(() => {
      const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent)

      // 🔁 Cambia estas URLs por las reales de LookCam en App Store / Play Store
      const playStoreUrl =
        "https://play.google.com/store/search?q=lookcam&c=apps"
      const appStoreUrl =
        "https://apps.apple.com/us/search?term=lookcam"

      window.location.href = isIOS ? appStoreUrl : playStoreUrl
    }, 1500)
  }

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-md">
          <Cpu className="w-7 h-7 text-white" />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-neutral-900 flex flex-wrap gap-2 items-center">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Módulo 5:
            </span>
            <span>ESP32 e IoT</span>
          </h2>
          <p className="text-sm md:text-base text-neutral-500 mt-1">
            Visualiza las características técnicas del ESP32, abre el panel web del IoT
            y lanza la app de la cámara LookCam desde tu navegador.
          </p>
        </div>
      </div>

      {/* Botón ESP32 */}
      <button
        onClick={handleConnectIoT}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold text-base md:text-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        🔗 Abrir panel del ESP32 (IoT)
      </button>

      {/* Botón LookCam */}
      <button
        onClick={handleOpenLookCam}
        className="w-full bg-neutral-900 text-white py-3 px-6 rounded-xl font-semibold text-base md:text-lg hover:bg-neutral-800 transition-colors shadow-sm flex items-center justify-center gap-2"
      >
        📷 Abrir cámara en app LookCam
      </button>

      {/* Specs */}
      <div className="bg-white p-6 md:p-7 rounded-2xl border border-blue-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h3 className="text-lg md:text-xl font-bold text-neutral-900">
            Especificaciones técnicas del ESP32
          </h3>
          <span className="text-xs px-3 py-1 rounded-full bg-neutral-900 text-white font-semibold uppercase tracking-wide">
            Hardware
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {esp32Specs.map((spec, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-neutral-200 hover:border-blue-400 hover:shadow-md transition-shadow"
            >
              <div className="text-xs text-neutral-500 font-medium mb-1 uppercase tracking-wide">
                {spec.label}
              </div>
              <div className="text-sm font-semibold text-neutral-900">
                {spec.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notas educativas */}
      <div className="bg-neutral-900 p-6 rounded-2xl border border-neutral-800">
        <h3 className="text-lg font-semibold text-white mb-3">
          Notas para proyectos con ESP32 y cámara
        </h3>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li>
            ✅ El ESP32 trabaja a <span className="font-semibold text-white">3.3 V</span>, no conectes
            señales de 5 V directamente a sus pines.
          </li>
          <li>
            🌐 El panel IoT en <span className="font-mono text-white">{IOT_URL}</span> solo
            es accesible cuando estás en la misma red WiFi que el ESP32.
          </li>
          <li>
            📷 La cámara LookCam se maneja desde su propia app, tu web solo puede
            intentar abrirla mediante un enlace profundo (deeplink).
          </li>
          <li>
            🧪 Una integración “total” (video dentro de tu web) es más fácil con una
            ESP32-CAM o una cámara IP con RTSP/HTTP.
          </li>
        </ul>
      </div>
    </div>
  )
}
