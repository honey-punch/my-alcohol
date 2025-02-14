import { useAddAlcoholDates } from "@/hooks/alcohol/alcohol";
import dayjs from "dayjs";
import { ChangeEvent, useState } from "react";
import uuid from "react-uuid";

interface AddModalProps {
  currentDate: Date;
}

export default function AddModal({ currentDate }: AddModalProps) {
  // useState
  const [sojuValue, setSojuValue] = useState<string>("");
  const [beerValue, setBeerValue] = useState<string>("");

  // hooks
  const { addAlcoholDate } = useAddAlcoholDates();

  // functions
  function handleSubmit() {
    const id = uuid();
    const date = `${dayjs(currentDate).format("YYYY-MM-DD")} 23:00:00`;
    const soju = Number(sojuValue);
    const beer = Number(beerValue);

    const body = {
      id,
      date,
      soju,
      beer,
    };
    addAlcoholDate(body);
  }

  function handleChangeSoju(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (/^\d*\.?\d*$/.test(value)) {
      setSojuValue(value);
    }
  }

  function handleChangeBeer(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    if (/^\d*\.?\d*$/.test(value)) {
      setBeerValue(value);
    }
  }

  return (
    <form
      className="border rounded-lg p-10 flex flex-col gap-8 shadow-md shadow-gray-400"
      onSubmit={handleSubmit}
    >
      <div className="font-bold text-xl">🍺 어디 얼마나 마셨나 적어봐 🍺</div>

      <div className="flex flex-col gap-4 w-full">
        <label className="flex gap-3 items-center">
          <span className="whitespace-nowrap">소주</span>
        </label>
        <input
          type="text"
          value={sojuValue}
          onChange={handleChangeSoju}
          className="border-b  w-full p-1"
        />

        <label className="flex gap-3 items-center">
          <span className="whitespace-nowrap">맥주</span>

          <input
            type="text"
            value={beerValue}
            onChange={handleChangeBeer}
            className="border-b focus:outline-none w-full p-1"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-lg self-end bg-blue-500 text-white font-bold p-2 w-[60px] hover:bg-blue-600 transition-colors"
      >
        추가
      </button>
    </form>
  );
}
