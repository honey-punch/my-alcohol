export default function Summary() {
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

  return <div>개요</div>;
}
