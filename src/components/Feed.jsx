import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    try {
      if (feed) return;
      const res = await axiosInstance.get('/user/feed');
      dispatch(addFeed(res?.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed) return;
  if (feed.length <= 0)
    return (
      <h1 className='flex justify-center my-10 text-white'>
        No new users found
      </h1>
    );
  return (
    <div className='flex justify-center my-10 h-screen align-center'>
      {feed && <UserCard user={feed[0]} />}
    </div>
  );
};

export default Feed;
