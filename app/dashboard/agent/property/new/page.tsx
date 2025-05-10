"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { ChevronLeft, ChevronRight, MapPin, Upload } from "lucide-react"

const propertyTypeSchema = z.object({
  listingType: z.array(z.string()).min(1, {
    message: "กรุณาเลือกประเภทการลงประกาศ",
  }),
  propertyType: z.string({
    required_error: "กรุณาเลือกประเภทอสังหาริมทรัพย์",
  }),
  inProject: z.enum(["yes", "no"], {
    required_error: "กรุณาเลือกว่าอยู่ในโครงการหรือไม่",
  }),
  rentalPeriod: z.string().optional(),
  location: z.string({
    required_error: "กรุณาระบุตำแหน่งที่ตั้ง",
  }),
})

const propertyDetailsSchema = z.object({
  projectName: z.string().optional(),
  address: z.string({
    required_error: "กรุณากรอกที่อยู่",
  }),
  area: z.string({
    required_error: "กรุณากรอกพื้นที่ใช้สอย",
  }),
  bedrooms: z.string({
    required_error: "กรุณาระบุจำนวนห้องนอน",
  }),
  bathrooms: z.string({
    required_error: "กรุณาระบุจำนวนห้องน้ำ",
  }),
  parkings: z.string({
    required_error: "กรุณาระบุจำนวนที่จอดรถ",
  }),
  condition: z.string({
    required_error: "กรุณาระบุสภาพบ้าน",
  }),
  highlights: z.string().optional(),
  landArea: z.string().optional(),
  amenities: z.array(z.string()).optional(),
  projectAmenities: z.array(z.string()).optional(),
  description: z.string().min(10, {
    message: "กรุณาอธิบายรายละเอียดเพิ่มเติม",
  }),
  price: z.string({
    required_error: "กรุณาระบุราคา",
  }),
  images: z.array(z.string()).min(1, {
    message: "กรุณาอัพโหลดรูปภาพอย่างน้อย 1 รูป",
  }),
})

