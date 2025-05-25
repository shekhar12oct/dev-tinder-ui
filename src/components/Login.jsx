import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); //Never call a hook inside the function

  const handleLogin = async () => {
    try {
      const res = await axiosInstance.post('/login', {
        emailId,
        password,
      });
      dispatch(addUser(res?.data?.data));
      return navigate('/feed');
    } catch (err) {
      setError(err?.response?.data ?? 'Something went wrong');
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axiosInstance.post('signup', {
        firstName,
        lastName,
        emailId,
        password,
      });
      dispatch(addUser(res?.data));
      return navigate('/feed');
    } catch (err) {
      setError(err?.response?.data ?? 'Something went wrong');
    }
  };

  return (
    <div className='flex justify-center items-center h-full'>
      <div className='card w-96 shadow-lg bg-[#bcc2c114] h-90'>
        <div className='card-body'>
          <h2 className='card-title justify-center'>
            {isLoginForm ? 'Login' : 'Singup'}
          </h2>
          {!isLoginForm && (
            <>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>First Name</legend>
                <input
                  type='text'
                  className='input'
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Last Name</legend>
                <input
                  type='text'
                  className='input'
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
            </>
          )}
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
          <p className='text-red-500'>{error}</p>
          <div className='card-actions justify-center'>
            <button
              className='btn btn-primary'
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? 'Login' : 'Register'}
            </button>
          </div>
          <p
            className='m-auto cursor-pointer py-2 hover:text-[#ffffff]'
            onClick={() => {
              setError('');
              setIsLoginForm((value) => !value);
            }}
          >
            {isLoginForm
              ? 'New User ? Register Here'
              : 'ExistingUser ? Login Here'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
