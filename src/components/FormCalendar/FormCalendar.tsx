import { useEffect, useState } from "react";

import { parse } from "date-fns";
import DatePicker from "react-datepicker";

import FormError from "../FormError/FormError";

import "react-datepicker/dist/react-datepicker.css";
import "./styles/form-calendar.css";

type DateRange = [Date | undefined, Date | undefined];

export interface IDateRange {
	initial: string | null;
	final: string | null;
}

function generateDateRange({ initial, final }: IDateRange): DateRange {
	const initialDate = initial
		? parse(initial, "yyyy-MM-dd", new Date())
		: undefined;
	const finalDate = final ? parse(final, "yyyy-MM-dd", new Date()) : undefined;

	return [initialDate, finalDate];
}

interface FormCalendar {
	handleChange: (e: IDateRange) => void;
	dates?: IDateRange;
	error?: string;
	excludeDates?: Date[];
	renderDayContents?: (day: number, date: Date) => JSX.Element;
}

const FormCalendar = ({
	handleChange,
	dates = {} as IDateRange,
	error = "",
	excludeDates = [],
	renderDayContents,
}: FormCalendar) => {
	const [dateRange, setDateRange] = useState(generateDateRange(dates));

	useEffect(() => {
		const formatedDates = generateDateRange({
			initial: dates.initial,
			final: dates.final,
		});

		setDateRange(formatedDates);
	}, [dates]);

	useEffect(() => {
		handleContainerSize();

		return () => {
			window.removeEventListener("resize", () => {});
		};
	}, []);

	function handleContainerSize() {
		const $formCalendar = document.querySelectorAll(".form-calendar");

		$formCalendar.forEach((calendar) => {
			if (calendar.parentElement?.clientWidth < 1000) {
				calendar.classList.add("vertical");
			} else {
				calendar.classList.remove("vertical");
			}
		});

		window.addEventListener("resize", () => {
			$formCalendar.forEach((calendar) => {
				if (calendar?.parentElement?.clientWidth < 1000) {
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
				startDate={dateRange[0]}
				endDate={dateRange[1]}
				onChange={(values) => {
					setDateRange(values);

					handleChange({ initial: values[0], final: values[1] });
				}}
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
