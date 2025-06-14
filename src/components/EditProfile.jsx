import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { addUser } from '../utils/userSlice';
import UserCard from './UserCard';

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age || '');
  const [gender, setGender] = useState(user.gender || '');
  const [about, setAbout] = useState(user.about);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    // clear the existing error
    setError('');
    try {
      const res = await axiosInstance.patch('/profile/edit', {
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
      });
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data ?? 'Something wentwrong');
    }
  };
  return (
    <>
      <div className='flex justify-center'>
        <div className='flex justify-center'>
          <div className='card bg-base-100 w-96 shadow-sm color-[#bebebe12] h-[500px] my-30 overflow-scroll'>
            <div className='card-body'>
              <h2 className='card-title justify-center'>Edit Profile</h2>
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
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Photo URL</legend>
                <input
                  type='text'
                  className='input'
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Age</legend>
                <input
                  type='number'
                  className='input'
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>{' '}
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>Gender</legend>
                <input
                  type='text'
                  className='input'
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </fieldset>
              <fieldset className='fieldset'>
                <legend className='fieldset-legend'>About</legend>
                <input
                  type='text'
                  className='input'
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </fieldset>
              <p className='text-red-500'>{error}</p>
              <div className='card-actions justify-center'>
                <button className='btn btn-primary' onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center'>
          <UserCard
            user={{ firstName, lastName, photoUrl, age, gender, about }}
          />
        </div>
      </div>
      {showToast && (
        <div className='toast toast-top toast-center'>
          <div className='alert alert-info'>
            <span>Profile Save Successfully</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
