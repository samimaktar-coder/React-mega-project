import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import { Header, Footer } from "./components";
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className=' bg-slate-600 text-white'>
      <div className='w-full flex min-h-screen flex-wrap content-between'>
        <Header />
        <main className='w-full box-border'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : (
    ""
  );
}

export default App;
