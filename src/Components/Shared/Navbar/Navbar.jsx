import React, { } from 'react';
import { Link, NavLink } from 'react-router';
import useAuth from '../../../hooks/useAuth';
import Profile from '../../../pages/Dashboard/Common/Profile';

const Navbar = () => {

    const {user, logOut } = useAuth();
   
    const handleLogOut = () => {
        logOut()
         .then(result => {
                console.log(result.user);
            })
            .catch(error => {
                console.log(error)
            })
    }
   

    const links = <>
        <li> <NavLink to="/" >Home</NavLink></li>
        <li> <NavLink to="/all-books">All Books</NavLink></li>
        <li> <NavLink to="/dashboard">Dashboard</NavLink></li>
        <li> <NavLink to="/covarage">Coverage</NavLink></li>
        <li> <NavLink to="/wishlist">wishlist</NavLink></li>
       
    </>;

    return (
        <div className="navbar bg-secondary shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                  <Link to='/'>
                <img className='w-10' src="https://i.ibb.co.com/GvY2DJ2M/Screenshot-9-removebg-preview.png" alt="" />
                  </Link>
                <a className="text-primary text-xl font-semibold font-serif">BookCourier</a>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {links}
                </ul>
            </div>
            

            <div className="navbar-end flex items-center gap-4">

              <div className=''>
                 <Link to='/dashboard/profile' className='relative block'>
            <img
              src={user?.photoURL}
              alt=''
              className='mx-auto object-cover rounded-full h-12 w-12  border-2 border-white '
            />
          </Link>
              </div>
                {
                    user? 
                    <a onClick={handleLogOut} ><button className="btn bg-primary hover:text-white text-secondary">Log Out</button> </a>
                    :
                    <Link to='login'> <button className="btn bg-primary hover:text-white text-secondary">Login</button> </Link>


                }
                
                
              
            </div>
        </div>
    );
};

export default Navbar;
