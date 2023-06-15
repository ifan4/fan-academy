import Header from "@/app/header";

interface Props {
    children: React.ReactNode;
}

export default function Layout({children}:Props) {
    

    return(
        <>
        <Header/>
        <div className="lg:flex justify-center items-center">
            {children}
        </div>
        </>
    )
}