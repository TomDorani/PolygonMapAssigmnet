import React, { useState } from "react";
import "./App.css";
import BingMapsReact from "./components/Map";
import MainLayout from "./components/MainLayout";

function App() {
	const [pointList, setPointList] = useState([]);
	const addPoint = (point) => {
		setPointList([...pointList, point]);
	};

	const clearList = () => {
		setPointList([]);
	};
	const apiKey = "";
	return (
		<div className="App">
			<MainLayout addPoint={addPoint} clearList={clearList}>
				<div className="map__container">
					<BingMapsReact polygonPoints={pointList} bingMapsKey={apiKey} />
				</div>
			</MainLayout>
		</div>
	);
}

export default App;
