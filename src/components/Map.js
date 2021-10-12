import React, { useEffect, useRef, useCallback } from "react";

export default function BingMapsReact({
	bingMapsKey,
	height,
	onMapReady,
	polygonPoints,
	width,
}) {
	// refs
	const mapContainer = useRef(null);
	const map = useRef(null);

	function removePolygonPoints(map, Maps) {
		for (var i = map.entities.getLength() - 1; i >= 0; i--) {
			let polygons = map.entities.get(i);
			if (polygons instanceof Maps.Polygon) {
				map.entities.removeAt(i);
			}
		}
	}

	function addPolygonPoints(polygonPoints, map, Maps) {
		removePolygonPoints(map, Maps);
		const pointsList = [];
		console.log("map", polygonPoints);
		polygonPoints.forEach((point) => {
			if (!point) {
				return;
			}
			pointsList.push(new Maps.Location(point.lat, point.lon));
		});

		var polygon = new Maps.Polygon(pointsList, {
			// fillColor: "yellow",
			// strokeColor: "orange",
			// strokeThickness: 5,
			// strokeDashArray: [1, 2, 5, 10],
		});
		map.entities.push(polygon);
	}

	// make map, set options, add pins
	const makeMap = useCallback(() => {
		const { Maps } = window.Microsoft;

		// only make a new map if one doesn't already exist
		if (!map.current) {
			map.current = new Maps.Map(mapContainer.current, {
				credentials: bingMapsKey,
			});
		}
		if (polygonPoints.length > 0) {
			addPolygonPoints(polygonPoints, map.current, Maps);
		}
		if (polygonPoints.length === 0) {
			removePolygonPoints(map.current, Maps);
		}

		// set mapOptions, if any

		onMapReady && onMapReady();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [onMapReady, polygonPoints]);

	useEffect(() => {
		if (window.Microsoft && window.Microsoft.Maps) {
			makeMap();
		} else {
			const scriptTag = document.createElement("script");
			scriptTag.setAttribute("type", "text/javascript");
			scriptTag.setAttribute(
				"src",
				`https://www.bing.com/api/maps/mapcontrol?callback=makeMap`
			);
			scriptTag.async = true;
			scriptTag.defer = true;
			document.body.appendChild(scriptTag);
			window.makeMap = makeMap;
		}
	}, [makeMap]);

	return (
		<div ref={mapContainer} style={{ height: height, width: width }}></div>
	);
}
BingMapsReact.defaultProps = {
	bingMapsKey: null,
	height: "100%",
	width: "100%",
};
