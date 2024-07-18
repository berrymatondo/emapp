"use server";
import { revalidatePath } from "next/cache";
//import bcrypt from "bcrypt";
import { z } from "zod";
//import { auth, signIn, signOut } from "@/auth";

import prisma from "./prisma";
import { WaiterSchema } from "./schemas";

type Inputs = z.infer<typeof WaiterSchema>;

// Create table
export const createWaiter = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = WaiterSchema.safeParse(data);

  if (result.success) {
    const { name, eventId } = result.data;

    //console.log("Order", order, countryId);

    try {
      const table = await prisma.waiter.create({
        data: {
          name: data.name,
          eventId: +data.eventId,
        },
      });
      revalidatePath(`/events/${data.eventId}/waiters`);

      return { success: true, data: table };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

/* export const unassignedTable = async (eventId: string, tableId: string) => {
  // console.log("DATA2 ", data);

  //const result = TableSchema.safeParse(data);

  try {
    const table = await prisma.table.update({
      where: {
        id: tableId ? +tableId : undefined,
      },
      data: {
        waiterId: null,
      },
    });

    revalidatePath(`/events/${eventId}/tables`);

    return { success: true, data: table };
  } catch (error) {
    return { success: false, error };
  }
}; */

// update table
export const updateWaiter = async (data: Inputs) => {
  // console.log("DATA2 ", data);

  const result = WaiterSchema.safeParse(data);

  if (result.success) {
    const { id, name } = result.data;

    try {
      const table = await prisma.waiter.update({
        where: {
          id: data.id ? +data.id : undefined,
        },
        data: {
          name: data.name,
        },
      });

      revalidatePath(`/events/${data.eventId}/waiters`);

      return { success: true, data: table };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

// Get all tables
export const getAllWaiters = async (eventId: string) => {
  try {
    const tables = await prisma.waiter.findMany({
      where: {
        eventId: +eventId,
      },
    });
    // revalidatePath(`/events/${stock?.id}/stock`);

    return {
      success: true,
      data: tables,
    };
  } catch (error) {}
};

// Get specfic table
export const getWaiter = async (waiterId: string) => {
  try {
    const waiter = await prisma.waiter.findUnique({
      where: {
        id: +waiterId,
      },
    });
    // revalidatePath(`/events/${stock?.id}/stock`);

    return {
      success: true,
      data: waiter,
    };
  } catch (error) {}
};

// Get tables per waiter
/* export const getTablesPerWaiter = async (waiterId: string) => {
  try {
    const tables = await prisma.table.findMany({
      where: {
        id: +waiterId,
      },
    });
    // revalidatePath(`/events/${stock?.id}/stock`);

    return {
      success: true,
      data: tables,
    };
  } catch (error) {}
}; */

// DELETE stock
export const deleteWaiter = async (eventId: string, waiterId: string) => {
  /*   const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check; */

  //console.log("eventId: ", eventId);
  //console.log("stockId: ", stockId);

  try {
    const table = await prisma.waiter.delete({
      where: {
        id: +waiterId,
      },
    });

    revalidatePath(`/events/${eventId}/waiters`);

    return {
      success: true,
      data: table,
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
