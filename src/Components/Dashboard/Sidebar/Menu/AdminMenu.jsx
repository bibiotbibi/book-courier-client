import { FaUserCog } from 'react-icons/fa'
import MenuItem from './MenuItem'
import { FaBook } from "react-icons/fa6";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label='All Users' address='manage-users' />
      <MenuItem icon={FaBook} label='Manage Books' address='manage-books' />
      <MenuItem icon={FaBook} label='Seller Request' address='seller-request' />
    </>
  )
}

export default AdminMenu
