"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Building, Check, ChevronDown, ChevronUp, Edit, Eye, Search, User, Users, X } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import { toast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortColumn, setSortColumn] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

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
      agentName: "คุณสมชาย ใจดี",
      createdAt: "2025-04-10",
    },
    {
      id: "2",
      title: "คอนโดมิเนียม ใกล้ BTS อโศก",
      image: "/placeholder.svg?height=200&width=300",
      price: 3800000,
      location: "อโศก, กรุงเทพมหานคร",
      status: "pending",
      agentName: "คุณสมหญิง รักดี",
      createdAt: "2025-05-01",
    },
    {
      id: "3",
      title: "ทาวน์โฮม 3 ชั้น โครงการ City Home",
      image: "/placeholder.svg?height=200&width=300",
      price: 4500000,
      location: "บางนา, กรุงเทพมหานคร",
      status: "active",
      agentName: "คุณสมศักดิ์ มั่งมี",
      createdAt: "2025-04-20",
    },
    {
      id: "4",
      title: "บ้านเดี่ยว โครงการ Lake View",
      image: "/placeholder.svg?height=200&width=300",
      price: 7800000,
      location: "รังสิต, ปทุมธานี",
      status: "pending",
      agentName: "คุณสมหญิง รักดี",
      createdAt: "2025-05-05",
    },
    {
      id: "5",
      title: "คอนโดมิเนียม ริมแม่น้ำเจ้าพระยา",
      image: "/placeholder.svg?height=200&width=300",
      price: 12500000,
      location: "เจริญนคร, กรุงเทพมหานคร",
      status: "inactive",
      agentName: "คุณสมชาย ใจดี",
      createdAt: "2025-03-15",
    },
  ]

  const agents = [
    {
      id: "1",
      name: "คุณสมชาย ใจดี",
      email: "somchai@example.com",
      phone: "081-234-5678",
      company: "บริษัท อสังหาฯ จำกัด",
      status: "active",
      properties: 2,
      registeredAt: "2025-01-15",
    },
    {
      id: "2",
      name: "คุณสมหญิง รักดี",
      email: "somying@example.com",
      phone: "089-876-5432",
      company: "บริษัท บ้านดี จำกัด",
      status: "active",
      properties: 2,
      registeredAt: "2025-02-10",
    },
    {
      id: "3",
      name: "คุณสมศักดิ์ มั่งมี",
      email: "somsak@example.com",
      phone: "062-345-6789",
      company: "บริษัท ที่ดินทอง จำกัด",
      status: "pending",
      properties: 1,
      registeredAt: "2025-04-05",
    },
  ]

  const customers = [
    {
      id: "1",
      name: "คุณสมศรี มีสุข",
      email: "somsri@example.com",
      phone: "081-234-5678",
      status: "active",
      inquiries: 3,
      registeredAt: "2025-03-10",
    },
    {
      id: "2",
      name: "คุณสมชัย ใจดี",
      email: "somchai@example.com",
      phone: "089-876-5432",
      status: "active",
      inquiries: 2,
      registeredAt: "2025-02-20",
    },
    {
      id: "3",
      name: "คุณสมปอง ดีใจ",
      email: "sompong@example.com",
      phone: "062-345-6789",
      status: "inactive",
      inquiries: 0,
      registeredAt: "2025-01-15",
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
      default:
        return <Badge className="bg-gray-500">ไม่ระบุ</Badge>
    }
  }

  const handleApproveProperty = (id: string) => {
    toast({
      title: "อนุมัติประกาศสำเร็จ",
      description: `ประกาศ #${id} ได้รับการอนุมัติแล้ว`,
    })
  }

  const handleRejectProperty = (id: string) => {
    toast({
      title: "ปฏิเสธประกาศสำเร็จ",
      description: `ประกาศ #${id} ได้รับการปฏิเสธแล้ว`,
    })
  }

  const handleApproveAgent = (id: string) => {
    toast({
      title: "อนุมัตินายหน้าสำเร็จ",
      description: `นายหน้า #${id} ได้รับการอนุมัติแล้ว`,
    })
  }

  const handleRejectAgent = (id: string) => {
    toast({
      title: "ปฏิเสธนายหน้าสำเร็จ",
      description: `นายหน้า #${id} ได้รับการปฏิเสธแล้ว`,
    })
  }

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortColumn(column)
      setSortDirection("asc")
    }
  }

  const getSortIcon = (column: string) => {
    if (sortColumn !== column) return null
    return sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }

  // กรองและเรียงลำดับข้อมูล
  const filteredProperties = properties
    .filter(
      (property) =>
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.agentName.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .sort((a, b) => {
      if (!sortColumn) return 0

      let valueA, valueB

      switch (sortColumn) {
        case "title":
          valueA = a.title
          valueB = b.title
          break
        case "price":
          valueA = a.price
          valueB = b.price
          break
        case "location":
          valueA = a.location
          valueB = b.location
          break
        case "status":
          valueA = a.status
          valueB = b.status
          break
        case "agent":
          valueA = a.agentName
          valueB = b.agentName
          break
        case "date":
          valueA = new Date(a.createdAt).getTime()
          valueB = new Date(b.createdAt).getTime()
          break
        default:
          return 0
      }

      if (valueA < valueB) return sortDirection === "asc" ? -1 : 1
      if (valueA > valueB) return sortDirection === "asc" ? 1 : -1
      return 0
    })

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
          <h1 className="text-3xl font-bold text-teal-800">แดชบอร์ดแอดมิน</h1>
          <p className="text-gray-600">ยินดีต้อนรับ, {user?.name || "แอดมิน"}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">อสังหาริมทรัพย์ทั้งหมด</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{properties.length}</div>
            <p className="text-xs text-muted-foreground">
              {properties.filter((p) => p.status === "pending").length} รออนุมัติ
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">นายหน้า</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{agents.length}</div>
            <p className="text-xs text-muted-foreground">
              {agents.filter((a) => a.status === "pending").length} รออนุมัติ
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
            <p className="text-xs text-muted-foreground">
              {customers.filter((c) => c.status === "active").length} ใช้งาน
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="properties" className="space-y-4">
        <TabsList>
          <TabsTrigger value="properties">อสังหาริมทรัพย์</TabsTrigger>
          <TabsTrigger value="agents">นายหน้า</TabsTrigger>
          <TabsTrigger value="customers">ลูกค้า</TabsTrigger>
        </TabsList>

        <TabsContent value="properties">
          <Card>
            <CardHeader>
              <CardTitle>จัดการอสังหาริมทรัพย์</CardTitle>
              <CardDescription>ดูและจัดการประกาศอสังหาริมทรัพย์ทั้งหมดในระบบ</CardDescription>
              <div className="mt-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="ค้นหาอสังหาริมทรัพย์..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort("title")}>
                      <div className="flex items-center">ชื่อประกาศ {getSortIcon("title")}</div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("price")}>
                      <div className="flex items-center">ราคา {getSortIcon("price")}</div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("location")}>
                      <div className="flex items-center">ที่ตั้ง {getSortIcon("location")}</div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("status")}>
                      <div className="flex items-center">สถานะ {getSortIcon("status")}</div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("agent")}>
                      <div className="flex items-center">นายหน้า {getSortIcon("agent")}</div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort("date")}>
                      <div className="flex items-center">วันที่ลงประกาศ {getSortIcon("date")}</div>
                    </TableHead>
                    <TableHead className="text-right">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProperties.map((property) => (
                    <TableRow key={property.id}>
                      <TableCell className="font-medium">{property.title}</TableCell>
                      <TableCell>฿{property.price.toLocaleString("th-TH")}</TableCell>
                      <TableCell>{property.location}</TableCell>
                      <TableCell>{getStatusBadge(property.status)}</TableCell>
                      <TableCell>{property.agentName}</TableCell>
                      <TableCell>{new Date(property.createdAt).toLocaleDateString("th-TH")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/properties/${property.id}`}>
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          {property.status === "pending" && (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500"
                                onClick={() => handleApproveProperty(property.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleRejectProperty(property.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="agents">
          <Card>
            <CardHeader>
              <CardTitle>จัดการนายหน้า</CardTitle>
              <CardDescription>ดูและจัดการนายหน้าทั้งหมดในระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">ชื่อ</TableHead>
                    <TableHead>อีเมล</TableHead>
                    <TableHead>เบอร์โทรศัพท์</TableHead>
                    <TableHead>บริษัท</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>จำนวนประกาศ</TableHead>
                    <TableHead>วันที่ลงทะเบียน</TableHead>
                    <TableHead className="text-right">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.id}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>{agent.email}</TableCell>
                      <TableCell>{agent.phone}</TableCell>
                      <TableCell>{agent.company}</TableCell>
                      <TableCell>{getStatusBadge(agent.status)}</TableCell>
                      <TableCell>{agent.properties}</TableCell>
                      <TableCell>{new Date(agent.registeredAt).toLocaleDateString("th-TH")}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-2">
                          {agent.status === "pending" ? (
                            <>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-green-500"
                                onClick={() => handleApproveAgent(agent.id)}
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500"
                                onClick={() => handleRejectAgent(agent.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          ) : (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers">
          <Card>
            <CardHeader>
              <CardTitle>จัดการลูกค้า</CardTitle>
              <CardDescription>ดูและจัดการลูกค้าทั้งหมดในระบบ</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">ชื่อ</TableHead>
                    <TableHead>อีเมล</TableHead>
                    <TableHead>เบอร์โทรศัพท์</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>จำนวนคำขอ</TableHead>
                    <TableHead>วันที่ลงทะเบียน</TableHead>
                    <TableHead className="text-right">การจัดการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{getStatusBadge(customer.status)}</TableCell>
                      <TableCell>{customer.inquiries}</TableCell>
                      <TableCell>{new Date(customer.registeredAt).toLocaleDateString("th-TH")}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
