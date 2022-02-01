import React, { useState, useEffect } from "react";
import "./style.css";
import WeatherDetails from "./WeatherDetails";

const SearchMain = () => {
	const [searchTerm, setSearchTerm] = useState("berlin");

	const [tempInfo, setTempInfo] = useState({});

	const getWeatherInfo = async () => {
		try {
			let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=56f6b53f0dc1779531c68a5210d6ff86`;

			let res = await fetch(url);
			let data = await res.json();
			const { temp, humidity, pressure } = data.main;
			const { main: weatherType } = data.weather[0];
			const { name } = data;
			const { speed } = data.wind;
			const { country, sunset } = data.sys;

			const myNewWeatherInfo = {
				temp,
				humidity,
				pressure,
				weatherType,
				name,
				speed,
				country,
				sunset,
			};

			setTempInfo(myNewWeatherInfo);

			// console.log(data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getWeatherInfo();
	}, []);

	
    return (
		<>
			<div className="wrap">
				<div className="search">
					<input className="search-input"
						type="search"
						placeholder="Search city..."
						id="search"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button className="searchButton" onClick={getWeatherInfo}>
						Search
					</button>
				</div>
			</div>
			<WeatherDetails {...tempInfo} />
		</>
	);
};

export default SearchMain;
