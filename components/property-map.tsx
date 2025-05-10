"use client"

import { useEffect, useRef, useState } from "react"
import { MapPin } from "lucide-react"

interface PropertyMapProps {
  latitude?: number
  longitude?: number
  address?: string
  editable?: boolean
  onLocationChange?: (lat: number, lng: number) => void
  height?: string
}

export default function PropertyMap({
  latitude = 13.7563,
  longitude = 100.5018,
  address,
  editable = false,
  onLocationChange,
  height = "300px",
}: PropertyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)

  useEffect(() => {
    // ตรวจสอบว่า Leaflet ถูกโหลดแล้วหรือไม่
    if (!window.L) {
      // โหลด Leaflet CSS
      const linkElement = document.createElement("link")
      linkElement.rel = "stylesheet"
      linkElement.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
      linkElement.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
      linkElement.crossOrigin = ""
      document.head.appendChild(linkElement)

      // โหลด Leaflet JS
      const scriptElement = document.createElement("script")
      scriptElement.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
      scriptElement.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
      scriptElement.crossOrigin = ""
      scriptElement.onload = () => setMapLoaded(true)
      document.head.appendChild(scriptElement)
    } else {
      setMapLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (mapLoaded && mapRef.current && !map) {
      // สร้างแผนที่
      const L = window.L
      const newMap = L.map(mapRef.current).setView([latitude, longitude], 15)

      // เพิ่ม tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(newMap)

      // สร้างไอคอนสำหรับ marker
      const customIcon = L.divIcon({
        html: `<div class="flex items-center justify-center w-8 h-8 bg-teal-500 text-white rounded-full shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>`,
        className: "",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      })

      // เพิ่ม marker
      const newMarker = L.marker([latitude, longitude], { icon: customIcon, draggable: editable }).addTo(newMap)

      // เพิ่ม popup ถ้ามีที่อยู่
      if (address) {
        newMarker.bindPopup(address).openPopup()
      }

      // ถ้าเป็นโหมดแก้ไข ให้สามารถลากเพื่อเปลี่ยนตำแหน่งได้
      if (editable && onLocationChange) {
        newMarker.on("dragend", (e: any) => {
          const position = e.target.getLatLng()
          onLocationChange(position.lat, position.lng)
        })

        // คลิกที่แผนที่เพื่อเปลี่ยนตำแหน่ง marker
        newMap.on("click", (e: any) => {
          newMarker.setLatLng(e.latlng)
          onLocationChange(e.latlng.lat, e.latlng.lng)
        })
      }

      setMap(newMap)
      setMarker(newMarker)
    }

    return () => {
      if (map) {
        map.remove()
      }
    }
  }, [mapLoaded, mapRef, map, latitude, longitude, address, editable, onLocationChange])

  // อัปเดตตำแหน่ง marker เมื่อ latitude หรือ longitude เปลี่ยน
  useEffect(() => {
    if (map && marker && (marker.getLatLng().lat !== latitude || marker.getLatLng().lng !== longitude)) {
      marker.setLatLng([latitude, longitude])
      map.setView([latitude, longitude], map.getZoom())
    }
  }, [map, marker, latitude, longitude])

  return (
    <div className="relative">
      <div ref={mapRef} style={{ height, width: "100%" }} className="rounded-md"></div>
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-md">
          <div className="flex flex-col items-center">
            <MapPin className="h-8 w-8 text-teal-500 animate-bounce" />
            <p className="text-gray-500 mt-2">กำลังโหลดแผนที่...</p>
          </div>
        </div>
      )}
    </div>
  )
}

// เพิ่ม type definition สำหรับ Leaflet
declare global {
  interface Window {
    L: any
  }
}
