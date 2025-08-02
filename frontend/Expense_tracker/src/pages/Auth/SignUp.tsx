import React, { useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { validateEmail } from '../../utils/helper';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';

const SignUp = () => {
  const [ profilePic, setProfilePic ] = useState(null);
  const [fullName, setFullName ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ error, setError ] = useState<string | null>(null);

  const navigate = useNavigate();

  //Handle signup for submit
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileInputURL = "";

    if (!fullName){
      setError("Please enter your name");
      return;
    }

    if(!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if(!password){
      setError("Please enter the password");
      return;
    }

    setError("");
    //Sign up API call
  }

  return (
    <AuthLayout>
      <div className='lg:w-[100%] h-auto md:h-auto mt-10 md:mt-0 flex flex-col justify-center'>
        <h3 className='text-xl font-semibold'>Create an account.</h3>
        <p className='text-sm text-slate-700 mt-[5px] mb-6'>
          ¡Join us! <br />
          Please enter the details below!
        </p>
      </div>

      <form onSubmit={handleSignUp}>
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <Input 
            value={fullName}
            onChange={({target}) => setFullName(target.value)}
            placeholder='John'
            label="Full name"
            type='text'  
          />
          <Input 
            value={email}
            onChange={({target}) => setEmail(target.value)}
            placeholder='John@example.com'
            label="Email address"
            type='text'  
          />
          <Input 
            value={password}
            onChange={({target}) => setPassword(target.value)}
            placeholder="Min 8 characters"
            label="Password"
            type="password" 
          />
        </div>
        {error && <p className='text-red-500 text-xs mt-2'>{error}</p>}

          <button type='submit' className='btn-primary'>
            SIGN UP
          </button>

          <p className='text-[15px] text-slate-800 mt-3'>
            Already have an account? {" "}
            <Link className='font-medium text-primary underline' to="/login">
             Login!
            </Link>
          </p>

      </form>
    </AuthLayout>
  )
}

export default SignUp
