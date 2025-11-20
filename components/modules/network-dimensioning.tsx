"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Wifi } from "lucide-react"

export default function NetworkDimensioningModule() {
  // Estado para APs por cobertura
  const [areaSize, setAreaSize] = useState<number>(1000)
  const [apRadius, setApRadius] = useState<number>(30)

  // Estado para APs por usuarios
  const [totalUsers, setTotalUsers] = useState<number>(100)
  const [usersPerAp, setUsersPerAp] = useState<number>(20)

  // Estado para APs por densidad
  const [areaDensity, setAreaDensity] = useState<number>(1000)
  const [apPer10k, setApPer10k] = useState<number>(1)

  // Estado para bitrate y ancho de banda
  const [activeDevices, setActiveDevices] = useState<number>(80)
  const [dataPerDevice, setDataPerDevice] = useState<number>(102400)
  const [timeWindow, setTimeWindow] = useState<number>(3600)

  // Cálculos
  const calculateApsCoverage = () => {
    const areaPerAp = Math.PI * Math.pow(apRadius, 2)
    return Math.ceil(areaSize / areaPerAp)
  }

  const calculateApsUsers = () => Math.ceil(totalUsers / usersPerAp)

  const calculateApsDensity = () => Math.ceil((areaDensity / 10000) * apPer10k)

  const calculateBitrate = () => {
    if (timeWindow <= 0) return 0
    const totalBytes = activeDevices * dataPerDevice
    const totalBits = totalBytes * 8
    return totalBits / timeWindow
  }

  const calculateBandwidth = () => calculateBitrate() * 1.3

  const apsCoverage = calculateApsCoverage()
  const apsUsers = calculateApsUsers()
  const apsDensity = calculateApsDensity()
  const bitrate = calculateBitrate()
  const bandwidth = calculateBandwidth()
  const recommendedAps = Math.max(apsCoverage, apsUsers, apsDensity)

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-orange-500 shadow-md">
          <Wifi className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 flex flex-wrap items-center gap-2">
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              Módulo 2:
            </span>
            <span>Dimensionamiento de Red</span>
          </h1>
          <p className="text-sm md:text-base text-neutral-500 mt-1">
            Calcula la cantidad de APs, dispositivos activos, bitrate promedio y ancho de banda requerido.
          </p>
        </div>
      </div>

      {/* Section 1: APs por Cobertura */}
      <Card className="bg-white p-6 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-neutral-900">APs por Cobertura</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-semibold uppercase tracking-wide">
            Área física
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Área a cubrir (m²)</label>
              <input
                type="number"
                value={areaSize}
                onChange={(e) => setAreaSize(Number.parseFloat(e.target.value) || 1000)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Ej: 1000 m² (≈ 30m × 33m)</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Radio de cobertura por AP (m)</label>
              <input
                type="number"
                value={apRadius}
                onChange={(e) => setApRadius(Number.parseFloat(e.target.value) || 30)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Típico: 20–50 m según potencia.</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-2">APs requeridos por cobertura</p>
              <p className="text-4xl font-extrabold text-blue-600">{apsCoverage}</p>
              <p className="text-xs text-neutral-500 mt-3">
                Área por AP: {(Math.PI * Math.pow(apRadius, 2)).toFixed(0)} m²
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 2: APs por Número de Usuarios */}
      <Card className="bg-white p-6 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-neutral-900">APs por Número de Usuarios</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-orange-50 text-orange-600 font-semibold uppercase tracking-wide">
            Capacidad
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Total de usuarios en la red</label>
              <input
                type="number"
                value={totalUsers}
                onChange={(e) => setTotalUsers(Number.parseFloat(e.target.value) || 100)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Número total de usuarios potencialmente conectados.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Usuarios por AP (capacidad)</label>
              <input
                type="number"
                value={usersPerAp}
                onChange={(e) => setUsersPerAp(Number.parseFloat(e.target.value) || 20)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Típico: 15–30 usuarios activos por AP.</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-2">APs requeridos por usuarios</p>
              <p className="text-4xl font-extrabold text-blue-600">{apsUsers}</p>
              <p className="text-xs text-neutral-500 mt-3">
                Capacidad total: {apsUsers * usersPerAp} usuarios
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: APs por Densidad */}
      <Card className="bg-white p-6 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-neutral-900">APs por Densidad de Zona</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold uppercase tracking-wide">
            Entorno
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Área de zona (m²)</label>
              <input
                type="number"
                value={areaDensity}
                onChange={(e) => setAreaDensity(Number.parseFloat(e.target.value) || 1000)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Área total a cubrir.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Densidad de APs (por 10,000 m²)
              </label>
              <input
                type="number"
                value={apPer10k}
                onChange={(e) => setApPer10k(Number.parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                step="0.1"
                min="0.1"
              />
              <p className="text-xs text-neutral-500 mt-1">Ej: 1 AP / 10,000 m² (zona rural).</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="text-center">
              <p className="text-sm text-neutral-600 mb-2">APs requeridos por densidad</p>
              <p className="text-4xl font-extrabold text-blue-600">{apsDensity}</p>
              <p className="text-xs text-neutral-500 mt-3">Densidad: {apPer10k} APs / 10,000 m²</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 4: Dispositivos y Bitrate */}
      <Card className="bg-white p-6 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
          <h2 className="text-xl font-bold text-neutral-900">Dispositivos Activos y Bitrate</h2>
          <span className="text-xs px-3 py-1 rounded-full bg-neutral-900 text-white font-semibold uppercase tracking-wide">
            Tráfico
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">
                Dispositivos activos simultáneamente
              </label>
              <input
                type="number"
                value={activeDevices}
                onChange={(e) => setActiveDevices(Number.parseFloat(e.target.value) || 80)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="0"
              />
              <p className="text-xs text-neutral-500 mt-1">Ej: 80 de 100 usuarios activos.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Datos por dispositivo (bytes)</label>
              <input
                type="number"
                value={dataPerDevice}
                onChange={(e) => setDataPerDevice(Number.parseFloat(e.target.value) || 102400)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Ej: 100 KB ≈ 102,400 bytes.</p>
            </div>

            <div>
              <label className="text-sm font-medium text-neutral-800 block mb-2">Ventana de tiempo (s)</label>
              <input
                type="number"
                value={timeWindow}
                onChange={(e) => setTimeWindow(Number.parseFloat(e.target.value) || 3600)}
                className="w-full px-3 py-2 bg-white border border-neutral-200 rounded-lg text-neutral-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                min="1"
              />
              <p className="text-xs text-neutral-500 mt-1">Típico: 3600 s (1 hora).</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <p className="text-sm text-neutral-600 mb-2">Bitrate promedio</p>
              <p className="text-3xl font-extrabold text-blue-700">
                {(bitrate / 1_000_000).toFixed(2)} <span className="text-sm">Mbps</span>
              </p>
              <p className="text-xs text-neutral-500 mt-1">{(bitrate / 1000).toFixed(0)} Kbps</p>
            </div>

            <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
              <p className="text-sm text-neutral-700 mb-2">Ancho de banda requerido</p>
              <p className="text-3xl font-extrabold text-orange-600">
                {(bandwidth / 1_000_000).toFixed(2)} <span className="text-sm">Mbps</span>
              </p>
              <p className="text-xs text-neutral-600 mt-1">Incluye +30% de overhead.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Section */}
      <Card className="bg-white p-6 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">Comparativa de resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
            <p className="text-sm text-neutral-600 mb-2">APs por cobertura</p>
            <p className="text-3xl font-extrabold text-blue-700">{apsCoverage}</p>
          </div>
          <div className="p-4 rounded-xl bg-orange-50 border border-orange-200">
            <p className="text-sm text-neutral-700 mb-2">APs por usuarios</p>
            <p className="text-3xl font-extrabold text-orange-600">{apsUsers}</p>
          </div>
          <div className="p-4 rounded-xl bg-neutral-900 text-white border border-neutral-800">
            <p className="text-sm text-white/80 mb-2">APs por densidad</p>
            <p className="text-3xl font-extrabold">{apsDensity}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-gradient-to-r from-blue-600 via-blue-700 to-orange-500 text-white">
          <p className="text-sm">APs recomendados (valor máximo de los métodos):</p>
          <p className="text-3xl font-extrabold mt-2">{recommendedAps} APs</p>
          <p className="text-xs text-white/80 mt-2">
            Se usa el mayor valor entre cobertura, usuarios y densidad para asegurar una red robusta.
          </p>
        </div>
      </Card>

      {/* Summary Table */}
      <Card className="bg-white p-6 border border-blue-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
        <h2 className="text-xl font-bold text-neutral-900 mb-6">Resumen de parámetros de red</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 font-medium text-neutral-800">Dispositivos activos</td>
                <td className="py-3 px-4 text-neutral-600 font-semibold">{activeDevices} dispositivos</td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 font-medium text-neutral-800">Datos por dispositivo</td>
                <td className="py-3 px-4 text-neutral-600 font-semibold">
                  {(dataPerDevice / 1024).toFixed(1)} KB
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 font-medium text-neutral-800">Total de datos</td>
                <td className="py-3 px-4 text-neutral-600 font-semibold">
                  {((activeDevices * dataPerDevice) / (1024 * 1024)).toFixed(2)} MB
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 font-medium text-neutral-800">Bitrate promedio</td>
                <td className="py-3 px-4 font-semibold text-blue-700">
                  {(bitrate / 1_000_000).toFixed(2)} Mbps
                </td>
              </tr>
              <tr className="border-b border-neutral-200">
                <td className="py-3 px-4 font-medium text-neutral-800">Ancho de banda requerido</td>
                <td className="py-3 px-4 font-semibold text-orange-600">
                  {(bandwidth / 1_000_000).toFixed(2)} Mbps
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-neutral-800">APs recomendados</td>
                <td className="py-3 px-4 font-semibold text-neutral-900">{recommendedAps} APs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Educational Notes */}
      <Card className="bg-neutral-900 p-6 border border-neutral-800 rounded-2xl">
        <h3 className="text-lg font-semibold text-white mb-3">Notas educativas</h3>
        <ul className="space-y-2 text-sm text-neutral-300">
          <li>
            <strong className="text-white">Cobertura:</strong> Área de cada AP = π × r². Total de APs = Área total / Área
            por AP.
          </li>
          <li>
            <strong className="text-white">Usuarios:</strong> Cada AP soporta un número máximo de usuarios simultáneos
            (QoS).
          </li>
          <li>
            <strong className="text-white">Densidad:</strong> Se ajusta según el tipo de zona (alta, media o baja
            densidad).
          </li>
          <li>
            <strong className="text-white">Bitrate:</strong> (Dispositivos × Datos × 8 bits) / Tiempo = bps.
          </li>
          <li>
            <strong className="text-white">Ancho de banda:</strong> Se agrega ≈30% de overhead por protocolos,
            retransmisiones y control.
          </li>
        </ul>
      </Card>
    </div>
  )
}
