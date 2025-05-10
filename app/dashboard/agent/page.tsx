"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Clock, Edit, Eye, FileText, MapPin, Plus, Trash2, User, Users } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "@/components/ui/use-toast"

export default function AgentDashboardPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // จำลองการโหลดข้อมูล
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Mock data
  const properties = [
    {
      id: "1",
      title: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
      image: "/placeholder.svg?height=200&width=300",
      price: 5500000,
      location: "ถนนเกษตร-นวมินทร์, กรุงเทพมหานคร",
      status: "active",
      views: 120,
      inquiries: 5,
      createdAt: "2025-04-10",
    },
    {
      id: "2",
      title: "คอนโดมิเนียม ใกล้ BTS อโศก",
      image: "/placeholder.svg?height=200&width=300",
      price: 3800000,
      location: "อโศก, กรุงเทพมหานคร",
      status: "pending",
      views: 45,
      inquiries: 2,
      createdAt: "2025-05-01",
    },
    {
      id: "3",
      title: "ทาวน์โฮม 3 ชั้น โครงการ City Home",
      image: "/placeholder.svg?height=200&width=300",
      price: 4500000,
      location: "บางนา, กรุงเทพมหานคร",
      status: "active",
      views: 78,
      inquiries: 3,
      createdAt: "2025-04-20",
    },
  ]

  const viewingRequests = [
    {
      id: "1",
      propertyId: "1",
      propertyTitle: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
      customerName: "คุณสมศรี มีสุข",
      date: "2025-05-15",
      status: "pending",
    },
    {
      id: "2",
      propertyId: "3",
      propertyTitle: "ทาวน์โฮม 3 ชั้น โครงการ City Home",
      customerName: "คุณสมชัย ใจดี",
      date: "2025-05-18",
      status: "confirmed",
    },
  ]

  const quoteRequests = [
    {
      id: "1",
      propertyId: "1",
      propertyTitle: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
      customerName: "คุณสมศรี มีสุข",
      originalPrice: 5500000,
      offeredPrice: 5200000,
      reason: "ต้องการปรับปรุงห้องน้ำและห้องครัว",
      status: "pending",
    },
    {
      id: "2",
      propertyId: "3",
      propertyTitle: "ทาวน์โฮม 3 ชั้น โครงการ City Home",
      customerName: "คุณสมชัย ใจดี",
      originalPrice: 4500000,
      offeredPrice: 4300000,
      reason: "ราคาตลาดในพื้นที่ใกล้เคียงอยู่ที่ประมาณนี้",
      status: "accepted",
    },
  ]

  const customers = [
    {
      id: "1",
      name: "คุณสมศรี มีสุข",
      email: "somsri@example.com",
      phone: "081-234-5678",
      inquiries: 2,
      lastActive: "2025-05-05",
    },
    {
      id: "2",
      name: "คุณสมชัย ใจดี",
      email: "somchai@example.com",
      phone: "089-876-5432",
      inquiries: 1,
      lastActive: "2025-05-03",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500">ใช้งาน</Badge>
      case "pending":
        return <Badge className="bg-yellow-500">รออนุมัติ</Badge>
      case "inactive":
        return <Badge className="bg-gray-500">ไม่ใช้งาน</Badge>
      case "confirmed":
        return <Badge className="bg-green-500">ยืนยันแล้ว</Badge>
      case "accepted":
        return <Badge className="bg-green-500">ยอมรับ</Badge>
      case "rejected":
        return <Badge className="bg-red-500">ปฏิเสธ</Badge>
      default:
        return <Badge className="bg-gray-500">ไม่ระบุ</Badge>
    }
  }

  const handleAcceptRequest = (id: string, type: string) => {
    toast({
      title: "ยืนยันคำขอสำเร็จ",
      description: `คำขอ #${id} ได้รับการยืนยันแล้ว`,
    })
  }

  const handleRejectRequest = (id: string, type: string) => {
    toast({
      title: "ปฏิเสธคำขอสำเร็จ",
      description: `คำขอ #${id} ได้รับการปฏิเสธแล้ว`,
    })
  }

  const handleDeleteProperty = (id: string) => {
    toast({
      title: "ลบประกาศสำเร็จ",
      description: `ประกาศ #${id} ถูกลบแล้ว`,
    })
  }

  if (isLoading) {
    return (
      <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-teal-800">แดชบอร์ดนายหน้า</h1>
          <p className="text-gray-600">ยินดีต้อนรับ, {user?.name || "นายหน้า"}</p>
        </div>
        <Button className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700" asChild>
          <Link href="/dashboard/agent/property/new">
            <Plus className="mr-2 h-4 w-4" /> ลงประกาศใหม่
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">อสังหาริมทรัพย์ทั้งหมด</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">
              {properties.filter((p) => p.status === "active").length} ใช้งาน,{" "}
              {properties.filter((p) => p.status === "pending").length} รออนุมัติ
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">การนัดชมทรัพย์สิน</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{viewingRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {viewingRequests.filter((r) => r.status === "pending").length} รอการยืนยัน
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">คำขอใบเสนอราคา</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{quoteRequests.length}</div>
            <p className="text-xs text-muted-foreground">
              {quoteRequests.filter((r) => r.status === "pending").length} รอการตอบรับ
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">ลูกค้า</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">ลูกค้าที่สนใจทรัพย์สินของคุณ</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">อสังหาริมทรัพย์</TabsTrigger>
          <TabsTrigger value="viewings">การนัดชมทรัพย์สิน</TabsTrigger>
          <TabsTrigger value="quotes">คำขอใบเสนอราคา</TabsTrigger>
          <TabsTrigger value="customers">ลูกค้า</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">{getStatusBadge(property.status)}</div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{property.title}</CardTitle>
                  <CardDescription className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" /> {property.location}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xl font-bold text-teal-700 mb-2">฿{property.price.toLocaleString("th-TH")}</p>
                  <div className="flex justify-between text-sm text-gray-600">
                    <div className="flex items-center">
                      <Eye className="h-4 w-4 mr-1" /> {property.views} ผู้เข้าชม
                    </div>
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" /> {property.inquiries} คำขอ
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/properties/${property.id}`}>
                      <Eye className="h-4 w-4 mr-1" /> ดูประกาศ
                    </Link>
                  </Button>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/agent/property/edit/${property.id}`}>
                        <Edit className="h-4 w-4 mr-1" /> แก้ไข
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-200 hover:bg-red-50"
                      onClick={() => handleDeleteProperty(property.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> ลบ
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="viewings">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {viewingRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{request.propertyTitle}</CardTitle>
                    {getStatusBadge(request.status)}
                  </div>
                  <CardDescription>วันที่นัด: {new Date(request.date).toLocaleDateString("th-TH")}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">ลูกค้า:</span> {request.customerName}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">สถานะ:</span>{" "}
                      {request.status === "confirmed" ? "ยืนยันแล้ว" : "รอการยืนยัน"}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  {request.status === "pending" && (
                    <div className="flex space-x-2 w-full">
                      <Button
                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                        onClick={() => handleAcceptRequest(request.id, "viewing")}
                      >
                        ยืนยัน
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleRejectRequest(request.id, "viewing")}
                      >
                        ปฏิเสธ
                      </Button>
                    </div>
                  )}
                  {request.status === "confirmed" && (
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                      <Link href={`/properties/${request.propertyId}`}>ดูรายละเอียดทรัพย์สิน</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="quotes">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {quoteRequests.map((request) => (
              <Card key={request.id}>
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{request.propertyTitle}</CardTitle>
                    {getStatusBadge(request.status)}
                  </div>
                  <CardDescription>ลูกค้า: {request.customerName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-semibold">ราคาตั้งต้น:</span> ฿{request.originalPrice.toLocaleString("th-TH")}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">ราคาที่เสนอ:</span> ฿{request.offeredPrice.toLocaleString("th-TH")}
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold">เหตุผล:</span> {request.reason}
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  {request.status === "pending" && (
                    <div className="flex space-x-2 w-full">
                      <Button
                        className="flex-1 bg-teal-600 hover:bg-teal-700"
                        onClick={() => handleAcceptRequest(request.id, "quote")}
                      >
                        ยอมรับ
                      </Button>
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => handleRejectRequest(request.id, "quote")}
                      >
                        ปฏิเสธ
                      </Button>
                    </div>
                  )}
                  {request.status === "accepted" && (
                    <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                      <Link href={`/properties/${request.propertyId}`}>ดูรายละเอียดทรัพย์สิน</Link>
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="customers">
          <div className="grid grid-cols-1 gap-4">
            {customers.map((customer) => (
              <Card key={customer.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{customer.name}</CardTitle>
                  <CardDescription>{customer.email}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm font-semibold">เบอร์โทรศัพท์</p>
                      <p>{customer.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">จำนวนคำขอ</p>
                      <p>{customer.inquiries}</p>
                    </div>
                    <div>
                      <p className="text-sm font-semibold">ใช้งานล่าสุด</p>
                      <p>{new Date(customer.lastActive).toLocaleDateString("th-TH")}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-teal-600 hover:bg-teal-700">ติดต่อลูกค้า</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
