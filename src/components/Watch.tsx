import { useState, useEffect } from "react";
import { Iwatches } from "./WatchContainer"
export default function Watch({ name, zone, remove }: Iwatches) {

	let interval = 1000;
	let day: Date = new Date()
	let tickTack: string | number | undefined | ReturnType<typeof setTimeout>
	if (zone) {
		day.setUTCHours(zone)
	}
	let [clock, setClock] = useState({
		hh: day.getHours() * 30,
		mm: day.getMinutes() * 6,
		ss: day.getSeconds() * 6,
	})

	useEffect(() => {
		clearInterval(tickTack)
	}, [interval])
	if (!name) {
		return
	}

	let styleHr = {
		transform: `rotateZ(${(clock.hh) + (clock.mm / 12)}deg)`
	}
	let styleMm = {
		transform: `rotateZ(${clock.mm}deg)`
	}
	let styleSs = {
		transform: `rotateZ(${clock.ss}deg)`
	}
	tickTack = setInterval(() => {
		setClock({
			hh: day.getHours() * 30,
			mm: day.getMinutes() * 6,
			ss: day.getSeconds() * 6,
		})
		styleHr = {
			transform: `rotateZ(${(clock.hh) + (clock.mm / 12)}deg)`
		};
		styleMm = {
			transform: `rotateZ(${clock.mm}deg)`
		};
		styleSs = {
			transform: `rotateZ(${clock.mm}deg)`
		}
	}, interval)
	
	return (
		<div className="watch_wrapper" key={name}>
			<header className="watch_header">{name}</header>
			<div className="clock" key={name}>
				<div className="hour">
					<div className="hr" id="hr" style={styleHr}></div>
				</div>
				<div className="min">
					<div className="mn" id="mn" style={styleMm}></div>
				</div>
				<div className="sec">
					<div className="sc" id="sc" style={styleSs}></div>
				</div>
			</div>
			<button className="btn_close_watch" onClick={() => {
				interval = 0
				if (remove) remove(name);
			}}>&#10007;</button>
		</div>)
}