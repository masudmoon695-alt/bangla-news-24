"use client"

import { authClient } from "@/lib/auth-client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



const SignUpPage = () => {
  const router = useRouter();

  const onSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
   e.preventDefault() 
   
   const formData = new FormData(e.currentTarget)
   const user = Object.fromEntries(formData.entries()) as {name:string,email:string,image:string,password:string}
   console.log(user);

   const{data,error} = await authClient.signUp.email(
    {
      ...user,
      callbackURL:"/"
    }

   )
   if(data){
    toast.success("Sign up successful")
    console.log(data);
    router.push("/")
   }
   if(error){
    toast.error("Sign up failed")
    console.log(error);
   }

  }
  return (
   <div className='flex flex-col items-center mt-5'>
<h2 className='font-2xl'>সাইন আপ</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

          <label className="label">Name</label>
  <input name="name" type="text" className="input" placeholder="Name" />

  <label className="label">ImageUrl</label>
  <input name = "image" type="url" className="input" placeholder="Image" />
  

  <label className="label">Email</label>
  <input name="email" type="email" className="input" placeholder="Email" />

  <label className="label">Password</label>
  <input name ="password" type="password" className="input" placeholder="Password" />

  <button type='submit' className="btn btn-neutral mt-4 bg-red-700 ">সাইন আপ করুন</button>
</fieldset>
      </form>
    </div>
  );
};

export default SignUpPage