import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { addRequests, removeRequest } from '../utils/requestSlice';

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const disptch = useDispatch();
  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get('/user/requests');
      disptch(addRequests(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axiosInstance.post(`/request/review/${status}/${_id}`);
      disptch(removeRequest(_id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0)
    return (
      <h1 className='flex justify-center my-10 text-white'>No Request Found</h1>
    );
  return (
    <div className='flex flex-col flex-wrap justify-center my-10 items-center'>
      <div className='text-center'>
        <h1 className='text-bold text-2xl'>Requests</h1>
      </div>
      {requests.map((request) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          request.fromUserId;
        return (
          <div
            key={_id}
            className='card w-96 shadow-lg color-[#bebebe12] h-[500px] my-30'
          >
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
                  onClick={() => reviewRequest('rejected', request._id)}
                >
                  Reject
                </button>
                <button 
                  className='btn btn-secondary'
                  onClick={() => reviewRequest('accepted', request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
