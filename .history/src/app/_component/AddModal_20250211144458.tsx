export default function AddModal() {
  return (
    <div className="border rounded-lg p-10 flex flex-col gap-4">
      <div className="font-bold text-xl">🍺 어디 얼마나 마셨나 적어봐 🍺</div>

      <div>az</div>
      <label>
        <span>소주</span>
        <input type="text" />
      </label>
      <label>
        <span>맥주</span>
        <input type="text" />
      </label>
    </div>
  );
}
