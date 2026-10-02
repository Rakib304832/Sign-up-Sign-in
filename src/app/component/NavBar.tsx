"use client"; 

import Link from "next/link"; 
import { authClient, useSession } from "@/lib/auth-client"; 

const NavBar = () => {
  
  const { data: session, isPending } = useSession();

  return (
    <div> 
      <div className="navbar bg-base-100 shadow-sm"> 

        <div className="flex-none"> 
          <button className="btn btn-square btn-ghost">
           Menu
          </button>
        </div>

        <div className="flex-none"> 
          <a className="btn btn-ghost text-xl">Lunal</a>
        </div>

      
        <div className="flex flex-1 justify-center items-center gap-4">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </div>

        
        <div className="flex flex-none items-center justify-end gap-4">
          {isPending ? null : session ? ( // চেক চলাকালীন খালি, লগইন থাকলে Logout
            <>
              <span>{session.user.name}</span> {/* ইউজারের নাম */}
              <button
                className="btn btn-active rounded-full"
                onClick={() => authClient.signOut()} // লগআউট করে সেশন মুছে ফেলে
              >
                Logout
              </button>
            </>
          ) : ( // লগইন না থাকলে আগের দুই বাটন
            <>
              <Link href="/sign-in">
                <button className="btn btn-active rounded-full">Login</button>
              </Link>
              <Link href="/sign-up">
                <button className="btn btn-active btn-info rounded-full">Sign up</button>
              </Link>
            </>
          )}
        </div>

      </div> {/* navbar শেষ */}
    </div> /* বাইরের র‍্যাপার শেষ */
  );
};

export default NavBar;