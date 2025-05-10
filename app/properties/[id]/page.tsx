"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bath, Bed, Car, ChevronLeft, Heart, MapPin, Share2, Square } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import PropertyMap from "@/components/property-map"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog"
import { User } from "lucide-react"

// ข้อมูลตัวอย่างอสังหาริมทรัพย์
const sampleProperties = [
  {
    id: "1",
    title: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
    description:
      "บ้านเดี่ยว 2 ชั้น ในโครงการ The Garden พื้นที่ใช้สอย 180 ตร.ม. บนที่ดิน 60 ตร.วา ตกแต่งสวยงาม พร้อมเฟอร์นิเจอร์ ใกล้ห้างสรรพสินค้า โรงเรียน และโรงพยาบาล\n\nรายละเอียดเพิ่มเติม:\n- บ้านสร้างใหม่ สภาพดีมาก\n- ตกแต่งในสไตล์โมเดิร์น\n- ห้องนอนใหญ่พร้อมห้องน้ำในตัว\n- ห้องครัวแยกเป็นสัดส่วน\n- พื้นที่ใช้สอยกว้างขวาง\n- ที่จอดรถ 2 คัน\n- ระบบรักษาความปลอดภัย 24 ชั่วโมง\n- สวนสวยร่มรื่น\n\nทำเลดีมาก:\n- ใกล้ทางด่วน\n- ใกล้ห้างสรรพสินค้า\n- ใกล้โรงเรียนนานาชาติ\n- ใกล้โรงพยาบาล\n- การเดินทางสะดวก",
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
    amenities: ["เครื่องปรับอากาศ", "เฟอร์นิเจอร์", "เครื่องทำน้ำอุ่น", "อินเทอร์เน็ต", "ระบบรักษาความปลอดภัย"],
    projectAmenities: ["สระว่ายน้ำ", "ฟิตเนส", "สวนสาธารณะ", "รปภ. 24 ชม.", "กล้องวงจรปิด"],
    agent: {
      name: "คุณสมชาย ใจดี",
      company: "บริษัท อสังหาฯ จำกัด",
      phone: "081-234-5678",
      email: "somchai@example.com",
    },
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    featured: true,
    nearbyPlaces: [
      { name: "เซ็นทรัล อีสต์วิลล์", distance: "1.5 กม.", type: "ห้างสรรพสินค้า" },
      { name: "โรงเรียนนานาชาติเกษมพิทยา", distance: "2 กม.", type: "โรงเรียน" },
      { name: "โรงพยาบาลสินแพทย์", distance: "3 กม.", type: "โรงพยาบาล" },
      { name: "สวนสาธารณะเกษตร-นวมินทร์", distance: "1 กม.", type: "สวนสาธารณะ" },
    ],
    condition: "ใหม่",
    yearBuilt: 2023,
  },
  {
    id: "2",
    title: "คอนโดมิเนียม ใกล้ BTS อโศก",
    description:
      "คอนโดมิเนียมหรู ใกล้ BTS อโศก เพียง 300 เมตร พื้นที่ 45 ตร.ม. ชั้น 15 วิวสวย เฟอร์นิเจอร์ครบ พร้อมเข้าอยู่\n\nรายละเอียดเพิ่มเติม:\n- ห้องแบบ 1 ห้องนอน 1 ห้องน้ำ\n- ตกแต่งสไตล์มินิมอล\n- เฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าครบชุด\n- วิวเมืองสวยงาม\n- ระเบียงกว้าง\n- ชั้น 15 วิวไม่บล็อก\n\nสิ่งอำนวยความสะดวกในโครงการ:\n- สระว่ายน้ำระบบเกลือ\n- ฟิตเนสพร้อมอุปกรณ์ครบครัน\n- สวนพักผ่อนบนชั้นดาดฟ้า\n- ล็อบบี้หรู\n- ระบบรักษาความปลอดภัย 24 ชั่วโมง\n- ที่จอดรถ\n\nทำเลดีเยี่ยม:\n- ใกล้ BTS อโศก เพียง 300 เมตร\n- ใกล้ Terminal 21\n- ใกล้ซอยทองหล่อ\n- การเดินทางสะดวกสบาย",
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
    amenities: ["เครื่องปรับอากาศ", "เฟอร์นิเจอร์", "เครื่องทำน้ำอุ่น", "อินเทอร์เน็ต", "ทีวี", "ตู้เย็น", "เครื่องซักผ้า"],
    projectAmenities: ["สระว่ายน้ำ", "ฟิตเนส", "สวนพักผ่อน", "ล็อบบี้", "รปภ. 24 ชม.", "กล้องวงจรปิด", "ที่จอดรถ"],
    agent: {
      name: "คุณสมหญิง รักดี",
      company: "บริษัท บ้านดี จำกัด",
      phone: "089-876-5432",
      email: "somying@example.com",
    },
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    nearbyPlaces: [
      { name: "BTS อโศก", distance: "300 ม.", type: "รถไฟฟ้า" },
      { name: "Terminal 21", distance: "500 ม.", type: "ห้างสรรพสินค้า" },
      { name: "ซอยทองหล่อ", distance: "1 กม.", type: "แหล่งบันเทิง" },
      { name: "โรงพยาบาลบำรุงราษฎร์", distance: "1.5 กม.", type: "โรงพยาบาล" },
    ],
    condition: "ดีมาก",
    yearBuilt: 2018,
  },
]

