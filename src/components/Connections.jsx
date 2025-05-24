import axios from 'axios';
import { useEffect } from 'react';
import { BASE_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { addConnections, removeConnection } from '../utils/connectionSlice';

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/connections`, {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1>No Connections Found</h1>;
  return (
    <div className='flex flex-col flex-wrap justify-center my-10 items-center'>
      <div className='text-center'>
        <h1 className='text-bold text-2xl'>Connections</h1>
      </div>
      {connections.map((connection) => {
        const { firstName, lastName, photoUrl, age, gender, about, _id } =
          connection;
        return (
          <div
            key={_id}
            className='flex flex-wrap m-4 p-4 border rounded-lg bg-base-300 max-w-1/2'
          >
            <div>
              <img
                alt='photo'
                className='w-20 h-20 rounded-b-full'
                src={photoUrl}
              />
            </div>
            <div className='text-left mx-4'>
              <h2 className='font-bold text-xl'>{`${firstName} ${lastName}`}</h2>
              {age && gender && <p>{`${age} ${gender}`}</p>}
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
