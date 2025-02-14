import { useEffect, useRef, useState } from "react";
import { FaAngleLeft, FaAngleRight, FaAnglesLeft, FaAnglesRight, FaPlus } from "react-icons/fa6";
import dayjs from "dayjs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AddModal from "./AddModal";
import { toast } from "react-toastify";

const DATE_FORMAT = "YYYY-MM-DD";
const WEEKDAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

interface CalendarProps {
  alcoholDates: AlcoholDate[];
}

export default function Calendar({ alcoholDates }: CalendarProps) {
  const today = new Date();

  // useRef
  const addModalRef = useRef<HTMLDivElement>(null);

  // useState
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [currentDate, setCurrentDate] = useState<Date>(today);

  const [addModalOpen, setAddModalOpen] = useState<boolean>(false);
  const [popupMenuOpen, setPopupMenuOpen] = useState<boolean>(false);

  const [isMouseEnterDay, setIsMouseEnterDay] = useState<string>("");

  // constants
  const currentMonthDates = alcoholDates.filter((v) => {
    const newDate = new Date(v.date);

    if (newDate.getFullYear() === currentYear && newDate.getMonth() === currentMonth) {
      return v;
    }
  });

  // useEffect
  useEffect(() => {
    function handleClickOutsideAddModal(event: MouseEvent) {
      if (addModalRef.current && !addModalRef.current.contains(event.target as Node)) {
        setAddModalOpen(false);
      }
    }

    if (addModalOpen) {
      document.addEventListener("click", handleClickOutsideAddModal);
    }

    return () => {
      document.removeEventListener("click", handleClickOutsideAddModal);
    };
  }, [addModalOpen]);

  // functions
  function handleClickAddButton(value: boolean) {
    const isDuplicateIndex = alcoholDates.findIndex((v) => {
      if (`${dayjs(currentDate).format("YYYY-MM-DD")}T23:00:00` === v.date) {
        return v;
      }
    });

    if (isDuplicateIndex !== -1) {
      toast("이미 기록되어있습니다.", { type: "warning" });
      return;
    }

    setAddModalOpen(value);
  }

  function handleRightClickDay(value: boolean) {
    setPopupMenuOpen(value);
  }

  function closeAddModal() {
    setAddModalOpen(false);
  }

  function handleMouseEnterDay(value: string) {
    setIsMouseEnterDay(value);
  }

  function handleMouseLeaveDay() {
    setIsMouseEnterDay("");
  }

  function isSelectedDate(day: string) {
    const currentDateformat = dayjs(currentDate).format(DATE_FORMAT);

    let selectedDay = currentDateformat.split("-")[2];

    if (selectedDay[0] === "0") {
      selectedDay = selectedDay[1];
    }

    return day === selectedDay;
  }

  function isSelectedMonth() {
    const currentDateformat = dayjs(currentDate).format(DATE_FORMAT);

    let selectedMonth = currentDateformat.split("-")[1];

    if (selectedMonth[0] === "0") {
      selectedMonth = selectedMonth[1];
    }

    return parseInt(selectedMonth, 10) === currentMonth + 1;
  }

  function movePrevMonth() {
    setCurrentMonth(currentMonth - 1);
  }

  function moveNextMonth() {
    setCurrentMonth(currentMonth + 1);
  }

  function movePrevYear() {
    setCurrentYear(currentYear - 1);
  }

  function moveNextYear() {
    setCurrentYear(currentYear + 1);
  }

  function handleClickDate(day: string) {
    if (day === " ") {
      return;
    }
    const yyyy = currentYear;
    const mm = currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
    const dd = parseInt(day, 10) < 10 ? `0${day}` : day;
    const formattedDate = `${yyyy}-${mm}-${dd}`;

    const newDate = new Date(formattedDate);

    setCurrentDate(newDate);
  }

  function getDayOfWeek(year: number, month: number, day: number) {
    return new Date(year, month, day).getDay();
  }

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startingDay = getDayOfWeek(currentYear, currentMonth, 1);
  const days = Array.from({ length: startingDay }, () => " ");

  Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach((day) => {
    days.push(day.toString());
  });

  // 우클릭시 브라우저에서 제공하는 메뉴 제거
  window.oncontextmenu = function () {
    return false;
  };

  return (
    <div className="">
      {/* 년월 선택 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-1">
          <div className="tooltip" data-tip="작년">
            <button type="button" onClick={movePrevYear} className="rounded-full p-3 hover:bg-gray-200">
              <FaAnglesLeft />
            </button>
          </div>
          <div className="tooltip" data-tip="이전 달">
            <button type="button" onClick={movePrevMonth} className="rounded-full p-3 hover:bg-gray-200">
              <FaAngleLeft />
            </button>
          </div>
        </div>

        <div className="text-center text-xl font-bold">
          {new Date(currentYear, currentMonth).toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </div>

        <div className="flex gap-1">
          <div className="tooltip" data-tip="다음 달">
            <button type="button" onClick={moveNextMonth} className="rounded-full p-3 hover:bg-gray-200">
              <FaAngleRight />
            </button>
          </div>
          <div className="tooltip" data-tip="내년">
            <button type="button" onClick={moveNextYear} className="rounded-full p-3 hover:bg-gray-200">
              <FaAnglesRight />
            </button>
          </div>
        </div>
      </div>

      {/* 일 선택 */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((weekday) => (
          <div key={weekday} className="flex items-center justify-center p-1 font-light text-gray-400">
            {weekday}
          </div>
        ))}

        {days.map((day, i) => {
          const key = `day_key_${i}`;

          let isAlcohol = false;

          currentMonthDates.forEach((v) => {
            const newDate = new Date(v.date);

            if (newDate.getDate() === Number(day)) {
              isAlcohol = true;
            }
          });

          const hoverdDay = currentMonthDates.find((v) => {
            const newDate = new Date(v.date);

            if (newDate.getDate() === Number(isMouseEnterDay)) {
              return v;
            }
          });

          return (
            <div key={key} className="relative">
              <div
                className={`${day === " " ? "cursor-default" : "cursor-pointer"}
                ${
                  isSelectedDate(day) && isSelectedMonth()
                    ? isAlcohol
                      ? "bg-red-500 text-white font-bold"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                    : isAlcohol
                    ? " hover:bg-gray-200 text-red-600 font-bold"
                    : "hover:bg-gray-200"
                }
                ${isSelectedDate(day) && isSelectedMonth() ? "" : ""}
                ${isSelectedMonth() && today.getDate() === Number(day) && "border border-gray-200"}
              
                relative overflow-hidden flex items-center justify-center rounded-full w-[100px] h-[100px] text-center transition-[background-color,color]`}
                onClick={(e) => {
                  e.preventDefault();
                  handleClickDate(day);
                  handleRightClickDay(false);
                }}
                onMouseEnter={() => {
                  if (isAlcohol) {
                    handleMouseEnterDay(day);
                  }
                }}
                onMouseLeave={handleMouseLeaveDay}
                onContextMenu={() => {
                  handleClickDate(day);
                  handleRightClickDay(true);
                }}
              >
                {day ?? ""}
                <div
                  className={`${
                    isMouseEnterDay === day ? "top-0" : "-top-[100px]"
                  } text-red-600 text-sm absolute w-full h-full transition-[top] bg-red-200 flex justify-center flex-col`}
                >
                  <span>🍾 {hoverdDay?.soju}병</span>
                  <span>🍺 {hoverdDay?.beer}ml</span>
                </div>
              </div>

              {/* 우클릭 메뉴 */}
              {popupMenuOpen && isSelectedMonth() && isSelectedDate(day) && (
                <ul className="absolute w-[100px] z-10 top-[75px] -right-[110px] bg-white shadow-lg rounded-lg border py-2">
                  <li className="py-2 flex items-center justify-center cursor-pointer hover:bg-gray-200 border-b">
                    수정
                  </li>
                  <li className="py-2 flex items-center justify-center cursor-pointer hover:bg-gray-200">삭제</li>
                </ul>
              )}
            </div>
          );
        })}
      </div>

      <button
        data-tooltip-id="add-button"
        data-tooltip-content="결국 술을 마셨구나..."
        data-tooltip-place="top"
        onClick={() => {
          handleClickAddButton(true);
        }}
        className="bottom-16 right-16 absolute shadow-gray-400 shadow-md p-4 rounded-full bg-blue-500 text-white active:shadow-none transition-all hover:bg-blue-600 active:bottom-[62px]"
      >
        <FaPlus />
      </button>

      {addModalOpen && (
        <div className="absolute bottom-[116px] right-[116px]" ref={addModalRef}>
          <AddModal currentDate={currentDate} closeAddModal={closeAddModal} />
        </div>
      )}

      {/* 툴팁 */}
      <ReactTooltip id="add-button"></ReactTooltip>
    </div>
  );
}
