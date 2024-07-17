"use client";
import React, { useState } from "react";
import { MdAdd, MdClose, MdDelete, MdUpdate } from "react-icons/md";
import { Button } from "../ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { usePathname, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { StockSchema } from "@/lib/schemas";
import { createStock, updateStock } from "@/lib/_stockActions";

type StockProps = {
  stock?: any;
  openDialog: boolean;
  //userSession: any;
};

const StockForm = ({
  stock,
  //userSession,
  openDialog,
}: StockProps) => {
  const [open, setOpen] = useState(openDialog);
  const [show, setShow] = useState(false);
  const [upd, setUpd] = useState(true);
  const [add, setAdd] = useState(stock ? false : true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const usr: any = userSession?.user;

  //console.log("yc", yc);
  // console.log("add", add);

  const pathname = usePathname();
  //console.log("pathname", pathname);

  const eventId = pathname.split("events/")[1].split("/stock")[0];
  //console.log("eventID", eventId);

  /*   console.log(
    "DATE",
    yc.date.toLocaleDateString().split("/").reverse().join("-")
  );
 */
  const form = useForm<z.infer<typeof StockSchema>>({
    resolver: zodResolver(StockSchema),
    defaultValues: {
      id: stock?.id ? stock.id : undefined,
      productName: stock ? stock.productName.toString() : "",
      initialQte: stock ? stock.initialQte.toString() : "",
      eventId: eventId ? eventId : "",
    },
  });

  const procesForm = async (values: z.infer<typeof StockSchema>) => {
    // console.log("LOAD: ", loading);
    //console.log("UPD: ", upd);

    //if (!upd) return;

    setLoading(true);
    //console.log("Value: ", values);
    //console.log("usr: ", usr);YcSchema
    let res;
    if (stock) res = await updateStock(values);
    else res = await createStock(values);

    if (!res) {
      console.log("Une erreur est srvenue...");
    }

    if (res?.error) {
      //console.log(res?.error);
      setLoading(false);
      toast.error(` ${res?.error}`, {
        description: new Date().toISOString().split("T")[0],
      });
      return;
    }

    if (stock)
      toast.success(`La donnée a été mise à jour avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    else {
      //console.log("RES", res);
      toast.success(`La donnée a été créée avec succès.`, {
        description: new Date().toISOString().split("T")[0],
      });
    }

    setLoading(false);
    form.reset();
    setAdd(true);
    setOpen(false);
    setUpd(true);
    //router.push("/admin/countries");
  };

  return (
    <div className="">
      <AlertDialog open={open} onOpenChange={setOpen}>
        <div
          onClick={() => setOpen(!open)}
          className="w-full flex justify-end mb-2"
        >
          <Button className="bg-sky-600 rounded-full p-1 px-2 w-full">
            Ajouter un article
          </Button>
        </div>
        <AlertDialogContent className="bg-white mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              <span>Nouvel article</span>
              <span>
                <MdClose
                  size={25}
                  className="text-red-600"
                  onClick={() => setOpen(!open)}
                />
              </span>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-left">
              {"Ajouter un article dans le stock"}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-white flex justify-center  p-4 my-2  rounded-lg">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(procesForm)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="productName"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Article"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer l'article"
                                type="text"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />

                    <FormField
                      control={form.control}
                      name="initialQte"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Stock initial"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer stock initial"
                                type="number"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="eventId"
                    render={({ field }) => {
                      return (
                        <FormItem className="w-1/2 hidden">
                          <FormLabel>{"EventId"}</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/*                <div className="flex justify-between gap-4">
                    <FormField
                      control={form.control}
                      name="date"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Date"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Entrer le Tenor"
                                type="date"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                    {!countryId && conti && (
                      <FormField
                        control={form.control}
                        name="continent"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2">
                              <FormLabel>{"Continent"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer le Tenor"
                                  type="text"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    )}

                    {countryId && (
                      <FormField
                        control={form.control}
                        name="countryId"
                        render={({ field }) => {
                          return (
                            <FormItem className="w-1/2 hidden">
                              <FormLabel>{countryName}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Entrer le pays"
                                  type="text"
                                  disabled
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          );
                        }}
                      />
                    )}
                  </div> */}
                </div>
                <div className="flex flex-col gap-2">
                  <Button
                    onClick={() => {
                      setUpd(false);
                      setOpen(!open);
                      //  setLoading(false);
                      //  form.reset();
                    }}
                    variant="empty"
                    className="w-full text-red-400"
                  >
                    {"Annuler"}
                  </Button>
                  <AlertDialogFooter>
                    <Button className="bg-sky-600 rounded-full" type="submit">
                      {loading ? "En cours de traitemnt ..." : "Enregistrer"}
                    </Button>
                  </AlertDialogFooter>
                </div>
              </form>
            </Form>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default StockForm;
