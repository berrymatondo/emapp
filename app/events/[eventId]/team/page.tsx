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
import React from "react";

import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeleteStock from "@/components/stock/deleteStock";
import TableForm from "@/components/table/tableForm";
import DeleteTable from "@/components/table/deleteTable";
import DeleteWaiter from "@/components/team/deleteWaiter";
import WaiterForm from "@/components/team/waiterForm";

const WaitersListPage = async () => {
  const headersList = headers();
  //const header_url = headersList.get("x-url") || "";
  const pathname = headersList.get("x-pathname");
  // const origin_url = headersList.get("x-origin");

  //console.log("PATHNAME", pathname);

  const eventId = pathname?.split("events/")[1].split("/")[0];

  // FETECH
  const tables = await prisma.table.findMany({
    where: {
      eventId: eventId ? +eventId : undefined,
    },
    select: {
      id: true,
      tableName: true,
      maxGuests: true,
      curGuests: true,
      eventId: true,
      waiterId: true,
      waiter: true,
      //users: true,
    },
    orderBy: {
      tableName: "asc",
    },
  });

  const waiters = await prisma.waiter.findMany({
    /*     where: {
      eventId: eventId ? +eventId : undefined,
    }, */
    select: {
      id: true,
      name: true,
    },
    orderBy: {
      name: "asc",
    },
  });

  //console.log("tables:", tables);

  return (
    <div>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>{"Gestion de l'équipe"}</CardTitle>
          <CardDescription>
            {"Avoir une vue 360 sur toute l'équipe"}
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <WaiterForm openDialog={false} />

          <ScrollArea className=" h-96 p-2 border rounded-xl">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] px-2">Nom</TableHead>
                  {/*                   <TableHead className="px-2">Cpté</TableHead>
                  <TableHead className="px-2">Dispo</TableHead> */}
                  <TableHead className="text-right px-2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {waiters.map((st) => (
                  <TableRow key={st.id}>
                    <TableCell className="font-medium px-2">
                      {st.name}
                    </TableCell>
                    {/*                    <TableCell className="px-2">{st.maxGuests}</TableCell>
                    <TableCell className="px-2 text-lg font-bold text-green-600">
                      {st.curGuests}
                    </TableCell> */}
                    <TableCell className="text-right flex px-2">
                      <DeleteWaiter waiter={st} openDialog={false} />
                      <WaiterForm
                        openDialog={false}
                        waiter={st}
                        //ta={waiters}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaitersListPage;
