import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="py-2 z-10 sticky top-0 bg-sky-600 container flex justify-between">
      <Link className="text-white text-xl" href="/">
        Event Manager
      </Link>
      <div>
        <Link href="/events">Evénements</Link>
        <Link href="/tables">Tables</Link>
      </div>
    </div>
  );
};

export default Header;
