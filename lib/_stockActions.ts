"use server";
import { revalidatePath } from "next/cache";
//import bcrypt from "bcrypt";
import { z } from "zod";
//import { auth, signIn, signOut } from "@/auth";

import prisma from "./prisma";
import { StockSchema } from "./schemas";

type Inputs = z.infer<typeof StockSchema>;

// Create Stock
export const createStock = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = StockSchema.safeParse(data);

  if (result.success) {
    const { productName, initialQte, currentQte, eventId } = result.data;

    //console.log("Order", order, countryId);

    try {
      const stock = await prisma.stock.create({
        data: {
          productName: data.productName,
          initialQte: +data.initialQte,
          currentQte: +data.initialQte,
          eventId: +data.eventId,
        },
      });
      revalidatePath(`/events/${data.eventId}/stock`);

      return { success: true, data: stock };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// update stock
export const updateStock = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = StockSchema.safeParse(data);

  if (result.success) {
    const { id, productName, initialQte, currentQte, eventId } = result.data;

    try {
      const stock = await prisma.stock.update({
        where: {
          id: data.id ? +data.id : undefined,
        },
        data: {
          productName: data.productName,
          initialQte: +data.initialQte,
          currentQte: data.currentQte ? +data.currentQte : undefined,
          eventId: +data.eventId,
        },
      });

      revalidatePath(`/events/${data.eventId}/stock`);

      return { success: true, data: stock };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Get all countries
export const getAllStock = async (eventId: string) => {
  try {
    const stock = await prisma.stock.findMany({
      where: {
        eventId: +eventId,
      },
    });
    // revalidatePath(`/events/${stock?.id}/stock`);

    return {
      success: true,
      data: stock,
    };
  } catch (error) {}
};

// Get specfic stock
export const getStock = async (stockId: string) => {
  try {
    const stock = await prisma.stock.findUnique({
      where: {
        id: +stockId,
      },
    });
    // revalidatePath(`/events/${stock?.id}/stock`);

    return {
      success: true,
      data: stock,
    };
  } catch (error) {}
};

// DELETE stock
export const deleteStock = async (eventId: string, stockId: string) => {
  /*   const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check; */

  console.log("eventId: ", eventId);
  console.log("stockId: ", stockId);

  try {
    const stock = await prisma.stock.delete({
      where: {
        id: +stockId,
      },
    });

    revalidatePath(`/events/${eventId}/stock/${stockId}`);

    return {
      success: true,
      data: stock,
      status: "OK",
      msg: "",
    };
  } catch (error) {}
};

/* export const checkAuth = async (role: string) => {
  const session = await auth();

  console.log("AUTH SESSION:", session?.user);

  let user: any = session?.user;
  let status = "KO";
  if (user?.role == role) status = "OK";

  if (user?.status != "ACTIF") status = "KO";

  return {
    success: true,
    data: "",
    status: status,
    msg:
      status == "OK"
        ? ""
        : "Vous n'avez pas les droits nécessaires pour effectuer cette opération",
  };
};
 */
