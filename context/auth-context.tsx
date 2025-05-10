"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

// ประเภทของผู้ใช้
export type UserRole = "customer" | "agent" | "admin" | null

// ข้อมูลผู้ใช้
export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
}

// ข้อมูลที่จะเก็บใน Context
interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string, role?: string) => Promise<boolean>
  logout: () => void
  register: (userData: any, role: UserRole) => Promise<boolean>
}

// สร้าง Context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users สำหรับการทดสอบ
const mockUsers: User[] = [
  {
    id: "1",
    name: "คุณสมศรี มีสุข",
    email: "customer@example.com",
    role: "customer",
  },
  {
    id: "2",
    name: "คุณสมชาย ใจดี",
    email: "agent@example.com",
    role: "agent",
  },
  {
    id: "3",
    name: "แอดมิน",
    email: "admin",
    role: "admin",
  },
]

// Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const router = useRouter()

  // ตรวจสอบการเข้าสู่ระบบเมื่อโหลดหน้า
  useEffect(() => {
    const storedUser = localStorage.getItem("dindin_user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // บันทึกข้อมูลผู้ใช้เมื่อมีการเปลี่ยนแปลง
  useEffect(() => {
    if (user) {
      localStorage.setItem("dindin_user", JSON.stringify(user))
    }
  }, [user])

  // ฟังก์ชันเข้าสู่ระบบ
  const login = async (email: string, password: string, role?: string): Promise<boolean> => {
    setIsLoading(true)

    // จำลองการเรียก API
    return new Promise((resolve) => {
      setTimeout(() => {
        let foundUser = null

        if (role === "admin") {
          // สำหรับ admin ใช้ username แทน email
          foundUser = mockUsers.find((u) => u.email === email && u.role === "admin")
        } else {
          // สำหรับ customer และ agent ใช้ email
          foundUser = mockUsers.find((u) => u.email === email)
        }

        if (foundUser) {
          setUser(foundUser)
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000)
    })
  }

  // ฟังก์ชันออกจากระบบ
  const logout = () => {
    setUser(null)
    localStorage.removeItem("dindin_user")
    router.push("/")
  }

  // ฟังก์ชันลงทะเบียน
  const register = async (userData: any, role: UserRole): Promise<boolean> => {
    setIsLoading(true)

    // จำลองการเรียก API
    return new Promise((resolve) => {
      setTimeout(() => {
        // สร้างผู้ใช้ใหม่
        const newUser: User = {
          id: `${mockUsers.length + 1}`,
          name: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          role: role,
        }

        // เพิ่มผู้ใช้ใหม่ (ในระบบจริงจะบันทึกลงฐานข้อมูล)
        mockUsers.push(newUser)

        // ล็อกอินอัตโนมัติ
        setUser(newUser)
        setIsLoading(false)
        resolve(true)
      }, 1000)
    })
  }

  // ค่าที่จะส่งไปยัง Context
  const value = {
    user,
    isLoading,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook สำหรับใช้งาน Context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
