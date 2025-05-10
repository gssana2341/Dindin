"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X, Home, LogOut, User } from "lucide-react"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()

  // ฟังก์ชันสำหรับแสดงลิงก์ Dashboard ตามประเภทผู้ใช้
  const getDashboardLink = () => {
    if (!user) return null

    switch (user.role) {
      case "customer":
        return "/dashboard/customer"
      case "agent":
        return "/dashboard/agent"
      case "admin":
        return "/dashboard/admin"
      default:
        return null
    }
  }

  const dashboardLink = getDashboardLink()

  return (
    <header className="bg-teal-700 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold flex items-center">
            <Home className="mr-2" />
            DInDIn
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/properties" className="hover:text-teal-200 transition-colors">
              ค้นหาอสังหาริมทรัพย์
            </Link>
            <Link href="/agents" className="hover:text-teal-200 transition-colors">
              นายหน้า
            </Link>
            <Link href="/about" className="hover:text-teal-200 transition-colors">
              เกี่ยวกับเรา
            </Link>
            <Link href="/contact" className="hover:text-teal-200 transition-colors">
              ติดต่อเรา
            </Link>
            <div className="flex items-center space-x-2">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="text-white border-white hover:bg-teal-600">
                      <User className="mr-2 h-4 w-4" />
                      {user.name}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>บัญชีของฉัน</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {dashboardLink && (
                      <DropdownMenuItem asChild>
                        <Link href={dashboardLink}>แดชบอร์ด</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                      <Link href="/profile">โปรไฟล์</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      ออกจากระบบ
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="outline" className="text-white border-white hover:bg-teal-600">
                    <Link href="/auth/login">เข้าสู่ระบบ</Link>
                  </Button>
                  <Button className="bg-white text-teal-700 hover:bg-teal-100">
                    <Link href="/auth/register">ลงทะเบียน</Link>
                  </Button>
                </>
              )}
              <ModeToggle />
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <ModeToggle />
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2 p-2 focus:outline-none">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2">
            <div className="flex flex-col space-y-3">
              <Link
                href="/properties"
                className="hover:bg-teal-600 px-3 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                ค้นหาอสังหาริมทรัพย์
              </Link>
              <Link href="/agents" className="hover:bg-teal-600 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
                นายหน้า
              </Link>
              <Link href="/about" className="hover:bg-teal-600 px-3 py-2 rounded" onClick={() => setIsMenuOpen(false)}>
                เกี่ยวกับเรา
              </Link>
              <Link
                href="/contact"
                className="hover:bg-teal-600 px-3 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                ติดต่อเรา
              </Link>
              <div className="flex flex-col space-y-2 pt-2">
                {user ? (
                  <>
                    {dashboardLink && (
                      <Button
                        variant="outline"
                        className="text-white border-white hover:bg-teal-600 w-full justify-start"
                        onClick={() => setIsMenuOpen(false)}
                        asChild
                      >
                        <Link href={dashboardLink}>
                          <User className="mr-2 h-4 w-4" />
                          แดชบอร์ด
                        </Link>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-teal-600 w-full justify-start"
                      onClick={() => {
                        logout()
                        setIsMenuOpen(false)
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      ออกจากระบบ
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="text-white border-white hover:bg-teal-600 w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/auth/login" className="w-full">
                        เข้าสู่ระบบ
                      </Link>
                    </Button>
                    <Button
                      className="bg-white text-teal-700 hover:bg-teal-100 w-full"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Link href="/auth/register" className="w-full">
                        ลงทะเบียน
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
