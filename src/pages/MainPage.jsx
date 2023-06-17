import { AdminView, ExternalView, Navbar } from "../components"

export const MainPage = () => {

  const { role } = JSON.parse(localStorage.getItem("user")) || [];

  return (
    <>
      <Navbar />
      {role === 1 ? (<AdminView />) : (<ExternalView />)}
    </>
  )
}
