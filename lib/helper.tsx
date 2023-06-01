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