"use client";
import Image from "next/image";
import fondd from "../public/rst.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tables = [
  { id: 1, name: "Bruxelles", max: 10, occupied: 2 },
  { id: 2, name: "Paris", max: 10, occupied: 6 },
  { id: 3, name: "Venise", max: 10, occupied: 10 },
];

export default function Home() {
  return (
    <div className="overflow-hidden relative text-white flex flex-col md:flex-row gap-10 justify-center items-center  h-screen md:px-2">
      <Image
        alt="bcg"
        src={fondd}
        placeholder="blur"
        quality={100}
        fill
        sizes="100vw"
        className="object-cover -z-10 rounded-lg"
      />

      <div className="absolute top-3/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
        <p className="fond-bold  text-center text-4xl">Event</p>
        <p className=" text-center text-6xl">Manager</p>
        <p className="text-center text-xl mt-6 text-yellow-200">
          Gérér efficacement le placement et le service à table de vos invités
          lors de vos événements.
        </p>

        <Link href="/">
          <p className="mt-20 rounded-lg p-2 text-white text-center bg-sky-600  text-xl w-full">
            Connexion
          </p>
        </Link>
      </div>
    </div>
  );
}
