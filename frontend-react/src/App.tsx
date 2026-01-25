import { Outlet } from 'react-router'
import './App.css'

export default function App() {
  return (
    <>
      <div className='h-screen w-full flex justify-center items-center'>
        <h1 className='p-6'>Prueba</h1>
      </div>
      <Outlet />
    </>
  )
}
