"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";

const tables = [
  { id: 1, name: "Bruxelles", max: 10, occupied: 2 },
  { id: 2, name: "Paris", max: 10, occupied: 6 },
  { id: 3, name: "Venise", max: 10, occupied: 10 },
];

export default function Home() {
  return (
    <>
      {tables.map((table: any) => (
        <MyTable table={table} key={table.id} />
      ))}
    </>
  );
}

type MyTableProps = {
  table: any;
};
const MyTable = ({ table }: MyTableProps) => {
  const [occupied, setOccupied] = useState(table?.occupied);

  return (
    <section className="container mt-8 mx-auto">
      <div className="relative ">
        <Badge className="text-md absolute border-2 border-sky-400 bg-white px-1 rounded-full font-bold text-center mb-2  -top-3 left-1/2 transform -translate-x-1/2 -translate-y-1/2></div>">
          <span className="text-md">{table.name}</span>{" "}
          {occupied >= table.max && (
            <span className="ml-1 font-normal bg-red-600 text-white text-sm px-1 rounded-full">
              FULL
            </span>
          )}
        </Badge>
        <div className=" border-2 border-sky-400 rounded-full flex justify-between items-center">
          <div className="h-20 w-20 rounded-full bg-sky-400 font-bold flex justify-center items-center">
            <div className="flex flex-col h-16 w-16 rounded-full bg-white  text-black  font-bold  justify-center items-center">
              <p className="text-xl">
                {occupied}
                <span className="text-sm">/{table.max}</span>
              </p>
              <p className="text-sm text-green-600">{table.max - occupied}</p>
            </div>
          </div>
          <div className="font-bold">
            <Badge className="bg-gray-500 text-white">10 min</Badge>
          </div>
          <div className="">
            <div className="flex">
              <IoIosRemoveCircle
                className={
                  occupied == 0
                    ? "pointer-events-none text-gray-400"
                    : "text-red-600"
                }
                size={50}
                onClick={() => setOccupied(occupied - 1)}
              />
              <IoMdAddCircle
                className={
                  occupied == table.max
                    ? "pointer-events-none text-gray-400"
                    : "text-green-600"
                }
                size={50}
                onClick={() => setOccupied(occupied + 1)}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
