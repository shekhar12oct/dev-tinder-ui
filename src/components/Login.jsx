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
    <div className='py-16'>
      {error && (
        <div
          role='alert'
          className='alert alert-error mx-auto max-w-sm lg:max-w-xl mb-2 flex justify-left'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6 shrink-0 stroke-current cursor-pointer'
            fill='none'
            viewBox='0 0 24 24'
            onClick={() => setError(false)}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <span>{error}</span>
        </div>
      )}
      <div
        style={{ maxHeight: '550px' }}
        className='flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl'
      >
        <div className='hidden lg:block'>
          <img
            src='https://videos.openai.com/vg-assets/assets%2Ftask_01jw4bxcsdek2verpqhgvm2bp8%2F1748198522_img_0.webp?st=2025-05-25T17%3A30%3A21Z&se=2025-05-31T18%3A30%3A21Z&sks=b&skt=2025-05-25T17%3A30%3A21Z&ske=2025-05-31T18%3A30%3A21Z&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skoid=8ebb0df1-a278-4e2e-9c20-f2d373479b3a&skv=2019-02-02&sv=2018-11-09&sr=b&sp=r&spr=https%2Chttp&sig=wXaNsbMhTUAPBknMpp5ImBAE1Ztyhn710%2F8QGyRcjiU%3D&az=oaivgprodscus'
            alt='Generated visual'
            className='w-full h-full object-fill'
          />
        </div>
        <div className='w-full p-4 my-auto'>
          <p className='text-xl text-gray-600 text-center'>Dev👫Tinder!</p>
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 lg:w-1/4'></span>
            <span className='border-b w-1/5 lg:w-1/4'></span>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              isLoginForm ? handleLogin() : handleSignUp();
            }}
          >
            {!isLoginForm && (
              <>
                <div className='mt-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    First Name
                  </label>
                  <input
                    className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
                    type='text'
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className='mt-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>
                    Last Name
                  </label>
                  <input
                    className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
                    type='text'
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </>
            )}
            <div className='mt-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Email Address
              </label>
              <input
                className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
                type='email'
                onChange={(e) => setEmailId(e.target.value)}
                required
                autoComplete='username'
              />
            </div>
            <div className='mt-4'>
              <label className='block text-gray-700 text-sm font-bold mb-2'>
                Password
              </label>
              <input
                className='bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete='current-password'
              />
            </div>
            <div className='mt-8'>
              <button
                type='submit'
                className='bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600 cursor-pointer'
              >
                {isLoginForm ? 'Login' : 'Register'}
              </button>
            </div>
          </form>
          <div className='mt-4 flex items-center justify-between'>
            <span className='border-b w-1/5 md:w-1/4'></span>
            <a
              className='text-xs text-gray-500 uppercase cursor-pointer'
              onClick={() => {
                setError(false);
                setIsLoginForm((value) => !value);
              }}
            >
              {isLoginForm ? 'or sign up' : ' or login'}
            </a>
            <span className='border-b w-1/5 md:w-1/4'></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
