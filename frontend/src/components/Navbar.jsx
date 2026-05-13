import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { user } = useAuth();
    return(
        <nav className='fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 pr-20 bg-[#4B2E2B]'>
            <div className='flex items-center gap-2'>
                <img src="/logo.png" alt="FinBear" className='w-12 h-12 rounded-full'/>
                <span style={{ fontFamily: "'Press Start 2P', cursive" }} className='text-base text-white'>FinBear</span>
            </div>
            <div className='flex gap-15'>
                <NavLink to='/' className='text-white text-lg nav-link'>Home</NavLink>
                <NavLink to='/belajar' className='text-white text-lg nav-link'>Belajar</NavLink>
                <NavLink to='/keuangan' className='text-white text-lg nav-link'>Keuangan</NavLink>
            </div>  
            <div className='flex items-center gap-2'>
                <img src="/coin.png" alt="coin" className='h-8 w-8'/>
                <span className='text-white'>{user?.points ?? 0}</span>
            </div>
        </nav>
    )
}

export default Navbar;