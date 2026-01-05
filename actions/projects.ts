"use server"

import { auth } from "@/lib/auth/auth"
import { PrismaClient } from "@prisma/client"

export const getAllProjects = async () => {

    try{
          const session = await auth.api.getSession()
        
          if (!session) {
            return { status: 403, error: "User not authenticated"}
          }

          const projects = await PrismaClient.project.findMany({
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