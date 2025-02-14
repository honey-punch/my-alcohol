import { useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
  FaPlus,
} from "react-icons/fa6";
import dayjs from "dayjs";
import { Tooltip as ReactTooltip } from "react-tooltip";

const DATE_FORMAT = "YYYY-MM-DD";

interface CalendarProps {
  addModalOpen: boolean;
  handleClickAddButton: (value: boolean) => void;
}

export default function Calendar({
  addModalOpen,
  handleClickAddButton,
}: CalendarProps) {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [currentDate, setCurrentDate] = useState<Date>(today);

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // functions
  function handleClickAddButton(value: boolean) {
    setAddModalOpen(value);
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
        {weekdays.map((weekday) => (
          <div
            key={weekday}
            className="flex items-center justify-center p-1 font-light text-gray-400"
          >
            {weekday}
          </div>
        ))}

        {days.map((day, i) => {
          const key = `day_key_${i}`;

          return (
            <div
              key={key}
              className={`${
                day === " "
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-gray-100"
              }
              ${
                isSelectedDate(day) &&
                isSelectedMonth() &&
                "bg-blue-500 text-white hover:bg-blue-600"
              } flex items-center justify-center rounded-full w-[100px] h-[100px] text-center transition-[background-color]`}
              onClick={(e) => {
                e.preventDefault();
                handleClickDate(day);
              }}
            >
              {day ?? ""}
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
        className="bottom-16 right-16 absolute shadow-gray-400 shadow-md p-4 rounded-full bg-blue-500 text-white active:shadow-none transition-all active:bottom-[62px]"
      >
        <FaPlus />
      </button>

      <ReactTooltip id="add-button"></ReactTooltip>
    </div>
  );
}
