import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { removeUser } from '../utils/userSlice';

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      axiosInstance.post('/logout', {});
      dispatch(removeUser());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='navbar shadow-sm bg-[#f0ffff]'>
      <div className='flex-1'>
        <Link to='/feed' className='text-xl mx-2 not-italic font-medium'>
          👨‍💼 DevTinder
        </Link>
      </div>
      {user && (
        <div className='flex gap-2'>
          <p className='font-light flex justify-center text-center items-center'>
            Welcome, {user?.firstName}
          </p>
          <div className='dropdown dropdown-end mx-5'>
            <div
              tabIndex={0}
              role='button'
              className='btn btn-ghost btn-circle avatar'
            >
              <div className='w-10 rounded-full'>
                <img alt='Tailwind CSS Navbar component' src={user?.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow'
            >
              <li>
                <Link to='/profile' className='justify-between'>
                  Profile
                  <span className='badge'>New</span>
                </Link>
              </li>
              <li>
                <Link to='/setting'>Settings</Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <Link to='/requests'>Requests</Link>
              </li>
              <li>
                <Link to='/feed'>Feed</Link>
              </li>
              <li>
                <Link to='/premium'>Premium</Link>
              </li>
              <li onClick={handleLogout}>
                <Link>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
