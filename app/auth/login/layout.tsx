import Header from "@/app/header";

interface Props {
    children: React.ReactNode;
}

export default function Layout({children}:Props) {
    

    return(
        <>
        <Header/>
        {children}
        </>
    )
}