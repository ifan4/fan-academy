
export const fetcher = async (url:string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`)
    console.log(res);
    if (!res.ok) {
      console.log(res);
      throw new Error('An error occurred while fetching the data.')
    }
   
    return res.json()
}
export const fetcherWithToken = async (url:string,accessToken:string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`,{
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    if (!res.ok) {
      console.log(res);
      throw new Error('An error occurred while fetching the data.')
    }
   
    return res.json()
}
export const fetcherFile = async (url:string,accessToken:string) => {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`,{
      headers: {
        Authorization: 'Bearer ' + accessToken,
        // 'content-type': 'application/pdf',
      }
    })
    .then( res => res.blob() )
    .then( blob => {
      var file = window.URL.createObjectURL(blob);
      window.open(file);
    })
    .catch(err=>{
      console.log(res);
      throw new Error('An error occurred while fetching the data.')
    })
    // if (!res.ok) {
    //   console.log(res);
    //   throw new Error('An error occurred while fetching the data.')
    // }
   
    // return res.json()
}