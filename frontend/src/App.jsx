import React, { useState, useEffect, useContext, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import SlidingBar from './pages/SlidingBar';
import ProtectedRoutes from './pages/ProtectedRoutes';
import { UserContext } from './context/UserProvider';
import { fetchUserDetails } from './services/authService.js';
import LoginProtectedRoutes from './pages/LoginProtectedRoutes.jsx';



const Register = React.lazy(() => import('./pages/Register'));
const Login = React.lazy(() => import('./pages/Login'));
const DataBreach = React.lazy(() => import('./pages/DataBreach.jsx'));
const PasswordCheck = React.lazy(() => import('./pages/PasswordCheck.jsx'));
const News = React.lazy(() => import('./pages/News.jsx'));
const DisposableEmail = React.lazy(() => import('./pages/DisposableEmail.jsx'));
const FakeData = React.lazy(() => import('./pages/FakeData.jsx'));
const DashBoard = React.lazy(() => import('./pages/DashBoard.jsx'));
const Vault = React.lazy(() => import('./pages/Vault.jsx'));
const Error = React.lazy(() => import('./pages/Error.jsx'));



const App = () => {
  const { userDetails, setUserDetails, isUserValid, setIsUserValid, isLoading, setIsLoading, isVault, setIsVault } = useContext(UserContext);

  const [ isSlideBar, setIsSlideBar ] = useState(false);

  const toggleSlideBar = () => setIsSlideBar(!isSlideBar);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        const user = await fetchUserDetails();
        console.log("Fetched User:", user);
        if (!user) {
          setIsUserValid(false);
        } else {
          setUserDetails(user);
          setIsUserValid(true);
          console.log(user.vaultPassword)
          if (user.vaultPassword === null) { // This checks for both null and undefined
            setIsVault(false);
          } else {
            setIsVault(true);
          }
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setIsUserValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [ setUserDetails, setIsUserValid ]);

  // if (isLoading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation Bar */}
      <Nav toggleSlideBar={toggleSlideBar} />

      {/* Sliding Sidebar */}
      {isSlideBar && <SlidingBar toggleSlideBar={toggleSlideBar} />}

      {/* Main Content */}
      <Suspense>
        <main className="flex-1">
          <Routes>
            
            <Route path="*" element={<Error />} />
            <Route path="/" element={<Home />} />
{/* 
             <Route
              path="/register"
              element={
                <ProtectedRoutes>
                  <Register />
                </ProtectedRoutes>
              }
            /> */}
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

             {/* <Route
              path="/login"
              element={
                <ProtectedRoutes>
                  <Login />
                </ProtectedRoutes>
              }
            /> */}
            <Route
              path="/DataBreach"
              element={
                <ProtectedRoutes>
                  <DataBreach />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/password-checker"
              element={
                <ProtectedRoutes>
                  <PasswordCheck />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/news"
              element={
                <ProtectedRoutes>
                  <News />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/disposable-email"
              element={
                <ProtectedRoutes>
                  <DisposableEmail />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/fake-data"
              element={
                <ProtectedRoutes>
                  <FakeData />
                </ProtectedRoutes>
              }
            />


            <Route
              path="/data-Manager"
              element={
                <ProtectedRoutes>
                  <DashBoard />
                </ProtectedRoutes>
              }
            />


            <Route
              path="/data-vault"
              element={
                <ProtectedRoutes>
                  <Vault />
                </ProtectedRoutes>
              }
            />

          </Routes>
        </main>
      </Suspense>

    </div>
  );
};

export default App;
