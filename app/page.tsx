"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building, Home, MapPin, Search, User, Bed, Bath, Square, ArrowRight, Star } from "lucide-react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

// ข้อมูลตัวอย่างอสังหาริมทรัพย์
const featuredProperties = [
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
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
    featured: true,
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
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
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
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
]

const newProperties = [
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
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3",
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
    listingType: "sale",
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
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
    listingType: "rent",
    rentalPrice: 25000,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
]

const rentalProperties = [
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
    listingType: "rent",
    rentalPrice: 15000,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
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
    listingType: "rent",
    rentalPrice: 25000,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
  {
    id: "9",
    title: "บ้านเดี่ยวพร้อมสวน",
    description: "บ้านเดี่ยวพร้อมสวนขนาดใหญ่ บรรยากาศร่มรื่น เหมาะสำหรับครอบครัว ใกล้โรงเรียนนานาชาติ",
    price: 8500000,
    location: "บางนา, กรุงเทพมหานคร",
    type: "บ้านเดี่ยว",
    bedrooms: 4,
    bathrooms: 3,
    area: 250,
    listingType: "rent",
    rentalPrice: 45000,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
  },
]

// ประเภทอสังหาริมทรัพย์
const propertyTypes = [
  { name: "บ้านเดี่ยว", icon: <Home size={40} /> },
  { name: "ทาวน์โฮม", icon: <Home size={40} /> },
  { name: "คอนโดมิเนียม", icon: <Building size={40} /> },
  { name: "ที่ดิน", icon: <Home size={40} /> },
  { name: "อาคารพาณิชย์", icon: <Building size={40} /> },
  { name: "สำนักงาน", icon: <Building size={40} /> },
  { name: "บ้านพร้อมที่ดิน", icon: <Home size={40} /> },
  { name: "อพาร์ทเมนท์", icon: <Building size={40} /> },
]

// รีวิวจากลูกค้า
const testimonials = [
  {
    id: 1,
    name: "คุณสมศรี มีสุข",
    role: "ลูกค้าซื้อบ้าน",
    content: "ประทับใจมากกับการบริการของ DInDIn ได้บ้านในฝันในราคาที่เหมาะสม นายหน้าให้คำแนะนำดีมาก",
    rating: 5,
  },
  {
    id: 2,
    name: "คุณสมชาย ใจดี",
    role: "ลูกค้าเช่าคอนโด",
    content: "หาคอนโดใกล้ที่ทำงานได้ง่ายมาก เว็บไซต์ใช้งานง่าย มีตัวกรองที่ช่วยให้หาทรัพย์สินที่ต้องการได้รวดเร็ว",
    rating: 4,
  },
  {
    id: 3,
    name: "คุณวิชัย มั่งมี",
    role: "นักลงทุนอสังหาริมทรัพย์",
    content: "เป็นแพลตฟอร์มที่ดีมากสำหรับการลงทุนในอสังหาริมทรัพย์ ข้อมูลครบถ้วน ทำให้ตัดสินใจได้ง่ายขึ้น",
    rating: 5,
  },
]

