import Head from 'next/head'
import Header from '../Components/Header'
import Task from "../Components/Task";
import {useState} from "react";

function Tasks({data}) {
    const [title, setTitle] = useState("")

    const handleSubmit = async (event) => {
        event.preventDefault()

        const jsonData = JSON.stringify({title})

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: jsonData,
        }

        const response = await fetch("/api/tasks/create", options)

        const result = await response.json()

        setTitle('')

        data.push(result)
    }

    return (
        <div>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <Header/>

            <main className="max-w-7xl mx-auto px-4 sm:px-6">

                <div className="max-w-3xl mx-auto">
                    <Task tasks={data}/>
                </div>

                <form className="max-w-3xl mx-auto mt-10" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Title
                        </label>
                        <div className="mt-1">
                            <input
                                id="title"
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                type="text"
                                autoComplete="title"
                                required
                                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div className="mt-5">
                        <button
                            type="submit"
                            className="items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 active:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring ring-gray-300 disabled:opacity-25 transition ease-in-out duration-150"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </main>

            <footer>

            </footer>
        </div>
    )
}

export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:3000/api/tasks`)
    const jsonData = await res.json()

    return {
        props: {
            data: jsonData.data
        }
    }
}

export default Tasks;
