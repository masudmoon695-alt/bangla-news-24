"use client"

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";

const USerInfo = () => {
  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleSignOut =async()=>{
await authClient.signOut();
  }

  return (
    <div className="flex justify-end gap-2">
      {user ? (
        <div className="flex flex-row items-center gap-3">
          <Link href={"/profile"}>
          <div className="avatar">
            <div className="w-12 rounded-full">
              <Image
                alt={user.name ?? "User avatar"}
                src={user.image || "/avatar-placeholder.png"}
                width={400}
                height={400}
              />
            </div>
          </div>
          </Link>

          <div className="flex flex-col leading-tight">
            <h2 className="text-sm font-semibold">{user.name}</h2>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>

          <button onClick={handleSignOut} className="btn btn-error btn-xs">Sign Out</button>
        </div>
      ) : (
        <>
          <Link href={"/signin"} ><button className="btn">সাইন ইন</button></Link>
          <Link href={"/signup"} ><button className="btn bg-red-600 text-white">সাইন আপ</button></Link>
        </>
      )}
    </div>
  );
};

export default USerInfo;