// components/GlobalLoader.js
import { useSelector } from 'react-redux';

const GlobalLoader = () => {
  const loadingCount  = useSelector((state) => state.loader.loadingCount);

  if (loadingCount === 0) return null;

  return (
     <div className="fixed inset-0 z-50 flex items-center justify-center">
  <span className='loading loading-spinner loading-xl text-white'></span>
  </div>
  )
};

export default GlobalLoader;
