import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";

const BOX_SIZE = 300;

export default function Summary() {
  const today = new Date();

  // TODO - DB에서 받아온 술마신 날들 중 가장 마지막 날
  const lastDay = new Date("2025-02-08T22:00:00");

  // 1, 2번 박스
  const diffMs = Math.abs(today.getTime() - lastDay.getTime());
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMin = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffTime = { diffHour, diffMin };

  // 3번 박스
  // TODO - DB에서 받아와서 계산할 평균 용량
  const ex = {
    // 병단위
    soju: 1,
    // cc단위
    beer: 350,
  };

  // 4번 박스
  // TODO - DB에 저장해볼까
  const wiseSaying = [
    "내가 또 술을 마시면 개다.",
    "간한테 미안하지도 않냐?",
    "간: 차라리 죽여줘...",
    "술마시면 하루가 날라간다.",
    "안마셔도 생각보다 괜찮다.",
    "마시고 후회할꺼 왜마시냐?",
  ];
  const randomWiseSaying =
    wiseSaying[Math.floor(Math.random() * wiseSaying.length)];

  return (
    <div className="grid grid-cols-2">
      {/* 1번 박스 - 일수 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-pink-300 text-white flex justify-center items-center"
      >
        <span className="text-6xl">{diffDay}</span>
        <span className="mt-7">일</span>
      </div>

      {/* 2번 박스 - 시간 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-violet-500 text-white flex justify-center items-center"
      >
        <span className="text-6xl">{diffTime.diffHour}</span>
        <span className="mt-7 mr-2">시간</span>
        <span className="text-6xl">{diffTime.diffMin}</span>
        <span className="mt-7">분</span>
      </div>

      {/* 3번 박스 - 평균 주량 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-blue-500 text-white flex justify-center items-center"
      >
        <div className="flex flex-col">
          <div>
            <span className="text-6xl">🍾-</span>
            <span className="text-6xl">{ex.soju}</span>
            <span className="mt-7">병</span>
          </div>
          <div>
            <span></span>
            <span className="text-6xl">{ex.beer}</span>
            <span className="mt-7">cc</span>
          </div>
        </div>
      </div>

      {/* 4번 박스 - 명언(같은 개소리) */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-amber-400 text-white flex justify-center items-center text-3xl"
      >
        <div className="flex text-lg font-semibold gap-1">
          <RiDoubleQuotesL className="opacity-40" />
          {randomWiseSaying}
          <RiDoubleQuotesR className="opacity-40" />
        </div>
      </div>

      {/* 5번 박스 - 왜하냐(본인이 설정하는 동기부여) */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-gray-200 text-white flex justify-center items-center text-3xl"
      ></div>

      {/* 6번 박스 - 1번 박스 * 3번 박스 * 술값으로 얼마 아꼈는지 */}
      <div
        style={{ width: `${BOX_SIZE}px`, height: BOX_SIZE }}
        className="bg-emerald-500 text-white flex justify-center items-center text-3xl"
      ></div>
    </div>
  );
}
