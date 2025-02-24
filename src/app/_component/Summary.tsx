const BOX_SIZE = 300;
const SOJU_PRICE_PER_ONE_BOTTLE = 1700;
const BEER_PRICE_PER_ONE_ML = 6;

interface SummaryProps {
  alcoholDates: AlcoholDate[];
}

export default function Summary({ alcoholDates }: SummaryProps) {
  const today = new Date();

  // 1, 2번 박스
  const lastDate = new Date(alcoholDates[alcoholDates.length - 1].date);

  const diffMs = Math.abs(today.getTime() - lastDate.getTime());
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMin = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffTime = { diffHour, diffMin };

  // 3번 박스
  const sojuAverage = Math.round(alcoholDates.map((v) => v.soju).reduce((a, b) => a + b) / alcoholDates.length);
  const beerAverage = Math.round(alcoholDates.map((v) => v.beer).reduce((a, b) => a + b) / alcoholDates.length);

  // 4번 박스
  const sojuSavingMoney = SOJU_PRICE_PER_ONE_BOTTLE * sojuAverage;
  const beerSavingMoney = BEER_PRICE_PER_ONE_ML * beerAverage;
  const totalSavingMoney = (sojuSavingMoney + beerSavingMoney) * diffDay;

  // 5번 박스
  const lastWeekDateCount = alcoholDates.filter((v) => {
    const dayOfWeek = today.getDay();

    const lastMonday = new Date(today);
    lastMonday.setDate(today.getDate() - (dayOfWeek + 6) % 7 - 7);
    lastMonday.setHours(0, 0, 0, 0);

    const lastSunday = new Date(lastMonday);
    lastSunday.setDate(lastMonday.getDate() + 6);
    lastSunday.setHours(23, 59, 59, 999);

    const vDate = new Date(v.date);
    return vDate >= lastMonday && vDate <= lastSunday;
  }).length;

  // 6번 박스
  const thisWeekDateCount = alcoholDates.filter((v) => {
    const dayOfWeek = today.getDay();

    const thisMonday = new Date(today);
    thisMonday.setDate(today.getDate() - (dayOfWeek + 6) % 7);
    thisMonday.setHours(0, 0, 0, 0);

    const thisSunday = new Date(thisMonday);
    thisSunday.setDate(thisMonday.getDate() + 6);
    thisSunday.setHours(23, 59, 59, 999);

    const vDate = new Date(v.date);
    return vDate >= thisMonday && vDate <= thisSunday;
  }).length;

  // etc functions

  return (
    <div className="grid grid-cols-2">
      {/* 1번 박스 - 일수 */}
      <div
        style={{ width: BOX_SIZE, height: BOX_SIZE }}
        className="bg-pink-300 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>금주한 지</div>
        <div>
          <span className="text-6xl">{diffDay}</span>
          <span className="mt-7">일</span>
        </div>
      </div>

      {/* 2번 박스 - 시간 */}
      <div
        style={{ width: BOX_SIZE, height: BOX_SIZE }}
        className="bg-violet-500 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>금주한 지</div>
        <div>
          <span className="text-6xl">{diffTime.diffHour}</span>
          <span className="mt-7 mr-2">시간</span>
          <span className="text-6xl">{diffTime.diffMin}</span>
          <span className="mt-7">분</span>
        </div>
      </div>

      {/* 3번 박스 - 평균 주량 */}
      <div
        style={{ width: BOX_SIZE, height: BOX_SIZE }}
        className="bg-blue-500 text-white flex justify-center items-center"
      >
        <div className="flex flex-col gap-2">
          <div>한번 마실때 평균</div>
          <div>
            <span className="mt-7 mr-2">소주</span>
            <span className="text-6xl">{sojuAverage}</span>
            <span className="mt-7">병</span>
          </div>
          <div>
            <span className="mt-7 mr-2">맥주</span>
            <span className="text-6xl">{beerAverage}</span>
            <span className="mt-7">ml</span>
          </div>
        </div>
      </div>

      {/* 4번 박스 - 1번 박스 * 3번 박스 * 술값으로 얼마 아꼈는지 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-amber-500 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>{diffDay}일 참아서</div>
        <div className="flex gap-2 ">
          <span className="text-6xl">{totalSavingMoney.toLocaleString()}</span>
          <span className="mt-7">원</span>
        </div>
        <div>절약했어요!</div>
      </div>

      {/* 5번 박스 - 저번주 주3일 성공여부 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-lime-500 text-white flex justify-center items-center flex-col gap-2 relative"
      >
        <div>지난 주는</div>
        <div className="flex gap-2">
          <span className="text-6xl">{lastWeekDateCount}</span>
          <span className="mt-7">일 마셨네요.</span>
        </div>
      </div>

      {/* 6번 박스 - 이번주 몇회 마셨는지 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-teal-500 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>이번 주는</div>
        <div className="flex gap-2">
          <span className="text-6xl">{thisWeekDateCount}</span>
          <span className="mt-7">일 마셨네요.</span>
        </div>
      </div>
    </div>
  );
}
