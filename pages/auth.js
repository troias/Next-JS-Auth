import AuthForm from '../components/auth/auth-form';
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'

function AuthPage() {

  const [isLoading, setIsLoading] = useState(true)

  const router = useRouter()
  
  useEffect(() => {

    const checkSession = async () => {
      const session = await getSession()

      if (session) {
        router.replace('/')
      } else {
        setIsLoading(false)
      }

    }
    checkSession()
  }, [])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return <AuthForm />;
}

export default AuthPage;
