import AdminStatistics from '../../../components/Dashboard/Statistics/AdminStatistics'
import CustomerStatistics from '../../../Components/Dashboard/Statistics/CustomerStatistics'
import SellerStatistics from '../../../Components/Dashboard/Statistics/SellerStatistics'
import useRole from '../../../hooks/useRole'
const Statistics = () => {
  const [role, isRoleLoading] = useRole()
  if (isRoleLoading) return <p>Loading...</p>
  return (
    <div>
      {role === 'customer' && <CustomerStatistics />}
      {role === 'seller' && <SellerStatistics />}
      {role === 'admin' && <AdminStatistics />}
    </div>
  )
}

export default Statistics
