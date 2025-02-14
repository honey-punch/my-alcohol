export default function AddModal() {
  return (
    <form className="border rounded-lg p-10 flex flex-col gap-4">
      <div className="font-bold text-xl">🍺 어디 얼마나 마셨나 적어봐 🍺</div>

      <label>
        <span>소주</span>
        <input type="text" className="border-b focus:outline-none" />
      </label>

      <label>
        <span>맥주</span>
        <input type="text" className="border-b focus:outline-none" />
      </label>

      <button className="rounded-lg bg-blue-500 text-white font-bold p-3 w-[80px] hover:bg-blue-600 transition-colors">
        추가
      </button>
    </form>
  );
}