export default function NewPropertyPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [propertyTypeData, setPropertyTypeData] = useState<z.infer<typeof propertyTypeSchema> | null>(null)

  const propertyTypeForm = useForm<z.infer<typeof propertyTypeSchema>>({
    resolver: zodResolver(propertyTypeSchema),
    defaultValues: {
      listingType: [],
      propertyType: "",
      inProject: "no",
      rentalPeriod: "",
      location: "",
    },
  })

  const propertyDetailsForm = useForm<z.infer<typeof propertyDetailsSchema>>({
    resolver: zodResolver(propertyDetailsSchema),
    defaultValues: {
      projectName: "",
      address: "",
      area: "",
      bedrooms: "",
      bathrooms: "",
      parkings: "",
      condition: "",
      highlights: "",
      landArea: "",
      amenities: [],
      projectAmenities: [],
      description: "",
      price: "",
      images: [],
    },
  })

  function onPropertyTypeSubmit(values: z.infer<typeof propertyTypeSchema>) {
    setPropertyTypeData(values)
    setStep(2)
  }

  function onPropertyDetailsSubmit(values: z.infer<typeof propertyDetailsSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log({ ...propertyTypeData, ...values })
      setIsLoading(false)
      toast({
        title: "ลงประกาศสำเร็จ",
        description: "ประกาศของคุณได้รับการเผยแพร่แล้ว",
      })
      router.push("/dashboard/agent")
    }, 1500)
  }

  const listingTypes = [
    { id: "sale", label: "ฉันต้องการขาย" },
    { id: "rent", label: "ฉันต้องการปล่อยเช่า" },
    { id: "both", label: "ฉันต้องการขายและปล่อยเช่า" },
  ]

  const propertyTypes = ["บ้านเดี่ยว", "ทาวน์โฮม", "คอนโดมิเนียม", "ที่ดิน", "อาคารพาณิชย์", "สำนักงาน"]

  const rentalPeriods = ["3 เดือน", "6 เดือน", "9 เดือน", "12 เดือน", "อื่นๆ"]

  const conditions = ["ใหม่", "ดีมาก", "ดี", "พอใช้", "ต้องปรับปรุง"]

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

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">ลงประกาศอสังหาริมทรัพย์</CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? "ขั้นตอนที่ 1: ข้อมูลเบื้องต้น" : "ขั้นตอนที่ 2: รายละเอียดอสังหาริมทรัพย์"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <Form {...propertyTypeForm}>
              <form onSubmit={propertyTypeForm.handleSubmit(onPropertyTypeSubmit)} className="space-y-6">
                <FormField
                  control={propertyTypeForm.control}
                  name="listingType"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>ประเภทการลงประกาศ</FormLabel>
                      </div>
                      {listingTypes.map((item) => (
                        <FormField
                          key={item.id}
                          control={propertyTypeForm.control}
                          name="listingType"
                          render={({ field }) => {
                            return (
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
                            )
                          }}
                        />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={propertyTypeForm.control}
                  name="propertyType"
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
                  control={propertyTypeForm.control}
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

                {propertyTypeForm.watch("listingType").includes("rent") && (
                  <FormField
                    control={propertyTypeForm.control}
                    name="rentalPeriod"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ระยะเวลาการเช่า</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="เลือกระยะเวลาการเช่า" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {rentalPeriods.map((period) => (
                              <SelectItem key={period} value={period}>
                                {period}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={propertyTypeForm.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ตำแหน่งที่ตั้ง</FormLabel>
                      <div className="flex space-x-2">
                        <FormControl>
                          <Input placeholder="ค้นหาตำแหน่งที่ตั้ง" {...field} />
                        </FormControl>
                        <Button type="button" variant="outline" className="flex-shrink-0">
                          <MapPin className="h-4 w-4 mr-2" /> ปักหมุด
                        </Button>
                      </div>
                      <div className="mt-2 h-40 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-gray-500">แผนที่จะแสดงที่นี่</p>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-700">
                  ถัดไป <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...propertyDetailsForm}>
              <form onSubmit={propertyDetailsForm.handleSubmit(onPropertyDetailsSubmit)} className="space-y-6">
                {propertyTypeData?.inProject === "yes" && (
                  <FormField
                    control={propertyDetailsForm.control}
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

                <FormField
                  control={propertyDetailsForm.control}
                  name="address"
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={propertyDetailsForm.control}
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

                  {(propertyTypeData?.propertyType === "บ้านเดี่ยว" ||
                    propertyTypeData?.propertyType === "ทาวน์โฮม" ||
                    propertyTypeData?.propertyType === "ที่ดิน") && (
                    <FormField
                      control={propertyDetailsForm.control}
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
                    control={propertyDetailsForm.control}
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
                    control={propertyDetailsForm.control}
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
                    control={propertyDetailsForm.control}
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
                  control={propertyDetailsForm.control}
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
                  control={propertyDetailsForm.control}
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
                  control={propertyDetailsForm.control}
                  name="amenities"
                  render={({ field }) => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>สิ่งอำนวยความสะดวก</FormLabel>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {amenities.map((item) => (
                          <FormField
                            key={item}
                            control={propertyDetailsForm.control}
                            name="amenities"
                            render={({ field }) => {
                              return (
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
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {propertyTypeData?.inProject === "yes" && (
                  <FormField
                    control={propertyDetailsForm.control}
                    name="projectAmenities"
                    render={({ field }) => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>สิ่งอำนวยความสะดวกในโครงการ</FormLabel>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                          {projectAmenities.map((item) => (
                            <FormField
                              key={item}
                              control={propertyDetailsForm.control}
                              name="projectAmenities"
                              render={({ field }) => {
                                return (
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
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={propertyDetailsForm.control}
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

                <FormField
                  control={propertyDetailsForm.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ราคา (บาท)</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="ราคา" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={propertyDetailsForm.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รูปภาพ (อัพโหลดได้สูงสุด 6 รูป)</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-cyan-500 transition-colors">
                          <Input
                            type="file"
                            accept=".jpg,.jpeg,.png"
                            multiple
                            className="hidden"
                            id="property-images"
                            onChange={(e) => {
                              const files = e.target.files
                              if (files) {
                                const fileNames = Array.from(files).map((file) => file.name)
                                field.onChange(fileNames.slice(0, 6))
                              }
                            }}
                          />
                          <label htmlFor="property-images" className="cursor-pointer">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">คลิกเพื่ออัพโหลดรูปภาพ (JPG, PNG)</p>
                            <p className="text-xs text-gray-500">อัพโหลดได้สูงสุด 6 รูป</p>
                            {field.value && field.value.length > 0 && (
                              <div className="mt-4 grid grid-cols-3 gap-2">
                                {field.value.map((image, index) => (
                                  <div key={index} className="text-left text-xs text-cyan-600 truncate">
                                    {image}
                                  </div>
                                ))}
                              </div>
                            )}
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex space-x-4">
                  <Button type="button" variant="outline" className="flex-1" onClick={() => setStep(1)}>
                    <ChevronLeft className="mr-2 h-4 w-4" /> ย้อนกลับ
                  </Button>
                  <Button type="submit" className="flex-1 bg-cyan-600 hover:bg-cyan-700" disabled={isLoading}>
                    {isLoading ? "กำลังลงประกาศ..." : "ลงประกาศ"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
