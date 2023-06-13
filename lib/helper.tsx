import { useEffect, useState } from "react";

export const convertDate = (dateInit: string)=>{
	if (dateInit.includes('T')){
		const newDate = new Date(dateInit);
		const month = newDate.toLocaleString("default", { month: "long" });
		const day = newDate.toLocaleString("default", { day: "numeric" });
		const dayword = newDate.toLocaleString("default", { weekday: "long" });
		const year = newDate.toLocaleString("default", { year: "numeric" });
		const time = newDate.toLocaleTimeString();

		return `${month}, ${day} ${year}
		${dayword} ${time}`;
	}
	return ''
}

export const textTrunc = (text:string,length:number)=>{
	let tempText:string
        if (text.length > length){
            tempText = text.substring(0,length) + '...'
            return tempText
        }
        return text
}

const useDeviceSize = () => {
	const [width, setWidth] = useState<number | undefined>()
	const [height, setHeight] = useState<number | undefined>()
  
	const handleWindowResize = () => {
	  setWidth(window.innerWidth);
	  setHeight(window.innerHeight);
	}
  
	useEffect(() => {
	  // component is mounted and window is available
	  handleWindowResize();
	  window.addEventListener('resize', handleWindowResize);
	  // unsubscribe from the event on component unmount
	  return () => window.removeEventListener('resize', handleWindowResize);
	}, []);
  
	return [width, height]
  
  }
  
  export default useDeviceSize 

