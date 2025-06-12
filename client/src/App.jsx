import {BrowserRouter , Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/about';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import Header from './components/Header';
import Footer from './components/Footer';
import Listing from './pages/Listing';
import CreateListing from './pages/CreateListing'
import UpdateListing from './pages/UpdateListing';
import Search from './pages/Search';
import {PrivateRoute1} from './components/PrivateRoute';
import {PrivateRoute2} from './components/PrivateRoute';
import ContactUs from './pages/Contactus';
export default function App(){
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoute1 />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-listing" element={<CreateListing />} />
          <Route
            path="/update-listing/:listingId"
            element={<UpdateListing />}
          />
        </Route>
        <Route element={<PrivateRoute2 />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/listing/:listingId" element={<Listing />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search />} />
        <Route path="/contact" element={<ContactUs />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}