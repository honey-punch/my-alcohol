import { useEffect, useRef, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaPlus,
} from "react-icons/fa6";
import dayjs from "dayjs";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AddModal from "./AddModal";

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

  const [isMouseEnterDay, setIsMouseEnterDay] = useState<string>("");

  // constants
  const currentMonthDates = alcoholDates.filter((v) => {
    const newDate = new Date(v.date);

    if (
      newDate.getFullYear() === currentYear &&
      newDate.getMonth() === currentMonth
    ) {
      return v;
    }
  });

  // useEffect
  useEffect(() => {
    function handleClickOutsideAddModal(event: MouseEvent) {
      if (
        addModalRef.current &&
        !addModalRef.current.contains(event.target as Node)
      ) {
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
    setAddModalOpen(value);
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
    const mm =
      currentMonth + 1 < 10 ? `0${currentMonth + 1}` : currentMonth + 1;
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

  return (
    <div
      className=""
      onMouseDown={(e) => {
        e.preventDefault();
      }}
    >
      {/* 년월 선택 */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex gap-1">
          <div className="tooltip" data-tip="작년">
            <button
              type="button"
              onClick={movePrevYear}
              className="rounded-full p-3 hover:bg-gray-200"
            >
              <FaAnglesLeft />
            </button>
          </div>
          <div className="tooltip" data-tip="이전 달">
            <button
              type="button"
              onClick={movePrevMonth}
              className="rounded-full p-3 hover:bg-gray-200"
            >
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
            <button
              type="button"
              onClick={moveNextMonth}
              className="rounded-full p-3 hover:bg-gray-200"
            >
              <FaAngleRight />
            </button>
          </div>
          <div className="tooltip" data-tip="내년">
            <button
              type="button"
              onClick={moveNextYear}
              className="rounded-full p-3 hover:bg-gray-200"
            >
              <FaAnglesRight />
            </button>
          </div>
        </div>
      </div>

      {/* 일 선택 */}
      <div className="grid grid-cols-7 gap-1">
        {WEEKDAYS.map((weekday) => (
          <div
            key={weekday}
            className="flex items-center justify-center p-1 font-light text-gray-400"
          >
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

          return (
            <div
              key={key}
              className={`${day === " " ? "cursor-default" : "cursor-pointer"}
              ${
                isSelectedDate(day) && isSelectedMonth()
                  ? isAlcohol
                    ? "bg-red-500 hover:bg-red-600 text-white font-bold"
                    : "bg-blue-500 hover:bg-blue-600 text-white"
                  : isAlcohol
                  ? " hover:bg-gray-200 text-red-600 font-bold"
                  : "hover:bg-gray-200 "
              }

              ${isSelectedDate(day) && isSelectedMonth() ? "" : ""}
              
              relative flex items-center justify-center rounded-full w-[100px] h-[100px] text-center transition-[background-color,color]`}
              onClick={(e) => {
                e.preventDefault();
                handleClickDate(day);
              }}
              onMouseEnter={() => {
                if (isAlcohol) {
                  handleMouseEnterDay(day);
                }
              }}
              onMouseLeave={handleMouseLeaveDay}
            >
              {day ?? ""}

              <div
                className={`${
                  isMouseEnterDay === day && "slide-down"
                } absolute top-[-10px] overflow-hidden inset-0`}
              >
                123
              </div>
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
        <div
          className="absolute bottom-[116px] right-[116px]"
          ref={addModalRef}
        >
          <AddModal />
        </div>
      )}

      {/* 툴팁 */}
      <ReactTooltip id="add-button"></ReactTooltip>
    </div>
  );
}
