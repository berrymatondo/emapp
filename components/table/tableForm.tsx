"use client";
import React, { useEffect, useState } from "react";
import { MdAdd, MdClose, MdDelete, MdEdit, MdUpdate } from "react-icons/md";
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
import { TableSchema } from "@/lib/schemas";
import { createTable, unassignedTable, updateTable } from "@/lib/_tableActions";
import { Waiter } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

type TableFormProps = {
  table?: any;
  openDialog: boolean;
  waiters?: any;
  //userSession: any;
};

const TableForm = ({
  table,
  //userSession,
  openDialog,
  waiters,
}: TableFormProps) => {
  const [open, setOpen] = useState(openDialog);
  const [show, setShow] = useState(false);
  const [upd, setUpd] = useState(true);
  const [add, setAdd] = useState(table ? false : true);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // const usr: any = userSession?.user;

  console.log("TABLE ", table);
  console.log("waiters ", waiters);
  // console.log("add", add);

  const pathname = usePathname();
  //console.log("pathname", pathname);

  const eventId = pathname.split("events/")[1].split("/tables")[0];
  //console.log("eventID", eventId);

  /*   console.log(
    "DATE",
    yc.date.toLocaleDateString().split("/").reverse().join("-")
  );
 */

  //console.log("Stock", stock);

  const form = useForm<z.infer<typeof TableSchema>>({
    resolver: zodResolver(TableSchema),
    defaultValues: {
      id: table?.id ? table.id : undefined,
      tableName: table ? table.tableName.toString() : "",
      maxGuests: table ? table.maxGuests.toString() : "",
      eventId: eventId ? eventId : "",
      waiterId: table?.waiterId ? table.waiterId.toString() : "",
    },
  });

  useEffect(() => {
    const fetchStock = async (id: any) => {
      //console.log("STOCKAGE", stock);
      form.setValue("tableName", table?.tableName?.toString());
      form.setValue("maxGuests", table?.maxGuests?.toString());
    };
    fetchStock(table?.id);
  }, [open]);

  const procesForm = async (values: z.infer<typeof TableSchema>) => {
    // console.log("LOAD: ", loading);
    //console.log("UPD: ", upd);

    //if (!upd) return;

    setLoading(true);
    console.log("Value DATA: ", values);
    //console.log("usr: ", usr);YcSchema
    let res;
    if (table) res = await updateTable(values);
    else res = await createTable(values);

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

    if (table)
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
          {table ? (
            <Button variant="empty">
              <MdEdit size={25} className="text-sky-600" />
            </Button>
          ) : (
            <Button className="bg-sky-600 rounded-full p-1 px-2 w-full">
              Ajouter une table
            </Button>
          )}
        </div>
        <AlertDialogContent className="bg-white mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center justify-between">
              {table ? (
                <span>Editer une table</span>
              ) : (
                <span>Nouvelle table</span>
              )}
              <span>
                <MdClose
                  size={25}
                  className="text-red-600"
                  onClick={() => setOpen(!open)}
                />
              </span>
            </AlertDialogTitle>
            {table ? (
              <AlertDialogDescription className="text-left">
                {"Editer une table"}
              </AlertDialogDescription>
            ) : (
              <AlertDialogDescription className="text-left">
                {"Ajouter une table"}
              </AlertDialogDescription>
            )}
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
                      name="tableName"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Table"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Nom de la table"
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
                      name="maxGuests"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>{"Nbr de places"}</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Nbr de places max"
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
                <div className="flex justify-between">
                  {waiters && (
                    <FormField
                      control={form.control}
                      name="waiterId"
                      render={({ field }) => {
                        return (
                          <FormItem className="w-1/2">
                            <FormLabel>Responsable</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <SelectTrigger id="framework">
                                <SelectValue placeholder="Assigner un respo" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                {waiters?.map((ctr: Waiter) => (
                                  <SelectItem
                                    key={ctr.id}
                                    value={ctr.id.toString()}
                                  >
                                    {ctr.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>

                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  )}

                  <div>
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
                </div>
              </form>
            </Form>
          </div>
          {table && (
            <form className="text-right mx-4">
              <Button
                variant="empty"
                className="text-sky-600 italic"
                type="submit"
                formAction={() => {
                  "use serer";
                  unassignedTable(table.eventId, table.id);
                  //console.log("Tenors in", tenor);

                  //syncYCConti(continent, tenor);
                  //console.log("Tenors in2", tenor);
                  setOpen(!open);
                  //console.log("Tenors in3", tenor);
                  window.location.reload();
                }}
              >
                Désassigner
              </Button>
            </form>
          )}
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TableForm;
