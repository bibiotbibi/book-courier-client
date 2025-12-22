import { Navigate } from 'react-router'
import useRole from '../hooks/useRole'

const AdminRoute = ({ children }) => {
  const [role, isRoleLoading] = useRole()

  if (isRoleLoading) return<div>
      <span className="loading loading-spinner loading-xl"></span>
  </div>
  if (role === 'admin') return children
  return <Navigate to='/' state={location.pathname} replace='true' />
}

export default AdminRoute;
