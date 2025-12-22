import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'

const SellerRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return<div>
      <span className="loading loading-spinner loading-xl"></span>
  </div>
  if (role === 'seller') return children
  return <Navigate to='/' state={location.pathname} replace='true' />
}

export default SellerRoute;
