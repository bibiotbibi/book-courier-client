import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add book'
        address='add-book'
      />
      <MenuItem icon={MdHomeWork} label='My Book' address='my-inventory' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Orders'
        address='manage-orders'
      />
    </>
  )
}

export default SellerMenu
