import { Button } from "@/components/ui/button";
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
  return (
    <section className="container mt-8 mx-auto">
      <p className="font-bold text-center">
        Table: <span>{table.name}</span>
      </p>
      <div className=" border-2 border-sky-400 rounded-full flex justify-between items-center">
        <div className="h-24 w-24 rounded-full bg-sky-400 text-2xl font-bold flex justify-center items-center">
          <div className="flex flex-col h-20 w-20 rounded-full bg-white  text-black  font-bold  justify-center items-center">
            <p>
              {table.occupied}/{table.max}
            </p>
            <p className="text-sm text-green-600">
              {table.max - table.occupied}
            </p>
          </div>
        </div>
        <div className="font-bold">10 min</div>
        <div className="">
          <div className="flex">
            <IoIosRemoveCircle className="text-red-600" size={60} />
            <IoMdAddCircle className="text-green-600" size={60} />
          </div>
        </div>
      </div>
    </section>
  );
};
