const BOX_SIZE = 300;

export default function Summary() {
  const today = new Date();

  // TODO - DB에서 받아온 술마신 날들 중 가장 마지막 날
  const lastDay = new Date("2025-02-08T22:00:00");

  function getTimeDiff() {
    const diffMs = Math.abs(today.getTime() - lastDay.getTime());
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}시간 ${minutes}분`;
  }

  function getDayDiff() {
    const diffMs = Math.abs(today.getTime() - lastDay.getTime());
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return `${days}일 `;
  }

  console.log(getTimeDiff());
  console.log(getDayDiff());

  return (
    <div className="grid grid-cols-2">
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-pink-200 text-white"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-violet-600 text-white"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-blue-500 text-white"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-yellow-500 text-white"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-gray-200 text-white"
      ></div>
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-emerald-500 text-white"
      ></div>
    </div>
  );
}
