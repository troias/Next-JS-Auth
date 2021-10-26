import { useState, useRef } from 'react';
import classes from './auth-form.module.css';
import { signIn } from 'next-auth/client'
import { useRouter } from 'next/router'

const createUser = async (userData) => {

  const req = await fetch('/api/auth/signup',
    {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: { 'Content-Type': 'application/json' }
    })

  const res = await req.json()

  return res
}



function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter()
  const emailRef = useRef();
  const passRef = useRef();

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  const submitHandler = async (event) => {
    event.preventDefault();

    const currEmailRef = emailRef.current.value
    const currPassRef = passRef.current.value;

    const userData = {
      email: currEmailRef,
      password: currPassRef,
    }


    if (isLogin) {

      const result = await signIn('credentials', {
        redirect: false,
        email: userData.email,
        password: userData.password
      })

      if (!result.error) {
        // localStorage.setItem('result')
        router.replace('/profile')
      }

     
    } else {
      try {

        const result = await createUser(userData)
        

      } catch (error) {
       
      }

    }
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>

        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required ref={passRef} />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
