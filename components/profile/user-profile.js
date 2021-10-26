import ProfileForm from './profile-form';
import classes from './user-profile.module.css';
import { useSession, getSession } from 'next-auth/client'
import { useState, useEffect } from 'react/cjs/react.development';

function UserProfile() {
  // Redirect away if NOT auth

  // const [isLoading, setIsLoading] = useState(true)



  // useEffect(() => {
  //   const getInitialSession = async () => {
  //     const session = await getSession()
  //     if (!session) {
  //       window.location.href = '/auth'
  //     } else {
  //       setIsLoading(false)
  //     }
     
  //     // console.log("session", loadedSession)
  //   }
  //   getInitialSession()
  // }, []) 

  // if (isLoading) {
  //   return <p className={classes.profile}>Loading</p>
  // }

  // if (!loadedSession) {
    
  // }

  return (
    <section className={classes.profile}>
      <h1>Your User Profile</h1>
      <ProfileForm />
    </section>
  );
}

export default UserProfile;
