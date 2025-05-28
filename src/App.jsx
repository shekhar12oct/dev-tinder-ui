import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';
import Setting from './components/Setting';
import Premium from './components/Premium';

const App = () => {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter>
          <Routes>
            {/* Public route */}
            <Route path='/login' element={<Login />} />

            {/* Protected layout routes */}
            <Route path='/' element={<Body />}>
              <Route path='feed' element={<Feed />} />
              <Route path='profile' element={<Profile />} />
              <Route path='setting' element={<Setting />} />
              <Route path='connections' element={<Connections />} />
              <Route path='requests' element={<Requests />} />
              <Route path='premium' element={<Premium />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
};

export default App;
