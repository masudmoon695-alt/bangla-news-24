"use client"
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

const SignInPage = () => {
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const user = Object.fromEntries(formData.entries()) as { email: string, password: string }

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/"
    })

    if (data) {
      toast.success("Sign in successful")
      router.push("/")
    }
    if (error) {
      toast.error(error.message ?? "Sign in failed")
    }
  }

  const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/"
    });
  }

  return (
    <div className='flex flex-col items-center mt-5'>
      <h2 className='text-2xl'>সাইন ইন</h2>
      <form onSubmit={onSubmit}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">Email</label>
          <input name="email" type="email" className="input" placeholder="Email" />

          <label className="label">Password</label>
          <input name="password" type="password" className="input" placeholder="Password" />

          <button type="submit" className="btn btn-neutral mt-4 bg-red-700">সাইন ইন করুন</button>
        </fieldset>
      </form>

      <button onClick={handleGoogleSignIn} className='btn'>Sign in with Google</button>
    </div>
  );
};

export default SignInPage;