import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';

const Login = () => {
  const [emailId, setEmailId] = useState('dubeyshekhar199@gmail.com');
  const [password, setPassword] = useState('Test@2025');
  const dispatch = useDispatch();
  const navigate = useNavigate(); //Never call a hook inside the function

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/login`,
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='flex justify-center'>
      <div className='card bg-base-100 w-96 shadow-sm'>
        <div className='card-body'>
          <h2 className='card-title justify-center'>Login</h2>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Email ID</legend>
            <input
              type='text'
              className='input'
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
            />
          </fieldset>
          <fieldset className='fieldset'>
            <legend className='fieldset-legend'>Password</legend>
            <input
              type='text'
              className='input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <div className='card-actions justify-center'>
            <button className='btn btn-primary' onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
