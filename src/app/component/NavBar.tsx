import React from 'react';
import Link from "next/link";


const NavBar = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-none">
    <button className="btn btn-square btn-ghost">
      <svg aria-label="Menu" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-5 w-5 stroke-current"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg>
    </button>
  </div>
  <div className="flex-1">
    <a className="btn btn-ghost text-xl">daisyUI</a>
  </div>
  <div className="flex flex-1 justify-center items-center gap-4">
    <Link href="/">
      <p>Home</p>
    </Link>
    <Link href="/about">
      <p>About</p>
    </Link>
    <Link href="/contact">
      <p>Contact</p>
    </Link>
  </div>
  <div className="flex flex-none items-center justify-end gap-4">
   
    <Link href="/sign-up">
      <button className="btn btn-active btn-info">Sign up</button>
    </Link>
    <Link href="/sign-in">
      <button className="btn btn-active btn-info">Sign in</button>
    </Link>
  </div>
</div>
        </div>
    );
};

export default NavBar;