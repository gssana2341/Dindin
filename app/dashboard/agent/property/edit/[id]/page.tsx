"use client"

import Link from "next/link"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ChevronLeft, Trash2, Upload } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import PropertyMap from "@/components/property-map"

// ข้อมูลตัวอย่างอสังหาริมทรัพย์
const sampleProperties = [
  {
    id: "1",
    title: "บ้านเดี่ยว 2 ชั้น โครงการ The Garden",
    description:
      "บ้านเดี่ยว 2 ชั้น ในโครงการ The Garden พื้นที่ใช้สอย 180 ตร.ม. บนที่ดิน 60 ตร.วา ตกแต่งสวยงาม พร้อมเฟอร์นิเจอร์ ใกล้ห้างสรรพสินค้า โรงเรียน และโรงพยาบาล",
    price: 5500000,
    location: "ถนนเกษตร-นวมินทร์, กรุงเทพมหานคร",
    type: "บ้านเดี่ยว",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    landArea: 60,
    parkings: 2,
    listingType: ["sale"],
    inProject: "yes",
    projectName: "The Garden",
    condition: "ใหม่",
    latitude: 13.8361,
    longitude: 100.5722,
    amenities: ["เครื่องปรับอากาศ", "เฟอร์นิเจอร์", "เครื่องทำน้ำอุ่น", "อินเทอร์เน็ต", "ระบบรักษาความปลอดภัย"],
    projectAmenities: ["สระว่ายน้ำ", "ฟิตเนส", "สวนสาธารณะ", "รปภ. 24 ชม.", "กล้องวงจรปิด"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    highlights: "บ้านสร้างใหม่ สภาพดีมาก ตกแต่งในสไตล์โมเดิร์น ห้องนอนใหญ่พร้อมห้องน้ำในตัว",
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
    listingType: ["sale", "rent"],
    inProject: "yes",
    projectName: "The Line Asoke",
    condition: "ดีมาก",
    rentalPrice: 18000,
    latitude: 13.738,
    longitude: 100.5608,
    amenities: ["เครื่องปรับอากาศ", "เฟอร์นิเจอร์", "เครื่องทำน้ำอุ่น", "อินเทอร์เน็ต", "ทีวี", "ตู้เย็น", "เครื่องซักผ้า"],
    projectAmenities: ["สระว่ายน้ำ", "ฟิตเนส", "สวนพักผ่อน", "ล็อบบี้", "รปภ. 24 ชม.", "กล้องวงจรปิด", "ที่จอดรถ"],
    images: [
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    highlights: "ห้องแบบ 1 ห้องนอน 1 ห้องน้ำ ตกแต่งสไตล์มินิมอล เฟอร์นิเจอร์และเครื่องใช้ไฟฟ้าครบชุด วิวเมืองสวยงาม",
  },
]

// Schema สำหรับฟอร์มแก้ไขข้อมูลอสังหาริมทรัพย์
const propertyFormSchema = z.object({
  title: z.string().min(5, {
    message: "กรุณากรอกชื่อประกาศอย่างน้อย 5 ตัวอักษร",
  }),
  description: z.string().min(20, {
    message: "กรุณากรอกรายละเอียดอย่างน้อย 20 ตัวอักษร",
  }),
  listingType: z.array(z.string()).min(1, {
    message: "กรุณาเลือกประเภทการลงประกาศ",
  }),
  type: z.string({
    required_error: "กรุณาเลือกประเภทอสังหาริมทรัพย์",
  }),
  inProject: z.enum(["yes", "no"], {
    required_error: "กรุณาเลือกว่าอยู่ในโครงการหรือไม่",
  }),
  projectName: z.string().optional(),
  price: z.coerce.number().min(1, {
    message: "กรุณากรอกราคา",
  }),
  rentalPrice: z.coerce.number().optional(),
  location: z.string().min(5, {
    message: "กรุณากรอกที่ตั้ง",
  }),
  area: z.coerce.number().min(1, {
    message: "กรุณากรอกพื้นที่ใช้สอย",
  }),
  landArea: z.coerce.number().optional(),
  bedrooms: z.coerce.number().min(0, {
    message: "กรุณากรอกจำนวนห้องนอน",
  }),
  bathrooms: z.coerce.number().min(0, {
    message: "กรุณากรอกจำนวนห้องน้ำ",
  }),
  parkings: z.coerce.number().min(0, {
    message: "กรุณากรอกจำนวนที่จอดรถ",
  }),
  condition: z.string({
    required_error: "กรุณาระบุสภาพบ้าน",
  }),
  highlights: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  projectAmenities: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, {
    message: "กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป",
  }),
  latitude: z.number(),
  longitude: z.number(),
})

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [property, setProperty] = useState<any>(null)

  // ค้นหาข้อมูลอสังหาริมทรัพย์จาก ID
  useEffect(() => {
    const foundProperty = sampleProperties.find((p) => p.id === params.id)
    if (foundProperty) {
      setProperty(foundProperty)
    } else {
      toast({
        title: "ไม่พบข้อมูลอสังหาริมทรัพย์",
        description: "ไม่พบข้อมูลอสังหาริมทรัพย์ที่ต้องการแก้ไข",
        variant: "destructive",
      })
      router.push("/dashboard/agent")
    }
  }, [params.id, router])

  // ตรวจสอบสิทธิ์การเข้าถึง
  useEffect(() => {
    if (!user) {
      toast({
        title: "กรุณาเข้าสู่ระบบ",
        description: "คุณต้องเข้าสู่ระบบก่อนจึงจะสามารถแก้ไขข้อมูลอสังหาริมทรัพย์ได้",
        variant: "destructive",
      })
      router.push("/auth/login")
    } else if (user.role !== "agent" && user.role !== "admin") {
      toast({
        title: "ไม่มีสิทธิ์เข้าถึง",
        description: "คุณไม่มีสิทธิ์ในการแก้ไขข้อมูลอสังหาริมทรัพย์",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [user, router])

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      title: "",
      description: "",
      listingType: [],
      type: "",
      inProject: "no",
      projectName: "",
      price: 0,
      rentalPrice: 0,
      location: "",
      area: 0,
      landArea: 0,
      bedrooms: 0,
      bathrooms: 0,
      parkings: 0,
      condition: "",
      highlights: "",
      amenities: [],
      projectAmenities: [],
      images: [],
      latitude: 13.7563,
      longitude: 100.5018,
    },
  })

  // กำหนดค่าเริ่มต้นให้กับฟอร์มเมื่อโหลดข้อมูลอสังหาริมทรัพย์
  useEffect(() => {
    if (property) {
      form.reset({
        title: property.title,
        description: property.description,
        listingType: property.listingType,
        type: property.type,
        inProject: property.inProject,
        projectName: property.projectName || "",
        price: property.price,
        rentalPrice: property.rentalPrice || 0,
        location: property.location,
        area: property.area,
        landArea: property.landArea || 0,
        bedrooms: property.bedrooms,
        bathrooms: property.bathrooms,
        parkings: property.parkings,
        condition: property.condition,
        highlights: property.highlights || "",
        amenities: property.amenities || [],
        projectAmenities: property.projectAmenities || [],
        images: property.images,
        latitude: property.latitude,
        longitude: property.longitude,
      })
    }
  }, [property, form])

  // ประเภทการลงประกาศ
  const listingTypes = [
    { id: "sale", label: "ฉันต้องการขาย" },
    { id: "rent", label: "ฉันต้องการปล่อยเช่า" },
  ]

  // ประเภทอสังหาริมทรัพย์
  const propertyTypes = ["บ้านเดี่ยว", "ทาวน์โฮม", "คอนโดมิเนียม", "ที่ดิน", "อาคารพาณิชย์", "สำนักงาน"]

  // สภาพบ้าน
  const conditions = ["ใหม่", "ดีมาก", "ดี", "พอใช้", "ต้องปรับปรุง"]

  // สิ่งอำนวยความสะดวก
  const amenities = [
    "เครื่องปรับอากาศ",
    "เฟอร์นิเจอร์",
    "เครื่องทำน้ำอุ่น",
    "อินเทอร์เน็ต",
    "ทีวี",
    "ตู้เย็น",
    "เครื่องซักผ้า",
    "ระบบรักษาความปลอดภัย",
  ]

  // สิ่งอำนวยความสะดวกในโครงการ
  const projectAmenities = [
    "สระว่ายน้ำ",
    "ฟิตเนส",
    "สวนสาธารณะ",
    "ที่จอดรถ",
    "รปภ. 24 ชม.",
    "กล้องวงจรปิด",
    "คลับเฮาส์",
    "ร้านสะดวกซื้อ",
  ]

  // อัปเดตตำแหน่งบนแผนที่
  const handleLocationChange = (lat: number, lng: number) => {
    form.setValue("latitude", lat)
    form.setValue("longitude", lng)
  }

  // ลบรูปภาพ
  const handleRemoveImage = (index: number) => {
    const currentImages = form.getValues("images")
    const newImages = [...currentImages]
    newImages.splice(index, 1)
    form.setValue("images", newImages)
  }

  // บันทึกข้อมูล
  function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsLoading(false)
      toast({
        title: "บันทึกข้อมูลสำเร็จ",
        description: "ข้อมูลอสังหาริมทรัพย์ได้รับการอัปเดตแล้ว",
      })
      router.push("/dashboard/agent")
    }, 1500)
  }

  if (!property) {
    return (
      <div className="container mx-auto py-10 px-4 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-6">
        <Button variant="outline" asChild className="mb-4">
          <Link href="/dashboard/agent">
            <ChevronLeft className="h-4 w-4 mr-2" /> กลับไปยังแดชบอร์ด
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-teal-800">แก้ไขข้อมูลอสังหาริมทรัพย์</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>แก้ไขข้อมูลประกาศ</CardTitle>
          <CardDescription>แก้ไขข้อมูลอสังหาริมทรัพย์ของคุณให้ถูกต้องและครบถ้วน เพื่อเพิ่มโอกาสในการขายหรือให้เช่า</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ข้อมูลพื้นฐาน</h3>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อประกาศ</FormLabel>
                      <FormControl>
                        <Input placeholder="ชื่อประกาศ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="listingType"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>ประเภทการลงประกาศ</FormLabel>
                      </div>
                      <div>
                        {listingTypes.map((item) => (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(field.value?.filter((value) => value !== item.id))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ประเภทอสังหาริมทรัพย์</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกประเภทอสังหาริมทรัพย์" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {propertyTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="inProject"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>อสังหาริมทรัพย์อยู่ในโครงการหรือไม่?</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="yes" />
                            </FormControl>
                            <FormLabel className="font-normal">ใช่</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="no" />
                            </FormControl>
                            <FormLabel className="font-normal">ไม่</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("inProject") === "yes" && (
                  <FormField
                    control={form.control}
                    name="projectName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อโครงการ</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อโครงการ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ราคาขาย (บาท)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="ราคาขาย" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {form.watch("listingType").includes("rent") && (
                    <FormField
                      control={form.control}
                      name="rentalPrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ราคาเช่า (บาท/เดือน)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="ราคาเช่า" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">ที่ตั้งและแผนที่</h3>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ที่อยู่</FormLabel>
                      <FormControl>
                        <Textarea placeholder="ที่อยู่" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-2">
                  <FormLabel>ตำแหน่งที่ตั้ง (คลิกที่แผนที่เพื่อปักหมุด)</FormLabel>
                  <PropertyMap
                    latitude={form.watch("latitude")}
                    longitude={form.watch("longitude")}
                    address={form.watch("location")}
                    editable={true}
                    onLocationChange={handleLocationChange}
                    height="400px"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">รายละเอียดอสังหาริมทรัพย์</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="area"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>พื้นที่ใช้สอย (ตร.ม.)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="พื้นที่ใช้สอย" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {(form.watch("type") === "บ้านเดี่ยว" ||
                    form.watch("type") === "ทาวน์โฮม" ||
                    form.watch("type") === "ที่ดิน") && (
                    <FormField
                      control={form.control}
                      name="landArea"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>พื้นที่ดิน (ตร.วา)</FormLabel>
                          <FormControl>
                            <Input type="number" placeholder="พื้นที่ดิน" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="bedrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ห้องนอน</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="จำนวนห้องนอน" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="bathrooms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ห้องน้ำ</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="จำนวนห้องน้ำ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="parkings"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ที่จอดรถ</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="จำนวนที่จอดรถ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="condition"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>สภาพบ้าน</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกสภาพบ้าน" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {conditions.map((condition) => (
                            <SelectItem key={condition} value={condition}>
                              {condition}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="highlights"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>จุดเด่นของอสังหาริมทรัพย์</FormLabel>
                      <FormControl>
                        <Textarea placeholder="จุดเด่นของอสังหาริมทรัพย์" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รายละเอียดเพิ่มเติม</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="อธิบายรายละเอียดเพิ่มเติมเกี่ยวกับอสังหาริมทรัพย์"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">สิ่งอำนวยความสะดวก</h3>

                <FormField
                  control={form.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>สิ่งอำนวยความสะดวก</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {amenities.map((item) => (
                          <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item])
                                    : field.onChange(field.value?.filter((value) => value !== item))
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item}</FormLabel>
                          </FormItem>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("inProject") === "yes" && (
                  <FormField
                    control={form.control}
                    name="projectAmenities"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>สิ่งอำนวยความสะดวกในโครงการ</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {projectAmenities.map((item) => (
                            <FormItem key={item} className="flex flex-row items-start space-x-3 space-y-0 mb-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item])
                                      : field.onChange(field.value?.filter((value) => value !== item))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">{item}</FormLabel>
                            </FormItem>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">รูปภาพ</h3>

                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รูปภาพ (อัพโหลดได้สูงสุด 10 รูป)</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-teal-500 transition-colors">
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            multiple
                            className="hidden"
                            id="property-images"
                            onChange={(e) => {
                              const files = e.target.files
                              if (files) {
                                // ในสถานการณ์จริง จะต้องอัพโหลดไฟล์ไปยังเซิร์ฟเวอร์และได้ URL กลับมา
                                // ในตัวอย่างนี้ เราจะจำลองการได้ URL กลับมา
                                const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
                                field.onChange([...field.value, ...newImages].slice(0, 10))
                              }
                            }}
                          />
                          <label htmlFor="property-images" className="cursor-pointer">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">คลิกเพื่ออัพโหลดรูปภาพ (JPG, PNG)</p>
                            <p className="text-xs text-gray-500">อัพโหลดได้สูงสุด 10 รูป</p>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                      {field.value && field.value.length > 0 && (
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                          {field.value.map((image, index) => (
                            <div key={index} className="relative">
                              <div className="relative h-32 w-full">
                                <Image
                                  src={image || "/placeholder.svg"}
                                  alt={`รูปที่ ${index + 1}`}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <Button
                                type="button"
                                variant="destructive"
                                size="icon"
                                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                                onClick={() => handleRemoveImage(index)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => router.push("/dashboard/agent")}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> ยกเลิก
                </Button>
                <Button type="submit" className="flex-1 bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                  {isLoading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
