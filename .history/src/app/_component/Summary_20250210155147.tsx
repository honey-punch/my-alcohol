const BOX_SIZE = 300;

export default function Summary() {
  const today = new Date();

  // TODO - DB에서 받아온 술마신 날들 중 가장 마지막 날
  const lastDay = new Date("2025-02-08T22:00:00");

  function getDayDiff() {
    const diffMs = Math.abs(today.getTime() - lastDay.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return days;
  }

  function getTimeDiff() {
    const diffMs = Math.abs(today.getTime() - lastDay.getTime());
    const hour = Math.floor(diffMs / (1000 * 60 * 60));
    const min = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    return { hour, min };
  }

  console.log(getTimeDiff());
  console.log(getDayDiff());

  return (
    <div className="grid grid-cols-2">
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-pink-300 text-white flex justify-center items-center text-3xl font-bold"
      >
        <span className="">{getDayDiff()}</span>
        <span>일</span>
      </div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-violet-500 text-white flex justify-center items-center text-3xl font-bold"
      >
        <span>{getTimeDiff().hour}</span>
        <span>시간</span>
        <span>{getTimeDiff().min}</span>
        <span>분</span>
      </div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-blue-500 text-white flex justify-center items-center text-3xl font-bold"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-yellow-300 text-white flex justify-center items-center text-3xl font-bold"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-gray-200 text-white flex justify-center items-center text-3xl font-bold"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-emerald-500 text-white flex justify-center items-center text-3xl font-bold"
      ></div>
    </div>
  );
}
