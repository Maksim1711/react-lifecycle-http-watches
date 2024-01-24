import { useRef, useState } from "react";
import Watch from "./Watch";
export interface Iwatches {
	name: string | null,
	zone: any,
	remove?: Function,
}
export default function WatchContainer() {
	let inputName: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	let inputZone: React.RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);
	let [watches, setWatches] = useState<Iwatches[]>([{
		name: null,
		zone: null,
	}])
	let watchList
	const createWacth = (e: React.FormEvent) => {
		e.preventDefault()
		setWatches((prevWatches: Iwatches[]): Iwatches[] => {
			if (inputName.current !== null && inputZone.current !== null) {
				if (inputName.current.value === '') {
					return [...prevWatches]
				}
				return ([...prevWatches, {
					name: inputName.current.value,
					zone: inputZone.current.value
				}])
			} else return [...prevWatches]
		})
	}

	watchList = watches.map((el) => {
		debugger
		return <Watch
			name={el.name}
			zone={el.zone}
			remove={removeWatch}
			key={Math.random() * 3568}
		/>
	})
	function removeWatch(watchName: string) {
		setWatches((prevWatches: Iwatches[]): Iwatches[] => {
			return ([...prevWatches].filter(item => item.name !== watchName))
		})
	}
	watchList = watches.map((el) => {
		return <Watch
			name={el.name}
			zone={el.zone}
			remove={removeWatch}
			key={Math.random() * 3568}
		/>
	})
	return (
		< >
			<form name='watches' className='name_watches_form' onSubmit={createWacth}>
				<div className='name_wrapper'>
					<label htmlFor="name">Название</label>
					<input name="name" type="text" ref={inputName} />
				</div>
				<div className='zone_wrapper'>
					<label htmlFor="zone">Временная зона</label>
					<input name="zone" type='text' ref={inputZone} placeholder="Example 3" />
				</div>
				<div className='button_wrapper'>
					<button type='submit'>Добавить</button>
				</div>
			</form>
			<div className='watches_wrapper'>
				{watchList}
			</div>
		</>
	);
}