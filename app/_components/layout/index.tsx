import { Outlet } from 'react-router-dom'
import { Header, Leftbar, Rightbar, Footer } from '../../components'

const Layout = () => {
  return (
    <>
    <Header />
    <div className="grid grid-cols-4">
      <Leftbar />
      <div className="col-span-2 p-4">
        <Outlet />
      </div>
      <Rightbar />
    </div>
    <Footer />
    </>
  )
}

export default Layout
