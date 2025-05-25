import { useDispatch } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { removeUserFromFeed } from '../utils/feedSlice';

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { firstName, lastName, photoUrl, gender, age, about, _id } = user;

  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axiosInstance.post(
        `/request/send/${status}/${userId}`,
        {}
      );
      dispatch(removeUserFromFeed(userId));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='card w-96 shadow-lg color-[#bebebe12] h-[500px] my-30'>
      <figure className='w-full h-full m-0 p-0 overflow-hidden'>
        <img
          src={photoUrl}
          alt='photo'
          className='w-full h-full object-cover block'
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{`${firstName} ${lastName}`}</h2>
        {age && gender && <p>{`${age} ${gender}`}</p>}
        <p>{about}</p>
        <div className='card-actions justify-center'>
          <button
            className='btn btn-primary'
            onClick={() => handleSendRequest('ignored', _id)}
          >
            Ignored
          </button>
          <button
            className='btn btn-secondary'
            onClick={() => handleSendRequest('interested', _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
