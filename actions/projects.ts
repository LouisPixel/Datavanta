"use server"

import { auth } from "@/lib/auth/auth"
import { prisma } from "@/lib/db"
import { headers } from "next/headers"

export const getAllProjects = async () => {

    try{
          const headersList = await headers()
          const session = await auth.api.getSession({
            headers: headersList
          })
        
          if (!session) {
            return { status: 403, error: "User not authenticated"}
          }

          const projects = await prisma.project.findMany({
            where: {
                userId: session.user.id,
                isDeleted: false,
            },
            orderBy: {
                updatedAt: "desc",
            },
          })

          if(projects.length === 0){
            return { status: 404, error: "No projects found"}
          }

          return { status: 200, data: projects}

    } catch (error) {
        console.log('ERROR', error)
        return { status: 500}
    }
}