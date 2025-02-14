import { useAddAlcoholDates } from "@/hooks/alcohol/alcohol";

export default function AddModal() {
  const { addAlcoholDate } = useAddAlcoholDates();
  return (
    <form className="border rounded-lg p-10 flex flex-col gap-8 shadow-md shadow-gray-400">
      <div className="font-bold text-xl">🍺 어디 얼마나 마셨나 적어봐 🍺</div>

      <div className="flex flex-col gap-4 w-full">
        <label className="flex gap-3 items-center">
          <span className="whitespace-nowrap">소주</span>

          <input
            type="text"
            className="border-b focus:outline-none w-full p-1"
          />
        </label>

        <label className="flex gap-3 items-center">
          <span className="whitespace-nowrap">맥주</span>

          <input
            type="text"
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