export default function PropertyDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false)

  // ค้นหาข้อมูลอสังหาริมทรัพย์จาก ID
  const property = sampleProperties.find((p) => p.id === params.id) || sampleProperties[0]

  const handleViewingRequest = () => {
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถนัดชมทรัพย์สินได้",
        variant: "destructive",
      })
      return
    }

    if (!date) {
      toast({
        title: "กรุณาเลือกวันที่",
        description: "กรุณาเลือกวันที่ที่ต้องการนัดชมทรัพย์สิน",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "ส่งคำขอนัดชมทรัพย์สินสำเร็จ",
        description: `นัดชมทรัพย์สินในวันที่ ${date?.toLocaleDateString("th-TH")}`,
      })
    }, 1500)
  }

  const handleQuoteRequest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถขอใบเสนอราคาได้",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "ส่งคำขอใบเสนอราคาสำเร็จ",
        description: "นายหน้าจะติดต่อกลับโดยเร็วที่สุด",
      })
    }, 1500)
  }

  const toggleFavorite = () => {
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถเพิ่มในรายการโปรดได้",
        variant: "destructive",
      })
      return
    }

    setIsFavorite(!isFavorite)
    toast({
      title: isFavorite ? "ลบออกจากรายการโปรด" : "เพิ่มในรายการโปรด",
      description: isFavorite ? "ลบออกจากรายการโปรดเรียบร้อยแล้ว" : "เพิ่มในรายการโปรดเรียบร้อยแล้ว",
    })
  }

  const handleShareProperty = () => {
    if (navigator.share) {
      navigator.share({
        title: property.title,
        text: `ดูรายละเอียด ${property.title} ที่ DInDIn`,
        url: window.location.href,
      })
    } else {
      // คัดลอกลิงก์ไปยังคลิปบอร์ด
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "คัดลอกลิงก์แล้ว",
        description: "ลิงก์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว",
      })
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/properties">
            <ChevronLeft className="h-4 w-4 mr-2" /> กลับไปยังรายการอสังหาริมทรัพย์
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* รูปภาพอสังหาริมทรัพย์ */}
          <div className="mb-6">
            <div className="grid grid-cols-1 gap-4">
              <div className="relative h-[400px] cursor-pointer" onClick={() => setIsImageDialogOpen(true)}>
                <Image
                  src={property.images[activeImageIndex] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover rounded-lg"
                />
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {activeImageIndex + 1} / {property.images.length}
                </div>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-24 h-24 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${
                      activeImageIndex === index ? "ring-2 ring-teal-500" : ""
                    }`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${property.title} - รูปที่ ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ไดอะล็อกแสดงรูปภาพขนาดใหญ่ */}
          <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
            <DialogContent className="max-w-4xl p-0 bg-black/90">
              <DialogHeader className="absolute top-2 right-2 z-10">
                <Button variant="ghost" size="icon" className="text-white" onClick={() => setIsImageDialogOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </Button>
              </DialogHeader>
              <Carousel className="w-full">
                <CarouselContent>
                  {property.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="flex items-center justify-center h-[80vh]">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${property.title} - รูปที่ ${index + 1}`}
                          width={1200}
                          height={800}
                          className="max-h-full object-contain"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>
            </DialogContent>
          </Dialog>

          {/* ชื่อและการกระทำ */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-teal-800">{property.title}</h1>
              <div className="flex items-center mt-2 text-gray-600">
                <MapPin className="h-4 w-4 mr-1" />
                <p>{property.location}</p>
              </div>
            </div>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={toggleFavorite}
                className={isFavorite ? "text-red-500" : ""}
              >
                <Heart className="h-5 w-5" fill={isFavorite ? "currentColor" : "none"} />
              </Button>
              <Button variant="outline" size="icon" onClick={handleShareProperty}>
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* ราคา */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-teal-700">฿{property.price.toLocaleString("th-TH")}</h2>
            {property.listingType === "rent" && property.rentalPrice && (
              <p className="text-gray-600">ค่าเช่า: ฿{property.rentalPrice.toLocaleString("th-TH")} / เดือน</p>
            )}
          </div>

          {/* รายละเอียดอสังหาริมทรัพย์ */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>รายละเอียดทรัพย์สิน</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-teal-50 rounded-lg">
                  <Bed className="h-6 w-6 text-teal-600 mb-2" />
                  <span className="text-sm text-gray-600">ห้องนอน</span>
                  <span className="font-semibold">{property.bedrooms}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-teal-50 rounded-lg">
                  <Bath className="h-6 w-6 text-teal-600 mb-2" />
                  <span className="text-sm text-gray-600">ห้องน้ำ</span>
                  <span className="font-semibold">{property.bathrooms}</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-teal-50 rounded-lg">
                  <Square className="h-6 w-6 text-teal-600 mb-2" />
                  <span className="text-sm text-gray-600">พื้นที่ใช้สอย</span>
                  <span className="font-semibold">{property.area} ตร.ม.</span>
                </div>
                <div className="flex flex-col items-center p-3 bg-teal-50 rounded-lg">
                  <Car className="h-6 w-6 text-teal-600 mb-2" />
                  <span className="text-sm text-gray-600">ที่จอดรถ</span>
                  <span className="font-semibold">{property.parkings}</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">รายละเอียด</h3>
                <div className="whitespace-pre-line text-gray-700">{property.description}</div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">ข้อมูลเพิ่มเติม</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-600">ประเภท</p>
                    <p className="font-medium">{property.type}</p>
                  </div>
                  {property.landArea && (
                    <div>
                      <p className="text-gray-600">พื้นที่ดิน</p>
                      <p className="font-medium">{property.landArea} ตร.วา</p>
                    </div>
                  )}
                  {property.condition && (
                    <div>
                      <p className="text-gray-600">สภาพ</p>
                      <p className="font-medium">{property.condition}</p>
                    </div>
                  )}
                  {property.yearBuilt && (
                    <div>
                      <p className="text-gray-600">ปีที่สร้าง</p>
                      <p className="font-medium">{property.yearBuilt}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">สิ่งอำนวยความสะดวก</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {property.projectAmenities && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">สิ่งอำนวยความสะดวกในโครงการ</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {property.projectAmenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-teal-500 rounded-full mr-2"></div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* สถานที่ใกล้เคียง */}
          {property.nearbyPlaces && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>สถานที่ใกล้เคียง</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.nearbyPlaces.map((place, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                        <MapPin className="h-5 w-5 text-teal-600" />
                      </div>
                      <div>
                        <p className="font-medium">{place.name}</p>
                        <p className="text-sm text-gray-600">
                          {place.type} • {place.distance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* แผนที่ */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>ตำแหน่งที่ตั้ง</CardTitle>
            </CardHeader>
            <CardContent>
              <PropertyMap
                latitude={property.latitude}
                longitude={property.longitude}
                address={property.location}
                height="400px"
              />
            </CardContent>
          </Card>
        </div>

        <div>
          {/* ข้อมูลนายหน้า */}
          <Card className="mb-6 sticky top-4">
            <CardHeader>
              <CardTitle>ติดต่อนายหน้า</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                  <User className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-semibold">{property.agent.name}</h3>
                  <p className="text-sm text-gray-600">{property.agent.company}</p>
                </div>
              </div>
              <div className="space-y-4">
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <a href={`tel:${property.agent.phone}`} className="flex items-center justify-center w-full">
                    โทร {property.agent.phone}
                  </a>
                </Button>
                <Button variant="outline" className="w-full">
                  <a href={`mailto:${property.agent.email}`} className="flex items-center justify-center w-full">
                    อีเมล
                  </a>
                </Button>
                <Button variant="outline" className="w-full">
                  <a href="#" className="flex items-center justify-center w-full">
                    แชท
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* การดำเนินการ */}
          <Card>
            <CardHeader>
              <CardTitle>ดำเนินการ</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="viewing">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="viewing">นัดชมทรัพย์สิน</TabsTrigger>
                  <TabsTrigger value="quote">ขอใบเสนอราคา</TabsTrigger>
                </TabsList>
                <TabsContent value="viewing" className="space-y-4 pt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">เลือกวันที่</label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="border rounded-md p-2"
                      disabled={(date) => date < new Date()}
                    />
                  </div>
                  <Button
                    className="w-full bg-teal-600 hover:bg-teal-700"
                    disabled={!date || isLoading}
                    onClick={handleViewingRequest}
                  >
                    {isLoading ? "กำลังส่งคำขอ..." : "นัดชมทรัพย์สิน"}
                  </Button>
                </TabsContent>
                <TabsContent value="quote" className="space-y-4 pt-4">
                  <form onSubmit={handleQuoteRequest} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ราคาตั้งต้น (บาท)</label>
                      <Input type="number" value={property.price} disabled />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">ราคาที่เสนอ (บาท)</label>
                      <Input type="number" placeholder="กรอกราคาที่ต้องการเสนอ" required />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">เหตุผลที่เสนอ</label>
                      <Textarea placeholder="กรอกเหตุผลที่เสนอราคานี้" required />
                    </div>
                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                      {isLoading ? "กำลังส่งคำขอ..." : "ขอใบเสนอราคา"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
