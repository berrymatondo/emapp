import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";

const events = [
  {
    id: 1,
    eventName: "Mariage Liza - Brandon",
    eventDate: "14-07-2021",
    guestNumber: 220,
  },
  {
    id: 1,
    eventName: "Mariage Isa - Cédric",
    eventDate: "10-10-2023",
    guestNumber: 170,
  },
  {
    id: 1,
    eventName: "Mariage Nice - Pierre",
    eventDate: "01-04-2022",
    guestNumber: 50,
  },
  {
    id: 4,
    eventName: "Mariage Liza - Brandon",
    eventDate: "14-07-2021",
    guestNumber: 220,
  },
  {
    id: 5,
    eventName: "Mariage Isa - Cédric",
    eventDate: "10-10-2023",
    guestNumber: 170,
  },
  {
    id: 6,
    eventName: "Mariage Nice - Pierre",
    eventDate: "01-04-2022",
    guestNumber: 50,
  },
];

const EventsPage = () => {
  return (
    <div>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{"Evénements"}</CardTitle>
          {/*           <CardDescription>You have 3 unread messages.</CardDescription>
           */}{" "}
        </CardHeader>
        <CardContent className="grid gap-4 overflow-hidden">
          <ScrollArea className=" h-96 p-2 border rounded-xl">
            {events.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {notification.eventDate}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {notification.eventName} ,{" "}
                    <strong>{notification.guestNumber}</strong>
                    {" invités"}
                  </p>
                  <p className="italic text-sm text-muted-foreground">
                    Des commentaires en plus
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        {/*         <CardFooter>
          <Button className="w-full">Soumettre </Button>
        </CardFooter> */}
      </Card>
    </div>
  );
};

export default EventsPage;
