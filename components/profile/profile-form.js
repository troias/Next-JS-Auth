import classes from './profile-form.module.css';
import {useRef } from 'react'

function ProfileForm() {

  const oldPasswordRef = useRef();
  const newsPasswordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();
    const entOldPass = event.target.value;
    const entNewPassword = event.target.value

    const enteredPassworsd = {
      oldPassword: entOldPass,
      newPassword: entNewPassword
    }
    const req = await fetch('/api/user/change-password', {
      method: 'PATCH',  
      body: JSON.stringify(enteredPassworsd), 
      contentType: 'application/json'
    })

    const res = await req.json()
    console.log("res", res)
  }

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={newsPasswordRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='old-password'>Old Password</label>
        <input type='password' id='old-password'  ref={oldPasswordRef} />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
