import Link from "next/link";


export default function Home() {
  return (
    <main className="">
      
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-300 ">
      <div className="max-w-md p-6 b rounded-md shadow-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Welcome to Note App</h1>
        <p className="text-gray-700 text-center mb-8">
          Start organizing your thoughts, ideas, and tasks with ease. 
          Create, edit, and manage your notes effortlessly.
        </p>
        <div className="max-w-md p-6 bg-white rounded-md shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 ">Note App</h1>
        <p className="text-gray-700 mb-8">Your go-to place for notes</p>
        <Link href="/login"><button className=" bg-black text-yellow-600 p-2 rounded-md">Login</button></Link>

      </div>
      </div>
    </div>
    </main>
    
  )
}
