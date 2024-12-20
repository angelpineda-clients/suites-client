import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function Loader() {
	return (
		<Backdrop
			sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 999999 })}
			open={true}
		>
			<CircularProgress color="inherit" />
		</Backdrop>
	);
}
