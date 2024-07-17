import StockForm from "@/components/stock/sotckForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePathname } from "next/navigation";
import React from "react";

import { headers } from "next/headers";
import prisma from "@/lib/prisma";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const ProductsListPage = async () => {
  const headersList = headers();
  //const header_url = headersList.get("x-url") || "";
  const pathname = headersList.get("x-pathname");
  // const origin_url = headersList.get("x-origin");

  console.log("PATHNAME", pathname);

  const eventId = pathname?.split("events/")[1].split("/")[0];

  // FETECH
  const stock = await prisma.stock.findMany({
    where: {
      eventId: eventId ? +eventId : undefined,
    },
    select: {
      id: true,
      productName: true,
      initialQte: true,
      //users: true,
      //  company: true,
    },
    /*     orderBy: {
      name: "asc",
    }, */
  });

  console.log("stock:", stock);

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Gestion du stock</CardTitle>
          <CardDescription>
            Avoir une vue 360 sur toutes les boissons.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div>
            <div className="w-full flex justify-center bg-sky-600 text-white p-2 rounded-full mb-4">
              Ajouter un article
            </div>
            <StockForm openDialog={false} />
            {stock.map((notification, index) => (
              <div
                key={index}
                className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
              >
                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                <div className="space-y-1 flex items-start">
                  <p className="text-sm font-medium leading-none">
                    {notification.productName}{" "}
                    <span className="text-sm text-muted-foreground">
                      {notification.initialQte}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Soumettre </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProductsListPage;
