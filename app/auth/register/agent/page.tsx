"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { ChevronLeft, ChevronRight, Upload } from "lucide-react"

const personalInfoSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "กรุณากรอกชื่อให้ถูกต้อง",
    }),
    lastName: z.string().min(2, {
      message: "กรุณากรอกนามสกุลให้ถูกต้อง",
    }),
    email: z.string().email({
      message: "กรุณากรอกอีเมลให้ถูกต้อง",
    }),
    phone: z.string().min(9, {
      message: "กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง",
    }),
    password: z.string().min(8, {
      message: "รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "รหัสผ่านไม่ตรงกัน",
    path: ["confirmPassword"],
  })

const professionalInfoSchema = z.object({
  company: z.string().optional(),
  licenseNumber: z.string().optional(),
  idNumber: z.string().min(13, {
    message: "กรุณากรอกเลขบัตรประชาชนให้ถูกต้อง",
  }),
  address: z.string().min(10, {
    message: "กรุณากรอกที่อยู่ให้ถูกต้อง",
  }),
  propertyTypes: z.array(z.string()).min(1, {
    message: "กรุณาเลือกประเภทอสังหาริมทรัพย์อย่างน้อย 1 ประเภท",
  }),
  serviceAreas: z.array(z.string()).min(1, {
    message: "กรุณาเลือกพื้นที่ให้บริการอย่างน้อย 1 พื้นที่",
  }),
  idCardFile: z.string().min(1, {
    message: "กรุณาอัพโหลดเอกสารยืนยันตัวตน",
  }),
})

export default function AgentRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<z.infer<typeof personalInfoSchema> | null>(null)

  const personalForm = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  const professionalForm = useForm<z.infer<typeof professionalInfoSchema>>({
    resolver: zodResolver(professionalInfoSchema),
    defaultValues: {
      company: "",
      licenseNumber: "",
      idNumber: "",
      address: "",
      propertyTypes: [],
      serviceAreas: [],
      idCardFile: "",
    },
  })

  function onPersonalSubmit(values: z.infer<typeof personalInfoSchema>) {
    setPersonalInfo(values)
    setStep(2)
  }

  function onProfessionalSubmit(values: z.infer<typeof professionalInfoSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log({ ...personalInfo, ...values })
      setIsLoading(false)
      toast({
        title: "ลงทะเบียนสำเร็จ",
        description: "ยินดีต้อนรับเข้าสู่ DInDIn ในฐานะนายหน้า",
      })
      router.push("/dashboard/agent")
    }, 1500)
  }

  const propertyTypes = [
    { id: "sale", label: "ขาย" },
    { id: "rent", label: "เช่า" },
    { id: "auction", label: "ประมูล" },
  ]

  const provinces = ["กรุงเทพมหานคร", "นนทบุรี", "ปทุมธานี", "สมุทรปราการ", "เชียงใหม่", "ภูเก็ต", "ชลบุรี", "ระยอง"]

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">ลงทะเบียนนายหน้า</CardTitle>
          <CardDescription className="text-center">
            {step === 1 ? "ขั้นตอนที่ 1: ข้อมูลส่วนตัว" : "ขั้นตอนที่ 2: ข้อมูลวิชาชีพ"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 ? (
            <Form {...personalForm}>
              <form onSubmit={personalForm.handleSubmit(onPersonalSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={personalForm.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ชื่อ</FormLabel>
                        <FormControl>
                          <Input placeholder="ชื่อ" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={personalForm.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>นามสกุล</FormLabel>
                        <FormControl>
                          <Input placeholder="นามสกุล" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={personalForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อีเมล</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เบอร์โทรศัพท์</FormLabel>
                      <FormControl>
                        <Input placeholder="0812345678" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>รหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="รหัสผ่านอย่างน้อย 8 ตัว" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={personalForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ยืนยันรหัสผ่าน</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="ยืนยันรหัสผ่าน" {...field} />
                      </FormControl>
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
            <Form {...professionalForm}>
              <form onSubmit={professionalForm.handleSubmit(onProfessionalSubmit)} className="space-y-4">
                <FormField
                  control={professionalForm.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ชื่อบริษัท/หน่วยงาน (ถ้ามี)</FormLabel>
                      <FormControl>
                        <Input placeholder="ชื่อบริษัท" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={professionalForm.control}
                  name="licenseNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขใบอนุญาตนายหน้า (ถ้ามี)</FormLabel>
                      <FormControl>
                        <Input placeholder="เลขใบอนุญาต" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={professionalForm.control}
                  name="idNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>เลขบัตรประจำตัวประชาชน</FormLabel>
                      <FormControl>
                        <Input placeholder="เลขบัตรประชาชน 13 หลัก" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={professionalForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ที่อยู่สำนักงาน (หรือที่อยู่สำหรับติดต่อ)</FormLabel>
                      <FormControl>
                        <Textarea placeholder="ที่อยู่" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={professionalForm.control}
                  name="propertyTypes"
                  render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel>ประเภทอสังหาริมทรัพย์ที่ดูแล</FormLabel>
                      </div>
                      {propertyTypes.map((item) => (
                        <FormField
                          key={item.id}
                          control={professionalForm.control}
                          name="propertyTypes"
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
                  control={professionalForm.control}
                  name="serviceAreas"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>พื้นที่ที่ให้บริการ (จังหวัด)</FormLabel>
                      <Select onValueChange={(value) => field.onChange([...field.value, value])}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="เลือกจังหวัด" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {provinces.map((province) => (
                            <SelectItem key={province} value={province}>
                              {province}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {field.value.map((area) => (
                          <div key={area} className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded-md flex items-center">
                            {area}
                            <button
                              type="button"
                              onClick={() => field.onChange(field.value.filter((a) => a !== area))}
                              className="ml-1 text-cyan-600 hover:text-cyan-800"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={professionalForm.control}
                  name="idCardFile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>อัพโหลดเอกสารยืนยันตัวตน (บัตรประชาชน/ใบอนุญาต/เอกสารบริษัท)</FormLabel>
                      <FormControl>
                        <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center cursor-pointer hover:border-cyan-500 transition-colors">
                          <Input
                            type="file"
                            accept=".pdf"
                            className="hidden"
                            id="id-card-upload"
                            onChange={(e) => {
                              const file = e.target.files?.[0]
                              if (file) {
                                field.onChange(file.name)
                              }
                            }}
                          />
                          <label htmlFor="id-card-upload" className="cursor-pointer">
                            <Upload className="mx-auto h-12 w-12 text-gray-400" />
                            <p className="mt-2 text-sm text-gray-600">คลิกเพื่ออัพโหลดไฟล์ PDF</p>
                            {field.value && <p className="mt-2 text-sm text-cyan-600">{field.value}</p>}
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
                    {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
                  </Button>
                </div>
              </form>
            </Form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/auth/login" className="text-cyan-600 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </div>
          <div className="text-center text-sm">
            ต้องการเป็นลูกค้า?{" "}
            <Link href="/auth/register" className="text-cyan-600 hover:underline">
              ลงทะเบียนเป็นลูกค้า
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
