import { useEffect, useState } from "react";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const BOX_SIZE = 300;

interface SummaryProps {
  dates: Date[];
}

export default function Summary({ dates }: SummaryProps) {
  const today = new Date();

  // TODO - DB에서 받아온 술마신 날들 중 가장 마지막 날

  // 1, 2번 박스
  // const lastDate = dates[dates.length - 1].date;
  // const lastDay = new Date(lastDay);

  // const lastDay = new Date();
  const [lastDate, setLastDate] = useState<string>("");
  const lastDay = new Date(lastDate);
  const diffMs = Math.abs(today.getTime() - lastDay.getTime());
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMin = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffTime = { diffHour, diffMin };

  useEffect(() => {
    if (dates.length > 0) {
      setLastDate(dates[dates.length - 1].date);
    }
  }, [dates]);

  // 3번 박스
  // TODO - DB에서 받아와서 계산할 평균 용량
  const ex = {
    // 병단위
    soju: 1,
    // ml단위
    beer: 350,
  };

  // 4번 박스
  // TODO - DB에 저장해볼까
  // const wiseSaying = [
  //   "내가 또 술을 마시면 개다.",
  //   "간한테 미안하지도 않냐?",
  //   "간: 차라리 죽여줘...",
  //   "술마시면 하루가 날라간다.",
  //   "안마셔도 생각보다 괜찮다.",
  //   "마시고 후회할꺼 왜마시냐?",
  // ];
  // const randomWiseSaying =
  //   wiseSaying[Math.floor(Math.random() * wiseSaying.length)];

  // 5번 박스
  const [motive, setMotive] = useState<string>("건강해지기로 했잖아.");

  function handleChangeMotive(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;

    setMotive(value);
  }

  // 6번 박스
  const sojuPricePerOneBottle = 1700;
  const beerPricePerOneMl = 6;
  const sojuSavingMoney = sojuPricePerOneBottle * ex.soju;
  const beerSavingMoney = beerPricePerOneMl * ex.beer;
  const totalSavingMoney = (sojuSavingMoney + beerSavingMoney) * diffDay;

  // etc functions

  return (
    <div className="grid grid-cols-2">
      {/* 1번 박스 - 일수 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-pink-300 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>금주한지</div>
        <div>
          <span className="text-6xl">{diffDay}</span>
          <span className="mt-7">일</span>
        </div>
      </div>

      {/* 2번 박스 - 시간 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-violet-500 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>금주한지</div>
        <div>
          <span className="text-6xl">{diffTime.diffHour}</span>
          <span className="mt-7 mr-2">시간</span>
          <span className="text-6xl">{diffTime.diffMin}</span>
          <span className="mt-7">분</span>
        </div>
      </div>

      {/* 3번 박스 - 평균 주량 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-blue-500 text-white flex justify-center items-center"
      >
        <div className="flex flex-col gap-2">
          <div>한번 마실때</div>
          <div>
            <span className="mt-7 mr-2">소주</span>
            <span className="text-6xl">{ex.soju}</span>
            <span className="mt-7">병</span>
          </div>
          <div>
            <span className="mt-7 mr-2">맥주</span>
            <span className="text-6xl">{ex.beer}</span>
            <span className="mt-7">ml</span>
          </div>
        </div>
      </div>

      {/* 4번 박스 - 명언(같은 개소리) */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-amber-400 text-white flex justify-center items-center"
      >
        <div className="flex font-semibold gap-1">
          <RiDoubleQuotesL className="opacity-50" />
          {"내가 또 술을 마시면 개다."}
          <RiDoubleQuotesR className="opacity-50" />
        </div>
      </div>

      {/* 5번 박스 - 왜하냐(본인이 설정하는 동기부여) */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-gray-200 text-black flex justify-center items-center flex-col gap-4"
      >
        <div className="opacity-50">내가 금주를 왜 하기로 했지?</div>
        <input
          type="text"
          value={motive}
          onChange={handleChangeMotive}
          style={{ background: "none" }}
          className="focus:outline-none border-b border-black font-bold"
        />
      </div>

      {/* 6번 박스 - 1번 박스 * 3번 박스 * 술값으로 얼마 아꼈는지 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-emerald-500 text-white flex justify-center items-center flex-col gap-2"
      >
        <div>{diffDay}일 참아서</div>
        <div className="flex gap-2 ">
          <span className="text-6xl">{totalSavingMoney.toLocaleString()}</span>
          <span className="mt-7">원</span>
        </div>
        <div>절약했어요!</div>
      </div>
    </div>
  );
}
