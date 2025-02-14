import { useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaAnglesLeft,
  FaAnglesRight,
} from "react-icons/fa6";
import dayjs from "dayjs";

const DATE_FORMAT = "YYYY-MM-DD";

export default function Calendar() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  const [currentDate, setCurrentDate] = useState<Date>(today);

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  // functions
  function getDayOfWeek(year: number, month: number, day: number) {
    return new Date(year, month, day).getDay();
  }

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
  }

  function isSelectedDate(day: string) {
    const currentDateformat = dayjs(currentDate).format(DATE_FORMAT);

    let selectedDay = currentDateformat.split("-")[2];

    console.log(selectedDay);

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

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const startingDay = getDayOfWeek(currentYear, currentMonth, 1);
  const days = Array.from({ length: startingDay }, () => " ");

  Array.from({ length: daysInMonth }, (_, i) => i + 1).forEach((day) => {
    days.push(day.toString());
  });

  // functions
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

  function handleDateSelect(day: string) {
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

  return (
    <div
      className="w-[700px]"
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
              } ${
                (isSelectedDate(day) &&
                  isSelectedMonth() &&
                  "bg-adams-500 text-white hover:bg-adams-600",
                "flex items-center justify-center rounded-full p-4 text-center transition-[background-color]")
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleDateSelect(day);
              }}
            >
              {day ?? ""}
            </div>
          );
        })}
      </div>
    </div>
  );
}
