"use server";
import { revalidatePath } from "next/cache";
//import bcrypt from "bcrypt";
import { z } from "zod";
//import { auth, signIn, signOut } from "@/auth";

import prisma from "./prisma";
import { TableSchema } from "./schemas";

type Inputs = z.infer<typeof TableSchema>;

// Create table
export const createTable = async (data: Inputs) => {
  //console.log("registerUser", data);

  const result = TableSchema.safeParse(data);

  if (result.success) {
    const { tableName, maxGuests, curGuests, eventId, waiterId } = result.data;

    //console.log("Order", order, countryId);

    try {
      const table = await prisma.table.create({
        data: {
          tableName: data.tableName,
          maxGuests: +data.maxGuests,
          curGuests: data.maxGuests ? +data.maxGuests : undefined,
          eventId: +data.eventId,
          waiterId: data.waiterId ? +data.waiterId : undefined,
        },
      });
      revalidatePath(`/events/${data.eventId}/tables`);

      return { success: true, data: table };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
};

export const unassignedTable = async (eventId: string, tableId: string) => {
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
};

// update table
export const updateTable = async (data: Inputs) => {
  // console.log("DATA2 ", data);

  const result = TableSchema.safeParse(data);

  if (result.success) {
    const { id, tableName, maxGuests, curGuests, eventId, waiterId } =
      result.data;

    try {
      const table = await prisma.table.update({
        where: {
          id: data.id ? +data.id : undefined,
        },
        data: {
          tableName: data.tableName,
          maxGuests: +data.maxGuests,
          curGuests: data.curGuests ? +data.curGuests : undefined,
          eventId: +data.eventId,
          waiterId: data.waiterId ? +data.waiterId : undefined,
        },
      });

      revalidatePath(`/events/${data.eventId}/tables`);

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
export const getAllTables = async (eventId: string) => {
  try {
    const tables = await prisma.table.findMany({
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
export const getTable = async (tableId: string) => {
  try {
    const table = await prisma.table.findUnique({
      where: {
        id: +tableId,
      },
    });
    // revalidatePath(`/events/${stock?.id}/stock`);

    return {
      success: true,
      data: table,
    };
  } catch (error) {}
};

// Get tables per waiter
export const getTablesPerWaiter = async (waiterId: string) => {
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
};

// DELETE stock
export const deleteTable = async (eventId: string, tableId: string) => {
  /*   const check = await checkAuth("ADMIN");

  if (check.status == "KO") return check; */

  //console.log("eventId: ", eventId);
  //console.log("stockId: ", stockId);

  try {
    const table = await prisma.table.delete({
      where: {
        id: +tableId,
      },
    });

    revalidatePath(`/events/${eventId}/tables/${tableId}`);

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
