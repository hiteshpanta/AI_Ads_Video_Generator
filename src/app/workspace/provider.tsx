"use client";

import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { UserDetailContext } from "../../../context/UserDetailContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/AppSidebar";

function WorkspaceProvider({children}: {children: any}) {

  const newUserMutation = useMutation(api.users.CreateNewUser)
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();

  

  const CreateNewUser = async() => {

    const result = await newUserMutation({
      name: user?.fullName || "",
      email: user?.primaryEmailAddress?.emailAddress || "",
      picture: user?.imageUrl || ""

    });
    console.log(result);
    setUserDetail(result);

  }

  useEffect(()=> {
    user && CreateNewUser();
  }, [user]);



  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail}}>

      <SidebarProvider>
        <AppSidebar />
        
      
        <div className="w-full p-10">
          <SidebarTrigger />
          {children}
        </div>
      </SidebarProvider>
    </UserDetailContext.Provider>
    
  )
}

export default WorkspaceProvider
