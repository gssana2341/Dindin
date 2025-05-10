"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bed, Bath, Building, ChevronDown, Filter, Home, MapPin, Search, Square } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import PropertyMap from "@/components/property-map"

// ข้อมูลตัวอย่างอสังหาริมทรัพย์
const sampleProperties = [
  {
    id: "1",
    title: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
    description: "บ้านเดี่ยว 2 ชั้น ในโครงการ The Garden พื้นที่ใช้สอย 180 ตร.ม. บนที่ดิน 60 ตร.วา ตกแต่งสวยงาม พร้อมเฟอร์นิเจอร์",
    price: 5500000,
    location: "ถนนเกษตร-นวมินทร์, กรุงเทพมหานคร",
    type: "บ้านเดี่ยว",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    landArea: 60,
    parkings: 2,
    listingType: "sale",
    latitude: 13.8361,
    longitude: 100.5722,
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    featured: true,
  },
  {
    id: "2",
    title: "คอนโดมิเนียม ใกล้ BTS อโศก",
    description: "คอนโดมิเนียมหรู ใกล้ BTS อโศก เพียง 300 เมตร พื้นที่ 45 ตร.ม. ชั้น 15 วิวสวย เฟอร์นิเจอร์ครบ พร้อมเข้าอยู่",
    price: 3800000,
    location: "อโศก, กรุงเทพมหานคร",
    type: "คอนโดมิเนียม",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    parkings: 1,
    listingType: "sale",
    latitude: 13.738,
    longitude: 100.5608,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  {
    id: "3",
    title: "ทาวน์โฮม 3 ชั้น โครงการ City Home",
    description: "ทาวน์โฮม 3 ชั้น โครงการ City Home พื้นที่ใช้สอย 150 ตร.ม. ตกแต่งใหม่ทั้งหลัง ใกล้ห้างสรรพสินค้า",
    price: 4500000,
    location: "บางนา, กรุงเทพมหานคร",
    type: "ทาวน์โฮม",
    bedrooms: 3,
    bathrooms: 3,
    area: 150,
    landArea: 20,
    parkings: 2,
    listingType: "sale",
    latitude: 13.6688,
    longitude: 100.6043,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  {
    id: "4",
    title: "บ้านเดี่ยว โครงการ Lake View",
    description: "บ้านเดี่ยวริมทะเลสาบ โครงการ Lake View พื้นที่ใช้สอย 220 ตร.ม. บนที่ดิน 100 ตร.วา วิวทะเลสาบ บรรยากาศร่มรื่น",
    price: 7800000,
    location: "รังสิต, ปทุมธานี",
    type: "บ้านเดี่ยว",
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    landArea: 100,
    parkings: 2,
    listingType: "sale",
    latitude: 13.9888,
    longitude: 100.6153,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    featured: true,
  },
  {
    id: "5",
    title: "คอนโดมิเนียม ริมแม่น้ำเจ้าพระยา",
    description: "คอนโดมิเนียมหรูริมแม่น้ำเจ้าพระยา พื้นที่ 85 ตร.ม. ชั้น 30 วิวแม่น้ำ เฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าครบ",
    price: 12500000,
    location: "เจริญนคร, กรุงเทพมหานคร",
    type: "คอนโดมิเนียม",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parkings: 1,
    listingType: "sale",
    latitude: 13.7262,
    longitude: 100.4958,
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  {
    id: "6",
    title: "ทาวน์โฮม 3 ชั้น ใกล้รถไฟฟ้า",
    description: "ทาวน์โฮม 3 ชั้น ใกล้รถไฟฟ้า MRT ลาดพร้าว เพียง 500 เมตร พื้นที่ใช้สอย 180 ตร.ม. ตกแต่งสวย พร้อมเข้าอยู่",
    price: 5500000,
    location: "ลาดพร้าว, กรุงเทพมหานคร",
    type: "ทาวน์โฮม",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    landArea: 20,
    parkings: 2,
    listingType: "rent",
    rentalPrice: 25000,
    latitude: 13.8156,
    longitude: 100.5614,
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  {
    id: "7",
    title: "คอนโดมิเนียม ใกล้ MRT พระราม 9",
    description: "คอนโดมิเนียมใกล้ MRT พระราม 9 เพียง 300 เมตร พื้นที่ 35 ตร.ม. ชั้น 10 เฟอร์นิเจอร์ครบ พร้อมเข้าอยู่",
    price: 3900000,
    location: "พระราม 9, กรุงเทพมหานคร",
    type: "คอนโดมิเนียม",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    parkings: 1,
    listingType: "rent",
    rentalPrice: 15000,
    latitude: 13.7532,
    longitude: 100.5645,
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
  {
    id: "8",
    title: "บ้านเดี่ยว 2 ชั้น",
    description: "บ้านเดี่ยว 2 ชั้น พื้นที่ใช้สอย 200 ตร.ม. บนที่ดิน 80 ตร.วา ตกแต่งสวยงาม เฟอร์นิเจอร์บิลท์อิน",
    price: 7200000,
    location: "บางบัวทอง, นนทบุรี",
    type: "บ้านเดี่ยว",
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    landArea: 80,
    parkings: 2,
    listingType: "sale",
    latitude: 13.9175,
    longitude: 100.423,
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
  },
]

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    propertyType: [] as string[],
    listingType: "all",
    priceRange: [0, 15000000] as [number, number],
    bedrooms: "any",
    bathrooms: "any",
    minArea: 0,
    maxArea: 500,
  })
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid")
  const [filteredProperties, setFilteredProperties] = useState(sampleProperties)

  // ประเภทอสังหาริมทรัพย์
  const propertyTypes = [
    { id: "house", label: "บ้านเดี่ยว", icon: <Home className="h-4 w-4" /> },
    { id: "townhouse", label: "ทาวน์โฮม", icon: <Home className="h-4 w-4" /> },
    { id: "condo", label: "คอนโดมิเนียม", icon: <Building className="h-4 w-4" /> },
    { id: "land", label: "ที่ดิน", icon: <Square className="h-4 w-4" /> },
  ]

  // กรองอสังหาริมทรัพย์ตามเงื่อนไข
  useEffect(() => {
    let results = sampleProperties

    // กรองตามคำค้นหา
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      results = results.filter(
        (property) =>
          property.title.toLowerCase().includes(term) ||
          property.location.toLowerCase().includes(term) ||
          property.description.toLowerCase().includes(term),
      )
    }

    // กรองตามประเภทอสังหาริมทรัพย์
    if (filters.propertyType.length > 0) {
      results = results.filter((property) => {
        if (filters.propertyType.includes("house") && property.type === "บ้านเดี่ยว") return true
        if (filters.propertyType.includes("townhouse") && property.type === "ทาวน์โฮม") return true
        if (filters.propertyType.includes("condo") && property.type === "คอนโดมิเนียม") return true
        if (filters.propertyType.includes("land") && property.type === "ที่ดิน") return true
        return false
      })
    }

    // กรองตามประเภทการขาย/เช่า
    if (filters.listingType !== "all") {
      results = results.filter((property) => property.listingType === filters.listingType)
    }

    // กรองตามช่วงราคา
    results = results.filter(
      (property) => property.price >= filters.priceRange[0] && property.price <= filters.priceRange[1],
    )

    // กรองตามจำนวนห้องนอน
    if (filters.bedrooms !== "any") {
      const bedroomCount = Number.parseInt(filters.bedrooms)
      if (filters.bedrooms === "4+") {
        results = results.filter((property) => property.bedrooms >= 4)
      } else {
        results = results.filter((property) => property.bedrooms === bedroomCount)
      }
    }

    // กรองตามจำนวนห้องน้ำ
    if (filters.bathrooms !== "any") {
      const bathroomCount = Number.parseInt(filters.bathrooms)
      if (filters.bathrooms === "3+") {
        results = results.filter((property) => property.bathrooms >= 3)
      } else {
        results = results.filter((property) => property.bathrooms === bathroomCount)
      }
    }

    // กรองตามพื้นที่
    results = results.filter((property) => property.area >= filters.minArea && property.area <= filters.maxArea)

    setFilteredProperties(results)
  }, [searchTerm, filters])

  // เปลี่ยนประเภทอสังหาริมทรัพย์
  const togglePropertyType = (type: string) => {
    setFilters((prev) => {
      const currentTypes = [...prev.propertyType]
      if (currentTypes.includes(type)) {
        return { ...prev, propertyType: currentTypes.filter((t) => t !== type) }
      } else {
        return { ...prev, propertyType: [...currentTypes, type] }
      }
    })
  }

  // รีเซ็ตตัวกรอง
  const resetFilters = () => {
    setFilters({
      propertyType: [],
      listingType: "all",
      priceRange: [0, 15000000],
      bedrooms: "any",
      bathrooms: "any",
      minArea: 0,
      maxArea: 500,
    })
    setSearchTerm("")
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">ค้นหาอสังหาริมทรัพย์</h1>

      {/* ช่องค้นหาและตัวกรอง */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="ค้นหาตามชื่อ, ที่ตั้ง..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9"
          />
        </div>

        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                ตัวกรอง
                {(filters.propertyType.length > 0 ||
                  filters.listingType !== "all" ||
                  filters.bedrooms !== "any" ||
                  filters.bathrooms !== "any" ||
                  filters.minArea > 0 ||
                  filters.maxArea < 500) && (
                  <Badge className="ml-1 bg-teal-500">
                    {filters.propertyType.length +
                      (filters.listingType !== "all" ? 1 : 0) +
                      (filters.bedrooms !== "any" ? 1 : 0) +
                      (filters.bathrooms !== "any" ? 1 : 0) +
                      (filters.minArea > 0 || filters.maxArea < 500 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>ตัวกรองการค้นหา</SheetTitle>
                <SheetDescription>กำหนดเงื่อนไขเพื่อค้นหาอสังหาริมทรัพย์ที่ตรงกับความต้องการของคุณ</SheetDescription>
              </SheetHeader>

              <div className="mt-6 space-y-6">
                {/* ประเภทการขาย/เช่า */}
                <div>
                  <h3 className="text-sm font-medium mb-3">ประเภทการขาย/เช่า</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      variant={filters.listingType === "all" ? "default" : "outline"}
                      className={filters.listingType === "all" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => setFilters({ ...filters, listingType: "all" })}
                    >
                      ทั้งหมด
                    </Button>
                    <Button
                      variant={filters.listingType === "sale" ? "default" : "outline"}
                      className={filters.listingType === "sale" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => setFilters({ ...filters, listingType: "sale" })}
                    >
                      ขาย
                    </Button>
                    <Button
                      variant={filters.listingType === "rent" ? "default" : "outline"}
                      className={filters.listingType === "rent" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => setFilters({ ...filters, listingType: "rent" })}
                    >
                      เช่า
                    </Button>
                  </div>
                </div>

                {/* ประเภทอสังหาริมทรัพย์ */}
                <div>
                  <h3 className="text-sm font-medium mb-3">ประเภทอสังหาริมทรัพย์</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {propertyTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={filters.propertyType.includes(type.id) ? "default" : "outline"}
                        className={filters.propertyType.includes(type.id) ? "bg-teal-600 hover:bg-teal-700" : ""}
                        onClick={() => togglePropertyType(type.id)}
                      >
                        <div className="flex items-center">
                          {type.icon}
                          <span className="ml-2">{type.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* ช่วงราคา */}
                <Accordion type="single" collapsible defaultValue="price">
                  <AccordionItem value="price">
                    <AccordionTrigger>ช่วงราคา</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>฿{filters.priceRange[0].toLocaleString()}</span>
                          <span>฿{filters.priceRange[1].toLocaleString()}</span>
                        </div>
                        <Slider
                          value={[filters.priceRange[0], filters.priceRange[1]]}
                          min={0}
                          max={15000000}
                          step={100000}
                          onValueChange={(value) => setFilters({ ...filters, priceRange: value as [number, number] })}
                          className="mt-2"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                {/* จำนวนห้องนอน */}
                <div>
                  <h3 className="text-sm font-medium mb-3">จำนวนห้องนอน</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <Button
                      variant={filters.bedrooms === "any" ? "default" : "outline"}
                      className={filters.bedrooms === "any" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => setFilters({ ...filters, bedrooms: "any" })}
                    >
                      ทั้งหมด
                    </Button>
                    {["1", "2", "3", "4+"].map((count) => (
                      <Button
                        key={count}
                        variant={filters.bedrooms === count ? "default" : "outline"}
                        className={filters.bedrooms === count ? "bg-teal-600 hover:bg-teal-700" : ""}
                        onClick={() => setFilters({ ...filters, bedrooms: count })}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* จำนวนห้องน้ำ */}
                <div>
                  <h3 className="text-sm font-medium mb-3">จำนวนห้องน้ำ</h3>
                  <div className="grid grid-cols-5 gap-2">
                    <Button
                      variant={filters.bathrooms === "any" ? "default" : "outline"}
                      className={filters.bathrooms === "any" ? "bg-teal-600 hover:bg-teal-700" : ""}
                      onClick={() => setFilters({ ...filters, bathrooms: "any" })}
                    >
                      ทั้งหมด
                    </Button>
                    {["1", "2", "3+"].map((count) => (
                      <Button
                        key={count}
                        variant={filters.bathrooms === count ? "default" : "outline"}
                        className={filters.bathrooms === count ? "bg-teal-600 hover:bg-teal-700" : ""}
                        onClick={() => setFilters({ ...filters, bathrooms: count })}
                      >
                        {count}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* พื้นที่ใช้สอย */}
                <Accordion type="single" collapsible>
                  <AccordionItem value="area">
                    <AccordionTrigger>พื้นที่ใช้สอย (ตร.ม.)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span>{filters.minArea} ตร.ม.</span>
                          <span>{filters.maxArea} ตร.ม.</span>
                        </div>
                        <Slider
                          value={[filters.minArea, filters.maxArea]}
                          min={0}
                          max={500}
                          step={10}
                          onValueChange={(value) =>
                            setFilters({
                              ...filters,
                              minArea: value[0],
                              maxArea: value[1],
                            })
                          }
                          className="mt-2"
                        />
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="flex justify-between pt-4">
                  <Button variant="outline" onClick={resetFilters}>
                    รีเซ็ตตัวกรอง
                  </Button>
                  <Button className="bg-teal-600 hover:bg-teal-700">ดูผลลัพธ์ ({filteredProperties.length})</Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              className={viewMode === "grid" ? "bg-teal-600 hover:bg-teal-700 rounded-r-none" : "rounded-r-none"}
              onClick={() => setViewMode("grid")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </Button>
            <Button
              variant={viewMode === "map" ? "default" : "ghost"}
              className={viewMode === "map" ? "bg-teal-600 hover:bg-teal-700 rounded-l-none" : "rounded-l-none"}
              onClick={() => setViewMode("map")}
            >
              <MapPin className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* จำนวนผลลัพธ์และการเรียงลำดับ */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <p className="text-gray-600 mb-4 md:mb-0">พบ {filteredProperties.length} รายการ</p>
        <div className="flex items-center">
          <span className="mr-2 text-sm">เรียงตาม:</span>
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="เรียงตาม" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">ล่าสุด</SelectItem>
              <SelectItem value="price-low">ราคาต่ำ-สูง</SelectItem>
              <SelectItem value="price-high">ราคาสูง-ต่ำ</SelectItem>
              <SelectItem value="area-low">พื้นที่น้อย-มาก</SelectItem>
              <SelectItem value="area-high">พื้นที่มาก-น้อย</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* แสดงผลลัพธ์ */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.images[0] || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {property.featured && <Badge className="absolute top-2 left-2 bg-teal-600">แนะนำ</Badge>}
                  <Badge className="absolute top-2 right-2 bg-cyan-600">
                    {property.listingType === "sale" ? "ขาย" : "เช่า"}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1" /> {property.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-teal-700 mb-2">
                    ฿{property.price.toLocaleString("th-TH")}
                    {property.listingType === "rent" && property.rentalPrice && " / เดือน"}
                  </p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" /> {property.bedrooms}
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" /> {property.bathrooms}
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" /> {property.area} ตร.ม.
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href={`/properties/${property.id}`}>ดูรายละเอียด</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-10">
              <Building className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold mb-2">ไม่พบอสังหาริมทรัพย์</h3>
              <p className="text-gray-600 mb-4">ไม่พบอสังหาริมทรัพย์ที่ตรงกับเงื่อนไขการค้นหาของคุณ</p>
              <Button variant="outline" onClick={resetFilters}>
                รีเซ็ตตัวกรอง
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="h-[600px] relative">
          <PropertyMap />
          <div className="absolute bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg max-h-[300px] overflow-y-auto">
            <h3 className="font-semibold mb-2">อสังหาริมทรัพย์ในพื้นที่นี้ ({filteredProperties.length})</h3>
            <div className="space-y-2">
              {filteredProperties.slice(0, 3).map((property) => (
                <div key={property.id} className="flex gap-3 p-2 hover:bg-gray-50 rounded-md">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <Image
                      src={property.images[0] || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{property.title}</h4>
                    <p className="text-teal-700 font-semibold text-sm">฿{property.price.toLocaleString("th-TH")}</p>
                    <div className="flex text-xs text-gray-600">
                      <span className="flex items-center mr-2">
                        <Bed className="h-3 w-3 mr-1" /> {property.bedrooms}
                      </span>
                      <span className="flex items-center mr-2">
                        <Bath className="h-3 w-3 mr-1" /> {property.bathrooms}
                      </span>
                      <span className="flex items-center">
                        <Square className="h-3 w-3 mr-1" /> {property.area} ตร.ม.
                      </span>
                    </div>
                  </div>
                  <Button size="sm" asChild className="bg-teal-600 hover:bg-teal-700">
                    <Link href={`/properties/${property.id}`}>ดู</Link>
                  </Button>
                </div>
              ))}
              {filteredProperties.length > 3 && (
                <Button variant="outline" className="w-full text-sm" asChild>
                  <Link href="#" className="flex items-center justify-center">
                    ดูทั้งหมด <ChevronDown className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
