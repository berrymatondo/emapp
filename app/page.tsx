import { Button } from "@/components/ui/button";
import { IoIosRemoveCircle, IoMdAddCircle } from "react-icons/io";

export default function Home() {
  return (
    <section className="container py-24 mx-auto">
      <div className="border-2 border-sky-400 rounded-full flex ">
        <div className="h-24 w-24 rounded-full bg-white text-2xl font-bold flex justify-center items-center">
          <div className="h-24 w-24 rounded-full bg-sky-400 text-white text-2xl font-bold flex justify-center items-center">
            <div className="h-21 w-21 rounded-full bg-white text-white text-2xl font-bold flex justify-center items-center">
              <div className="m-0.5 h-20 w-20 rounded-full bg-gray-200 text-sky-600 text-4xl font-bold flex justify-center items-center">
                10
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <p className="font-bold">Fleur</p>
          <div className="flex">
            <IoIosRemoveCircle className="text-red-600" size={60} />
            <IoMdAddCircle className="text-green-600" size={60} />
          </div>
        </div>
      </div>
    </section>
  );
}
