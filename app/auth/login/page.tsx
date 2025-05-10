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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/auth-context"

const userFormSchema = z.object({
  email: z.string().email({
    message: "กรุณากรอกอีเมลให้ถูกต้อง",
  }),
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
})

const adminFormSchema = z.object({
  username: z.string().min(1, {
    message: "กรุณากรอกชื่อผู้ใช้",
  }),
  password: z.string().min(1, {
    message: "กรุณากรอกรหัสผ่าน",
  }),
})

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const [activeTab, setActiveTab] = useState("user")

  const userForm = useForm<z.infer<typeof userFormSchema>>({
    resolver: zodResolver(userFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const adminForm = useForm<z.infer<typeof adminFormSchema>>({
    resolver: zodResolver(adminFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  async function handleUserSubmit(values: z.infer<typeof userFormSchema>) {
    setIsLoading(true)

    try {
      const success = await login(values.email, values.password)

      if (success) {
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "ยินดีต้อนรับกลับมา",
        })

        // ตรวจสอบประเภทผู้ใช้จากอีเมล (ในระบบจริงจะได้จาก API)
        const userType = values.email.includes("agent") ? "agent" : "customer"
        router.push(`/dashboard/${userType}`)
      } else {
        toast({
          title: "เข้าสู่ระบบไม่สำเร็จ",
          description: "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleAdminSubmit(values: z.infer<typeof adminFormSchema>) {
    setIsLoading(true)

    try {
      const success = await login(values.username, values.password, "admin")

      if (success) {
        toast({
          title: "เข้าสู่ระบบสำเร็จ",
          description: "ยินดีต้อนรับกลับมา แอดมิน",
        })
        router.push("/dashboard/admin")
      } else {
        toast({
          title: "เข้าสู่ระบบไม่สำเร็จ",
          description: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถเข้าสู่ระบบได้ กรุณาลองใหม่อีกครั้ง",
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
          <CardTitle className="text-2xl text-center">เข้าสู่ระบบ</CardTitle>
          <CardDescription className="text-center">เข้าสู่ระบบเพื่อใช้งาน DInDIn</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="user" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="user">ลูกค้า / นายหน้า</TabsTrigger>
              <TabsTrigger value="admin">แอดมิน</TabsTrigger>
            </TabsList>

            {activeTab === "user" && (
              <div>
                <Form {...userForm}>
                  <form onSubmit={userForm.handleSubmit(handleUserSubmit)} className="space-y-4">
                    <FormField
                      control={userForm.control}
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
                      control={userForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>รหัสผ่าน</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="รหัสผ่าน" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-sm text-gray-500 mb-4">
                      <p>ทดลองใช้งาน:</p>
                      <p>- ลูกค้า: customer@example.com / password</p>
                      <p>- นายหน้า: agent@example.com / password</p>
                    </div>

                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                      {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}

            {activeTab === "admin" && (
              <div>
                <Form {...adminForm}>
                  <form onSubmit={adminForm.handleSubmit(handleAdminSubmit)} className="space-y-4">
                    <FormField
                      control={adminForm.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ชื่อผู้ใช้แอดมิน</FormLabel>
                          <FormControl>
                            <Input placeholder="admin" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={adminForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>รหัสผ่าน</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="รหัสผ่าน" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="text-sm text-gray-500 mb-4">
                      <p>ทดลองใช้งาน:</p>
                      <p>- แอดมิน: admin / password</p>
                    </div>

                    <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                      {isLoading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
                    </Button>
                  </form>
                </Form>
              </div>
            )}
          </Tabs>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm">
            ยังไม่มีบัญชี?{" "}
            <Link href="/auth/register" className="text-teal-600 hover:underline">
              ลงทะเบียนเป็นลูกค้า
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
