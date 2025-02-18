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

const ProductsListPage = async () => {
  const headersList = headers();
  //const header_url = headersList.get("x-url") || "";
  const pathname = headersList.get("x-pathname");
  // const origin_url = headersList.get("x-origin");

  //console.log("PATHNAME", pathname);

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
      eventId: true,
      currentQte: true,
      //users: true,
      //  company: true,
    },
    orderBy: {
      productName: "asc",
    },
  });

  //console.log("stock:", stock);

  return (
    <div>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Gestion du stock</CardTitle>
          <CardDescription>
            Avoir une vue 360 sur toutes les boissons.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <StockForm openDialog={false} />

          <ScrollArea className=" h-96 p-2 border rounded-xl">
            <Table className="">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] px-2">Article</TableHead>
                  <TableHead className="px-2">Stock</TableHead>
                  <TableHead className="px-2">Actuel</TableHead>
                  <TableHead className="text-right px-2"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="">
                {stock.map((st) => (
                  <TableRow key={st.id}>
                    <TableCell className="font-medium px-2">
                      {st.productName}
                    </TableCell>
                    <TableCell className="px-2">{st.initialQte}</TableCell>
                    <TableCell className="px-2 font-bold text-sky-800">
                      {st.currentQte}
                    </TableCell>
                    <TableCell className="text-right flex px-2">
                      <DeleteStock stock={st} openDialog={false} />
                      <StockForm openDialog={false} stock={st} />
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

export default ProductsListPage;
