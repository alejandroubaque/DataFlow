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

  const calculateApsUsers = () => {
    return Math.ceil(totalUsers / usersPerAp)
  }

  const calculateApsDensity = () => {
    return Math.ceil((areaDensity / 10000) * apPer10k)
  }

  const calculateBitrate = () => {
    if (timeWindow <= 0) return 0
    const totalBytes = activeDevices * dataPerDevice
    const totalBits = totalBytes * 8
    return totalBits / timeWindow
  }

  const calculateBandwidth = () => {
    return calculateBitrate() * 1.3
  }

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
        <Wifi className="w-8 h-8 text-chart-2 mt-1 flex-shrink-0" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">Módulo 2: Dimensionamiento de Red</h1>
          <p className="text-muted-foreground mt-1">
            Calcula la cantidad de APs, dispositivos activos, bitrate promedio y ancho de banda requerido
          </p>
        </div>
      </div>

      {/* Section 1: APs por Cobertura */}
      <Card className="bg-background p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Cálculo de APs por Cobertura</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Área a Cubrir (m²)</label>
              <input
                type="number"
                value={areaSize}
                onChange={(e) => setAreaSize(Number.parseFloat(e.target.value) || 1000)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Ej: 1000 m² (30m × 33m)</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Radio de Cobertura por AP (m)</label>
              <input
                type="number"
                value={apRadius}
                onChange={(e) => setApRadius(Number.parseFloat(e.target.value) || 30)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Típico: 20-50m según potencia</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-background/50 border border-chart-2/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">APs Requeridos por Cobertura</p>
              <p className="text-4xl font-bold text-chart-2">{apsCoverage}</p>
              <p className="text-xs text-muted-foreground mt-3">
                Área por AP: {(Math.PI * Math.pow(apRadius, 2)).toFixed(0)} m²
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 2: APs por Número de Usuarios */}
      <Card className="bg-background p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Cálculo de APs por Número de Usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Total de Usuarios en la Red</label>
              <input
                type="number"
                value={totalUsers}
                onChange={(e) => setTotalUsers(Number.parseFloat(e.target.value) || 100)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Número total de usuarios conectados</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Usuarios por AP (Capacidad)</label>
              <input
                type="number"
                value={usersPerAp}
                onChange={(e) => setUsersPerAp(Number.parseFloat(e.target.value) || 20)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Típico: 15-30 usuarios activos por AP</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-background/50 border border-chart-2/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">APs Requeridos por Usuarios</p>
              <p className="text-4xl font-bold text-chart-2">{apsUsers}</p>
              <p className="text-xs text-muted-foreground mt-3">Capacidad total: {apsUsers * usersPerAp} usuarios</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 3: APs por Densidad */}
      <Card className="bg-background p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Cálculo de APs por Densidad de Zona</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Área de Zona (m²)</label>
              <input
                type="number"
                value={areaDensity}
                onChange={(e) => setAreaDensity(Number.parseFloat(e.target.value) || 1000)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Área total a cubrir</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Densidad de APs (por 10,000 m²)</label>
              <input
                type="number"
                value={apPer10k}
                onChange={(e) => setApPer10k(Number.parseFloat(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                step="0.1"
                min="0.1"
              />
              <p className="text-xs text-muted-foreground mt-1">Ej: 1 AP/10,000 m² (zona rural)</p>
            </div>
          </div>

          <div className="flex items-center justify-center p-6 bg-background/50 border border-chart-2/30 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">APs Requeridos por Densidad</p>
              <p className="text-4xl font-bold text-chart-2">{apsDensity}</p>
              <p className="text-xs text-muted-foreground mt-3">Densidad: {apPer10k} APs/10,000 m²</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Section 4: Dispositivos y Bitrate */}
      <Card className="bg-background p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Cálculo de Dispositivos Activos y Bitrate</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">
                Dispositivos Activos Simultáneamente
              </label>
              <input
                type="number"
                value={activeDevices}
                onChange={(e) => setActiveDevices(Number.parseFloat(e.target.value) || 80)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="0"
              />
              <p className="text-xs text-muted-foreground mt-1">Ej: 80 de 100 usuarios activos</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Datos por Dispositivo (bytes)</label>
              <input
                type="number"
                value={dataPerDevice}
                onChange={(e) => setDataPerDevice(Number.parseFloat(e.target.value) || 102400)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Ej: 100 KB = 102,400 bytes</p>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Ventana de Tiempo (segundos)</label>
              <input
                type="number"
                value={timeWindow}
                onChange={(e) => setTimeWindow(Number.parseFloat(e.target.value) || 3600)}
                className="w-full px-3 py-2 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-chart-2"
                min="1"
              />
              <p className="text-xs text-muted-foreground mt-1">Típico: 3600 segundos (1 hora)</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-background/50 border border-chart-1/30">
              <p className="text-sm text-muted-foreground mb-2">Bitrate Promedio</p>
              <p className="text-3xl font-bold text-chart-1">
                {(bitrate / 1000000).toFixed(2)} <span className="text-sm">Mbps</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">{(bitrate / 1000).toFixed(0)} Kbps</p>
            </div>

            <div className="p-4 rounded-lg bg-background/50 border border-chart-3/30">
              <p className="text-sm text-muted-foreground mb-2">Ancho de Banda Requerido</p>
              <p className="text-3xl font-bold text-chart-3">
                {(bandwidth / 1000000).toFixed(2)} <span className="text-sm">Mbps</span>
              </p>
              <p className="text-xs text-muted-foreground mt-1">+30% de overhead</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Comparison Section */}
      <Card className="bg-background p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Comparativa de Resultados</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 rounded-lg bg-chart-1/10 border border-chart-1/50">
            <p className="text-sm text-muted-foreground mb-2">APs por Cobertura</p>
            <p className="text-3xl font-bold text-chart-1">{apsCoverage}</p>
          </div>
          <div className="p-4 rounded-lg bg-chart-2/10 border border-chart-2/50">
            <p className="text-sm text-muted-foreground mb-2">APs por Usuarios</p>
            <p className="text-3xl font-bold text-chart-2">{apsUsers}</p>
          </div>
          <div className="p-4 rounded-lg bg-chart-3/10 border border-chart-3/50">
            <p className="text-sm text-muted-foreground mb-2">APs por Densidad</p>
            <p className="text-3xl font-bold text-chart-3">{apsDensity}</p>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <p className="text-sm text-foreground">
            <strong>APs Recomendados (valor máximo):</strong>
          </p>
          <p className="text-3xl font-bold text-blue-400 mt-2">{recommendedAps} APs</p>
          <p className="text-xs text-muted-foreground mt-2">
            Se utiliza el mayor valor entre los tres métodos para garantizar cobertura total
          </p>
        </div>
      </Card>

      {/* Summary Table */}
      <Card className="bg-background p-6 border-border">
        <h2 className="text-xl font-bold text-foreground mb-6">Resumen de Parámetros de Red</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <tbody>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-medium text-foreground">Dispositivos Activos:</td>
                <td className="py-3 px-4 text-muted-foreground font-semibold">{activeDevices} dispositivos</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-medium text-foreground">Datos por Dispositivo:</td>
                <td className="py-3 px-4 text-muted-foreground font-semibold">
                  {(dataPerDevice / 1024).toFixed(1)} KB
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-medium text-foreground">Total de Datos:</td>
                <td className="py-3 px-4 text-muted-foreground font-semibold">
                  {((activeDevices * dataPerDevice) / (1024 * 1024)).toFixed(2)} MB
                </td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-medium text-foreground">Bitrate Promedio:</td>
                <td className="py-3 px-4 font-semibold text-chart-1">{(bitrate / 1000000).toFixed(2)} Mbps</td>
              </tr>
              <tr className="border-b border-border/50">
                <td className="py-3 px-4 font-medium text-foreground">Ancho de Banda Requerido:</td>
                <td className="py-3 px-4 font-semibold text-chart-2">{(bandwidth / 1000000).toFixed(2)} Mbps</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium text-foreground">APs Recomendados:</td>
                <td className="py-3 px-4 font-semibold text-chart-3">{recommendedAps} APs</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* Educational Notes */}
      <Card className="bg-green-500/10 p-6 border border-green-500/30">
        <h3 className="text-lg font-semibold text-green-400 mb-3">Notas Educativas</h3>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li>
            <strong className="text-foreground">Cobertura:</strong> Área de cada AP = π × r². Total = Área / Área por AP
          </li>
          <li>
            <strong className="text-foreground">Usuarios:</strong> Cada AP soporta un número máximo de usuarios
            simultáneos
          </li>
          <li>
            <strong className="text-foreground">Densidad:</strong> Aplica un factor según el tipo de zona (urbana,
            rural, etc.)
          </li>
          <li>
            <strong className="text-foreground">Bitrate:</strong> (Dispositivos × Datos × 8 bits) / Tiempo = bps
          </li>
          <li>
            <strong className="text-foreground">Ancho de Banda:</strong> Se agrega 30% de overhead por protocolos,
            retransmisiones y control
          </li>
        </ul>
      </Card>
    </div>
  )
}
