import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="container flex justify-between">
      <Link href="/events">Evénements</Link>
      <Link href="/tables">Tables</Link>
    </div>
  );
};

export default Header;
