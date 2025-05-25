import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { addUser } from '../utils/userSlice';
import Footer from './Footer';
import GlobalLoader from './GlobalLoader';
import NavBar from './NavBar';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const fetchUser = async () => {
    try {
      if (userData) return;
      const user = await axiosInstance.get('/profile/view');
      dispatch(addUser(user?.data));
    } catch (err) {
      if (err.status === 401) {
        navigate('/login');
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
     <NavBar />
      <GlobalLoader />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
