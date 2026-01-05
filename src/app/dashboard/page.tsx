'use client'
import { useSession, signOut } from "@/lib/auth/auth-client" // Import signOut directly
import { DatavantaDashboard } from "../../components/datavanta-dashboard"
import { redirect } from "next/navigation"
import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';

interface UserSession {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: boolean | null;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function DashboardPage() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return <div>Loading...</div>
  }

  if (!session) {
    redirect("/login")
    return null
  }
  
  const handleSignOut = async () => {
    try {
      await signOut()
      // Optionally redirect after sign out
      // router.push('/login')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }
  
  return (
    <Provider store={store}>
      <DatavantaDashboard 
        user={session.user as UserSession}
        onSignOut={handleSignOut}
        isLoading={isPending}
        isAuthenticated={!!session}
      />
    </Provider>
  )
}