export default function HomePage() {
  const [searchType, setSearchType] = useState<"buy" | "rent">("buy")
  const [searchLocation, setSearchLocation] = useState("")
  const [searchPropertyType, setSearchPropertyType] = useState("")
  const [searchPrice, setSearchPrice] = useState("")

  // สร้างฟังก์ชันสำหรับการค้นหา
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // ในสถานการณ์จริง จะต้องนำค่าไปค้นหาในฐานข้อมูล
    console.log("ค้นหา:", { searchType, searchLocation, searchPropertyType, searchPrice })
    // นำทางไปยังหน้าค้นหาพร้อมพารามิเตอร์
    window.location.href = `/properties?type=${searchType}&location=${searchLocation}&propertyType=${searchPropertyType}&price=${searchPrice}`
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section ที่ปรับปรุงแล้ว */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="บ้านสวย"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="container relative z-10 mx-auto px-4 py-16 md:py-24 flex justify-center items-center">
          <div className="max-w-3xl text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">ค้นหาบ้านในฝันของคุณกับ DInDIn</h1>
            <p className="text-lg mb-8 text-white/90">แพลตฟอร์มอสังหาริมทรัพย์ที่ช่วยให้คุณค้นหา ซื้อ หรือเช่าบ้านได้อย่างง่ายดาย</p>

            {/* ฟอร์มค้นหา */}
            <Card className="bg-white/95 backdrop-blur-sm text-gray-800 p-4 rounded-lg shadow-lg">
              <CardContent className="p-4">
                <Tabs defaultValue="buy" onValueChange={(value) => setSearchType(value as "buy" | "rent")}>
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="buy" className="text-base">
                      ซื้อ
                    </TabsTrigger>
                    <TabsTrigger value="rent" className="text-base">
                      เช่า
                    </TabsTrigger>
                  </TabsList>

                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">ทำเลที่ตั้ง</label>
                        <Input
                          placeholder="เขต, จังหวัด, โครงการ"
                          value={searchLocation}
                          onChange={(e) => setSearchLocation(e.target.value)}
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">ประเภทอสังหาริมทรัพย์</label>
                        <Select onValueChange={setSearchPropertyType}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภท" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="house">บ้านเดี่ยว</SelectItem>
                            <SelectItem value="townhouse">ทาวน์โฮม</SelectItem>
                            <SelectItem value="condo">คอนโดมิเนียม</SelectItem>
                            <SelectItem value="land">ที่ดิน</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">งบประมาณ</label>
                        <Select onValueChange={setSearchPrice}>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกงบประมาณ" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0-3000000">ไม่เกิน 3 ล้านบาท</SelectItem>
                            <SelectItem value="3000000-5000000">3-5 ล้านบาท</SelectItem>
                            <SelectItem value="5000000-10000000">5-10 ล้านบาท</SelectItem>
                            <SelectItem value="10000000+">10 ล้านบาทขึ้นไป</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="flex items-end">
                        <Button type="submit" className="bg-teal-600 hover:bg-teal-700 h-10 w-full">
                          <Search className="mr-2 h-4 w-4" /> ค้นหา
                        </Button>
                      </div>
                    </div>
                  </form>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* อสังหาริมทรัพย์แนะนำ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">อสังหาริมทรัพย์แนะนำ</h2>
            <Button variant="outline" asChild className="text-teal-600 border-teal-600">
              <Link href="/properties" className="flex items-center">
                ดูทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 md:h-64">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  {property.featured && <Badge className="absolute top-2 left-2 bg-teal-600 text-white">แนะนำ</Badge>}
                  <Badge className="absolute top-2 right-2 bg-cyan-600 text-white">
                    {property.listingType === "sale" ? "ขาย" : "เช่า"}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl line-clamp-1">{property.title}</CardTitle>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-xl font-bold text-teal-700 mb-2">
                    ฿{property.price.toLocaleString("th-TH")}
                    {property.listingType === "rent" && " / เดือน"}
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
                <CardFooter className="pt-0">
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href={`/properties/${property.id}`}>ดูรายละเอียด</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ประเภทอสังหาริมทรัพย์ */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">ประเภทอสังหาริมทรัพย์</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {propertyTypes.slice(0, 8).map((type, index) => (
              <Link key={index} href={`/properties?type=${encodeURIComponent(type.name)}`} className="block">
                <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 text-center hover:shadow-md transition-shadow h-full flex flex-col items-center justify-center">
                  <div className="flex justify-center mb-3 text-teal-600">{type.icon}</div>
                  <h3 className="text-base font-medium mb-1">{type.name}</h3>
                  <span className="text-teal-600 hover:underline text-sm">ดูทั้งหมด</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* อสังหาริมทรัพย์มาใหม่ */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">อสังหาริมทรัพย์มาใหม่</h2>
            <Button variant="outline" asChild className="text-teal-600 border-teal-600">
              <Link href="/properties?sort=newest" className="flex items-center">
                ดูทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {newProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 md:h-64">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-orange-500 text-white">มาใหม่</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl line-clamp-1">{property.title}</CardTitle>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-xl font-bold text-teal-700 mb-2">
                    ฿{property.price.toLocaleString("th-TH")}
                    {property.listingType === "rent" && property.rentalPrice && ` / เดือน`}
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
                <CardFooter className="pt-0">
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href={`/properties/${property.id}`}>ดูรายละเอียด</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* อสังหาริมทรัพย์ให้เช่า */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">อสังหาริมทรัพย์ให้เช่า</h2>
            <Button variant="outline" asChild className="text-teal-600 border-teal-600">
              <Link href="/properties?listingType=rent" className="flex items-center">
                ดูทั้งหมด <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rentalProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative h-56 md:h-64">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <Badge className="absolute top-2 right-2 bg-purple-600 text-white">ให้เช่า</Badge>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl line-clamp-1">{property.title}</CardTitle>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                    <span className="truncate">{property.location}</span>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <p className="text-xl font-bold text-teal-700 mb-2">
                    ฿{property.rentalPrice?.toLocaleString("th-TH")} / เดือน
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
                <CardFooter className="pt-0">
                  <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                    <Link href={`/properties/${property.id}`}>ดูรายละเอียด</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* วิธีการใช้งาน */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">วิธีการใช้งาน DInDIn</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="text-teal-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">ค้นหา</h3>
              <p className="text-gray-600">ค้นหาอสังหาริมทรัพย์ที่ตรงกับความต้องการของคุณด้วยตัวกรองขั้นสูง</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="text-teal-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">ติดต่อ</h3>
              <p className="text-gray-600">ติดต่อกับนายหน้าเพื่อนัดชมหรือขอใบเสนอราคาได้ทันที</p>
            </div>
            <div className="text-center">
              <div className="bg-teal-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="text-teal-600" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">ตกลง</h3>
              <p className="text-gray-600">ตกลงซื้อหรือเช่าอสังหาริมทรัพย์ที่คุณชื่นชอบอย่างมั่นใจ</p>
            </div>
          </div>
        </div>
      </section>

      {/* รีวิวจากลูกค้า */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 text-gray-800">เสียงจากลูกค้า</h2>

          <div className="max-w-5xl mx-auto">
            <Carousel className="w-full">
              <CarouselContent>
                {testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-4">
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="flex mb-4">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-5 w-5 ${
                                  i < testimonial.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-700 mb-4">"{testimonial.content}"</p>
                          <div className="flex items-center">
                            <div className="bg-teal-50 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                              <User className="text-teal-600 h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="font-semibold">{testimonial.name}</h4>
                              <p className="text-sm text-gray-600">{testimonial.role}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-teal-600 to-teal-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">พร้อมที่จะเริ่มต้นกับ DInDIn แล้วหรือยัง?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">ลงทะเบียนวันนี้เพื่อเริ่มต้นค้นหาบ้านในฝันของคุณหรือลงประกาศอสังหาริมทรัพย์</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 text-base">
              <Link href="/auth/register">ลงทะเบียนเป็นผู้ซื้อ</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-teal-600/50 text-base">
              <Link href="/auth/register/agent">ลงทะเบียนเป็นนายหน้า</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
