"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

const formSchema = z
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

export default function CustomerRegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const success = await register(values, "customer")

      if (success) {
        toast({
          title: "ลงทะเบียนสำเร็จ",
          description: "ยินดีต้อนรับเข้าสู่ DInDIn",
        })
        router.push("/dashboard/customer")
      } else {
        toast({
          title: "ลงทะเบียนไม่สำเร็จ",
          description: "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถลงทะเบียนได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-md mx-auto">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">ลงทะเบียนผู้ใช้</CardTitle>
          <CardDescription className="text-center">กรอกข้อมูลเพื่อสร้างบัญชีผู้ใช้</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
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
                  control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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

              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? "กำลังลงทะเบียน..." : "ลงทะเบียน"}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            มีบัญชีอยู่แล้ว?{" "}
            <Link href="/auth/login" className="text-teal-600 hover:underline">
              เข้าสู่ระบบ
            </Link>
          </div>
          <div className="text-center text-sm">
            ต้องการเป็นนายหน้า?{" "}
            <Link href="/auth/register/agent" className="text-teal-600 hover:underline">
              ลงทะเบียนเป็นนายหน้า
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
