"use client"

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session, refetch } = authClient.useSession()
  const user = session?.user
  const [name, setName] = useState(user?.name ?? "")
  const [image, setImage] = useState(user?.image ?? "")
  const [loading, setLoading] = useState(false)

  if (!user) {
    return (
      <div className="container mx-auto py-10 text-center">
        <p>লোড হচ্ছে...</p>
      </div>
    );
  }

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const { data, error } = await authClient.updateUser({ name, image })
    if (data) {
      await refetch()
      toast.success("Profile updated")
    }
    if (error) {
      toast.error(error.message ?? "Update failed")
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col items-center gap-5">
        <div className="avatar">
          <div className="w-24 rounded-full">
            <Image
              alt={user.name ?? "User avatar"}
              src={user.image || "/avatar-placeholder.png"}
              width={96}
              height={96}
            />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>

      <form onSubmit={handleUpdateProfile} className="mt-8 max-w-xs mx-auto">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="font-semibold">প্রোফাইল আপডেট করুন</legend>

          <label className="label">নাম</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full"
          />

          <label className="label mt-3">আইমেজ ইউআরএল</label>
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="input input-bordered w-full"
          />

          <button type="submit" className="btn btn-neutral mt-4 bg-red-700" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default ProfilePage;