"use client";
import React, { useState } from "react";
import { MdClose, MdDelete } from "react-icons/md";
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
import { Form } from "../ui/form";
import { deleteStock } from "@/lib/_stockActions";

type DeleteStockProps = {
  stock: any;
  openDialog: boolean;
};
const DeleteStock = ({ stock, openDialog }: DeleteStockProps) => {
  //console.log("stock", stock);

  const [open, setOpen] = useState(openDialog);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="empty">
          <MdDelete size={25} className="text-red-600" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <span>Supprimer un article</span>
            <span>
              <MdClose
                size={25}
                className="text-red-600"
                onClick={() => setOpen(!open)}
              />
            </span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette transaction permet de supprimer un article (
            {stock.productName}).
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className=" w-full flex justify-center  p-4 my-2  rounded-lg">
          <Button
            onClick={() => {
              setOpen(!open);
            }}
            variant="empty"
            className="w-full text-red-400"
          >
            {"Annuler"}
          </Button>

          <form>
            <Button
              type="submit"
              formAction={() => {
                "use serer";
                deleteStock(stock.eventId, stock.id);
                //console.log("Tenors in", tenor);

                //syncYCConti(continent, tenor);
                //console.log("Tenors in2", tenor);
                setOpen(!open);
                //console.log("Tenors in3", tenor);
                window.location.reload();
              }}
            >
              Confirmer
            </Button>
          </form>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStock;
