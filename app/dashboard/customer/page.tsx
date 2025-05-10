"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bed, Bath, Building, Clock, Heart, MapPin, Square, Star, User } from "lucide-react"

export default function CustomerDashboardPage() {
  // Mock data
  const bookings = [
    {
      id: "1",
      propertyId: "101",
      propertyTitle: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
      propertyImage: "/placeholder.svg?height=200&width=300",
      date: "2025-05-15",
      status: "confirmed",
      agentName: "คุณสมชาย ใจดี",
    },
    {
      id: "2",
      propertyId: "102",
      propertyTitle: "คอนโดมิเนียม ใกล้ BTS อโศก",
      propertyImage: "/placeholder.svg?height=200&width=300",
      date: "2025-05-20",
      status: "pending",
      agentName: "คุณสมหญิง รักดี",
    },
  ]

  const quotes = [
    {
      id: "1",
      propertyId: "103",
      propertyTitle: "ทาวน์โฮม 3 ชั้น โครงการ City Home",
      propertyImage: "/placeholder.svg?height=200&width=300",
      originalPrice: 4500000,
      offeredPrice: 4200000,
      status: "accepted",
      agentName: "คุณสมศักดิ์ มั่งมี",
    },
    {
      id: "2",
      propertyId: "104",
      propertyTitle: "บ้านเดี่ยว โครงการ Lake View",
      propertyImage: "/placeholder.svg?height=200&width=300",
      originalPrice: 7800000,
      offeredPrice: 7500000,
      status: "pending",
      agentName: "คุณสมหญิง รักดี",
    },
  ]

  const favorites = [
    {
      id: "105",
      title: "คอนโดมิเนียม ริมแม่น้ำเจ้าพระยา",
      image: "/placeholder.svg?height=200&width=300",
      price: 12500000,
      location: "เจริญนคร, กรุงเทพมหานคร",
      bedrooms: 2,
      bathrooms: 2,
      area: 85,
    },
    {
      id: "106",
      title: "บ้านเดี่ยว โครงการ Green Valley",
      image: "/placeholder.svg?height=200&width=300",
      price: 8900000,
      location: "บางนา, กรุงเทพมหานคร",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
    },
  ]

  const recentlyViewed = [
    {
      id: "107",
      title: "ทาวน์โฮม 3 ชั้น",
      image: "/placeholder.svg?height=200&width=300",
      price: 5500000,
      location: "ลาดพร้าว, กรุงเทพมหานคร",
    },
    {
      id: "108",
      title: "คอนโดมิเนียม ใกล้ MRT พระราม 9",
      image: "/placeholder.svg?height=200&width=300",
      price: 3900000,
      location: "พระราม 9, กรุงเทพมหานคร",
    },
    {
      id: "109",
      title: "บ้านเดี่ยว 2 ชั้น",
      image: "/placeholder.svg?height=200&width=300",
      price: 7200000,
      location: "บางบัวทอง, นนทบุรี",
    },
  ]

  const reviews = [
    {
      id: "1",
      propertyId: "110",
      propertyTitle: "คอนโดมิเนียม The Line",
      rating: 4,
      comment: "ห้องสวย วิวดี การบริการของนายหน้าประทับใจมาก",
      date: "2025-04-10",
    },
    {
      id: "2",
      propertyId: "111",
      propertyTitle: "บ้านเดี่ยว Perfect Place",
      rating: 5,
      comment: "บ้านสวยมาก คุ้มค่ากับราคา นายหน้าให้ข้อมูลครบถ้วน",
      date: "2025-03-25",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-green-500">ยืนยันแล้ว</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">รอการยืนยัน</Badge>
      case "cancelled":
        return <Badge className="bg-red-500">ยกเลิก</Badge>
      case "accepted":
        return <Badge className="bg-green-500">ยอมรับ</Badge>
      case "rejected":
        return <Badge className="bg-red-500">ปฏิเสธ</Badge>
      default:
        return <Badge className="bg-gray-500">ไม่ระบุ</Badge>
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-cyan-800">แดชบอร์ดลูกค้า</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">การนัดชมทรัพย์สิน</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{bookings.length}</div>
            <p className="text-xs text-muted-foreground">
              {bookings.filter((b) => b.status === "confirmed").length} ยืนยันแล้ว
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ใบเสนอราคา</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quotes.length}</div>
            <p className="text-xs text-muted-foreground">
              {quotes.filter((q) => q.status === "accepted").length} ได้รับการตอบรับ
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">รายการโปรด</CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{favorites.length}</div>
            <p className="text-xs text-muted-foreground">อสังหาริมทรัพย์ที่คุณสนใจ</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="bookings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="bookings">การนัดชมทรัพย์สิน</TabsTrigger>
          <TabsTrigger value="quotes">ใบเสนอราคา</TabsTrigger>
          <TabsTrigger value="favorites">รายการโปรด</TabsTrigger>
          <TabsTrigger value="viewed">เข้าชมล่าสุด</TabsTrigger>
          <TabsTrigger value="reviews">รีวิวของฉัน</TabsTrigger>
          <TabsTrigger value="profile">ข้อมูลส่วนตัว</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{booking.propertyTitle}</CardTitle>
                      {getStatusBadge(booking.status)}
                    </div>
                    <CardDescription>วันที่นัด: {new Date(booking.date).toLocaleDateString("th-TH")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Image
                        src={booking.propertyImage || "/placeholder.svg"}
                        alt={booking.propertyTitle}
                        width={120}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-semibold">นายหน้า:</span> {booking.agentName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          สถานะ: {booking.status === "confirmed" ? "ยืนยันแล้ว" : "รอการยืนยัน"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
                      <Link href={`/properties/${booking.propertyId}`}>ดูรายละเอียดทรัพย์สิน</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>ไม่มีการนัดชมทรัพย์สิน</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>คุณยังไม่มีการนัดชมทรัพย์สิน</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                    <Link href="/properties">ค้นหาอสังหาริมทรัพย์</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="quotes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <Card key={quote.id}>
                  <CardHeader>
                    <div className="flex justify-between">
                      <CardTitle className="text-lg">{quote.propertyTitle}</CardTitle>
                      {getStatusBadge(quote.status)}
                    </div>
                    <CardDescription>นายหน้า: {quote.agentName}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4">
                      <Image
                        src={quote.propertyImage || "/placeholder.svg"}
                        alt={quote.propertyTitle}
                        width={120}
                        height={80}
                        className="rounded-md object-cover"
                      />
                      <div>
                        <p className="text-sm mb-1">
                          <span className="font-semibold">ราคาตั้งต้น:</span> ฿
                          {quote.originalPrice.toLocaleString("th-TH")}
                        </p>
                        <p className="text-sm mb-1">
                          <span className="font-semibold">ราคาที่เสนอ:</span> ฿
                          {quote.offeredPrice.toLocaleString("th-TH")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          สถานะ:{" "}
                          {quote.status === "accepted"
                            ? "ยอมรับแล้ว"
                            : quote.status === "rejected"
                              ? "ปฏิเสธแล้ว"
                              : "รอการตอบรับ"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
                      <Link href={`/properties/${quote.propertyId}`}>ดูรายละเอียดทรัพย์สิน</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>ไม่มีใบเสนอราคา</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>คุณยังไม่มีใบเสนอราคา</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                    <Link href="/properties">ค้นหาอสังหาริมทรัพย์</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="favorites">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {favorites.length > 0 ? (
              favorites.map((property) => (
                <Card key={property.id} className="overflow-hidden">
                  <div className="relative h-48">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500"
                    >
                      <Heart className="h-5 w-5" fill="currentColor" />
                    </Button>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{property.title}</CardTitle>
                    <CardDescription className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" /> {property.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl font-bold text-cyan-700 mb-2">฿{property.price.toLocaleString("th-TH")}</p>
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
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
                      <Link href={`/properties/${property.id}`}>ดูรายละเอียด</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>ไม่มีรายการโปรด</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>คุณยังไม่มีรายการโปรด</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="bg-cyan-600 hover:bg-cyan-700">
                    <Link href="/properties">ค้นหาอสังหาริมทรัพย์</Link>
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="viewed">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentlyViewed.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-cyan-700">฿{property.price.toLocaleString("th-TH")}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
                    <Link href={`/properties/${property.id}`}>ดูรายละเอียด</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviews">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{review.propertyTitle}</CardTitle>
                    <CardDescription>วันที่: {new Date(review.date).toLocaleDateString("th-TH")}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full bg-cyan-600 hover:bg-cyan-700">
                      <Link href={`/properties/${review.propertyId}`}>ดูรายละเอียดทรัพย์สิน</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>ไม่มีรีวิว</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>คุณยังไม่มีรีวิว</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>ข้อมูลส่วนตัว</CardTitle>
              <CardDescription>จัดการข้อมูลส่วนตัวของคุณ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center">
                    <User className="h-8 w-8 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">คุณสมศรี มีสุข</h3>
                    <p className="text-gray-600">somsri@example.com</p>
                  </div>
                </div>
                <Button className="mt-4 md:mt-0 bg-cyan-600 hover:bg-cyan-700">แก้ไขโปรไฟล์</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div>
                  <h3 className="text-md font-semibold mb-2">ข้อมูลส่วนตัว</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ชื่อ-นามสกุล</span>
                      <span>คุณสมศรี มีสุข</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">อีเมล</span>
                      <span>somsri@example.com</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">เบอร์โทรศัพท์</span>
                      <span>081-234-5678</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-md font-semibold mb-2">การตั้งค่า</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">การแจ้งเตือน</span>
                      <span>เปิด</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ภาษา</span>
                      <span>ไทย</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">สกุลเงิน</span>
                      <span>บาท (THB)</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-md font-semibold mb-2">ความปลอดภัย</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    เปลี่ยนรหัสผ่าน
                  </Button>
                  <Button variant="outline" className="w-full">
                    ตั้งค่าการยืนยันตัวตนสองชั้น
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
