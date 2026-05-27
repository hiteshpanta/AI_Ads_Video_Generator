"use client";

import { Button } from "@/components/ui/button"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { LayoutDashboard, Settings2Icon, Video, Videotape, WalletCards } from "lucide-react"
import Image from "next/image"
import Link from "next/link";
import {  usePathname } from "next/navigation"
import React from "react";


interface MenuInterface {
    title: string,
    icon: React.ElementType,
    path: string
}

const MenuOptions: MenuInterface[] = [
        {
            title: 'Dashboard',
            icon: LayoutDashboard,
            path: '/workspace'
        },
        {
            title: 'Create Ad',
            icon: Video,
            path: '/workspace/create-ad'
        },
        {
            title: 'My Video',
            icon: Videotape,
            path: '/workspace/my-video'
        },
        {
            title: 'Billing',
            icon: WalletCards,
            path: '/workspace/billing'
        },
        {
            title: 'Settings',
            icon: Settings2Icon,
            path: '/workspace/settings'
        },
    ]

function AppSidebar() {
    const path = usePathname();

    
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center my-5">
        <Image  src={'/logo.svg'} alt="logo" width={200} height={200}/>
      </SidebarHeader>
      <hr />
      <SidebarContent>
        <SidebarGroup >
            <Button className="mt-5">+ Create New Ad Video</Button>
        </SidebarGroup>
        <SidebarGroup >
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    {MenuOptions.map((menu, index) =>(
                        <SidebarMenuItem key={menu.title}>
                            <SidebarMenuButton className={'p-5'}>
                                <Link href={menu.path} className={`text-[17px] flex gap-3 ${path === menu.path ? 'text-blue-100' : ""}`}>
                                    <menu.icon className="h-10 w-10"/>
                                    <span>{menu.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />







      <Sidebar>
      <SidebarHeader className="flex items-center my-5">
        <Image  src={'/logo.svg'} alt="logo" width={200} height={200}/>
      </SidebarHeader>
      <hr />
      <SidebarContent>
        <SidebarGroup >
            <Button className="mt-5">+ Create New Ad Video</Button>
        </SidebarGroup>
        <SidebarGroup >
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
      
            </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    </Sidebar>





    
}

export default AppSidebar
