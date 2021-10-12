import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
function CoordinateForm(props) {
	console.log(props);
	const [point, setPoint] = useState({ lat: 0, lon: 0 });
	const handleClick = (event) => {
		props.addpoint(point);
		setPoint({ lat: 0, lon: 0 });
	};
	const handleClear = (event) => {
		props.clearList();
	};
	const handleInputChange = (event) => {
		const target = event.target;
		const value = parseFloat(target.value);
		if (isNaN(value)) {
			return;
		}
		const name = target.name;
		setPoint((prepoint) => ({
			...prepoint,
			[name]: value,
		}));
		// setPoint(point[name]=value);
		console.log("pt", point);
	};

	return (
		<Paper>
			<TextField
				id="outlined-basic"
				label="lat"
				name="lat"
				variant="outlined"
				type="number"
				value={point.lat}
				onChange={handleInputChange}
			/>
			<TextField
				id="outlined-basic"
				label="lon"
				name="lon"
				type="number"
				variant="outlined"
				value={point.lon}
				onChange={handleInputChange}
			/>
			<Button onClick={handleClick}>add</Button>
			<Button onClick={handleClear}>clear</Button>
		</Paper>
	);
}
export default CoordinateForm;
