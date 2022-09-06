import '../styles/globals.css'
import Header from "../Components/Header";

function MyApp({Component, pageProps}) {
    return (
        <>
            <Header/>
            <main className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <Component {...pageProps} />
            </main>
        </>
    )
}

export default MyApp
