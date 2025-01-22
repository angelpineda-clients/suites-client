import { useEffect, useState } from "react";

import { format, parse } from "date-fns";
import DatePicker from "react-datepicker";

import { IDateRange } from "./interfaces/IFormCalendar";

import FormError, { formHookError } from "../FormError/FormError";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/form-calendar.css";

type DateRange = Date | null;

interface FormCalendar {
	handleChange: (e: IDateRange) => void;
	dates?: IDateRange;
	error?: formHookError;
	excludeDates?: Date[];
	renderDayContents?: (day: number, date: Date) => JSX.Element;
}

// todo: move to another file
function generateDateRange({ start, end }: IDateRange): DateRange[] {
	const initialDate = start ? parse(start, "yyyy-MM-dd", new Date()) : null;
	const finalDate = end ? parse(end, "yyyy-MM-dd", new Date()) : null;

	return [initialDate, finalDate];
}

const DATE_FORMAT = "yyyy-MM-dd";

const FormCalendar = ({
	handleChange,
	dates = {} as IDateRange,
	error = "",
	excludeDates = [],
	renderDayContents,
}: FormCalendar) => {
	const [dateRange, setDateRange] = useState<DateRange[]>(
		generateDateRange(dates)
	);

	useEffect(() => {
		const formatedDates = generateDateRange({
			start: dates.start,
			end: dates.end,
		});

		setDateRange(formatedDates);
	}, [dates]);

	useEffect(() => {
		handleContainerSize();

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	function onHandleCalendarChange(values: DateRange[]) {
		const start: string | null = values[0]
			? format(values[0], DATE_FORMAT)
			: null;
		const end: string | null = values[1]
			? format(values[1], DATE_FORMAT)
			: null;

		setDateRange(values);
		handleChange({ start, end });
	}

	function handleContainerSize() {
		const $formCalendar = document.querySelectorAll(".form-calendar");

		$formCalendar.forEach((calendar) => {
			if (
				calendar.parentElement &&
				calendar.parentElement?.clientWidth < 1000
			) {
				calendar.classList.add("vertical");
			} else {
				calendar.classList.remove("vertical");
			}
		});

		window.addEventListener("resize", () => {
			$formCalendar.forEach((calendar) => {
				if (
					calendar.parentElement &&
					calendar?.parentElement?.clientWidth < 1000
				) {
					calendar.classList.add("vertical");
				} else {
					calendar.classList.remove("vertical");
				}
			});
		});
	}

	return (
		<div
			className="form-calendar"
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<label
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				<span>Check-in</span> <span>Check-out</span>
			</label>

			<DatePicker
				minDate={new Date()}
				startDate={dateRange[0] || undefined}
				endDate={dateRange[1] || undefined}
				onChange={onHandleCalendarChange}
				renderDayContents={renderDayContents}
				excludeDates={excludeDates}
				monthsShown={2}
				dateFormat="yyyy/MM/dd"
				selectsRange
				isClearable
			/>

			{error && <FormError text={error} />}
		</div>
	);
};

export default FormCalendar;
