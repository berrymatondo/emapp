"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import stock from "../../../public/stock.png";
import team from "../../../public/team.png";
import tables from "../../../public/tables.png";
import Image from "next/image";

const events = [
  {
    title: "Gestion du stock",
    description:
      "Encoder le stock de boissons dans le système. Le faire pour chaque article.",
    link: "stock",
    image: { val: stock },
    alt: "stock",
  },
  {
    title: "Gestion des tables",
    description: "Encoder toutes les places dans le système ",
    link: "tables",
    image: { val: tables },
    alt: "tables",
  },
  {
    title: "Gestion de l'équipe",
    description:
      "Encoder toute l'équipe et assigner les tables et rôles à l'équipe",
    link: "team",
    image: { val: team },
    alt: "team",
  },
];

const EventDetailsPage = () => {
  const pathname = usePathname();
  //console.log("PATHNAME: " + pathname);

  const eventId = pathname.split("events/")[1];
  const router = useRouter();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{"Détails de l'événement"}</CardTitle>
          <CardDescription>14-07-2024: Mariage Brandon-Liza</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            {events.map((event, index) => (
              <div
                key={index}
                onClick={() => router.push(`/events/${eventId}/${event.link}`)}
                className="mb-4 grid grid-cols-[100px_1fr] items-center pb-4 last:mb-0 last:pb-0"
              >
                {/*                 <div className="flex h-12 w-12 translate-y-1 rounded-full bg-sky-500" />
                 */}{" "}
                <div className="overflow-hidden flex h-20 w-20 translate-y-1 rounded-full ">
                  <Image alt={event.alt} src={event.image.val} />
                </div>
                <Link href="" className="space-y-1">
                  <p className="text-md font-semibold leading-none text-sky-800">
                    {event.title}
                  </p>
                  <p className="italic text-sm text-muted-foreground">
                    {event.description}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </CardContent>
        {/*         <CardFooter>
          <Button className="w-full">Soumettre </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default EventDetailsPage;
