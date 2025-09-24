import React, { useEffect, useRef, useState } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import CartPage from './CartPage';
import { BASE_URL, LOGO } from '../utils/constants';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';
import { clearCart, addItem } from '../utils/cartCountSlice';
import { searchInput } from '../utils/searchItemSlice';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const profileRef = useRef(null);
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const location=useLocation();
 const showSearch = location.pathname === "/viewallproducts";

 const navigate=useNavigate()
  const cartItems = useSelector((store) => store.cartCount.items);
  const cartCount = cartItems.length;
  
  // Calculate total quantity if you want to show total items instead of unique items
  const totalQuantity = cartItems.reduce((total, item) => total + (item.count || 1), 0);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setOpenProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync cart with backend on component mount
  useEffect(() => {
    const syncCartWithBackend = async () => {
      try {
        const res = await axios.get(BASE_URL + "cartItems", { withCredentials: true });
        
        if (res.data.data.items && Array.isArray(res.data.data.items)) {
          // Clear current cart and sync with backend
          dispatch(clearCart());
          
          // Add each item from backend to Redux store
          res.data.data.items.forEach(item => {
            let normalizedItem;
            
            if (item.productId) {
              // If item has productId (populated product), flatten it
              normalizedItem = {
                ...item.productId,
                count: item.quantity || 1,
                _id: item.productId._id
              };
            } else {
              // If item is already flattened
              normalizedItem = {
                ...item,
                count: item.quantity || item.count || 1
              };
            }
            
            dispatch(addItem(normalizedItem));
          });
        }
      } catch (error) {
        console.error("Error syncing cart:", error);
        // Don't clear cart on error - keep existing Redux state
      }
    };

    // Only sync if user is logged in
    if (user) {
      syncCartWithBackend();
    }
  }, [dispatch, user]);

  const handleCart = async () => {
    setIsCartOpen(true);
    // No need to fetch cart items here - CartPage component handles this
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post(BASE_URL + "logout", {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(clearCart());
      setOpenProfile(false);
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav className="w-full sticky top-0 z-50 bg-white shadow-md">
      <div className="flex items-center justify-between h-16 px-4 sm:px-6 md:px-10">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img className="w-12 h-10 object-contain" src={LOGO} alt="Logo" />
          <h1 className="font-bold text-xl sm:text-2xl text-black">SoccerGear</h1>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 lg:gap-8 font-bold text-gray-600">
          <li className="hover:text-green-500"><Link to="/">Home</Link></li>
          <li className="hover:text-green-500"><Link to="/viewallproducts">Collections</Link></li>
          {/* <li className="hover:text-green-500">Boots</li>
          <li className="hover:text-green-500">Equipments</li> */}
          <li className="hover:text-green-500">Contact</li>
        </ul>
        {!showSearch &&  <div></div>}
        {/* Search Input */}
      {showSearch && <div className="hidden lg:flex items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search jersey, boots..."
              onChange={(e)=>dispatch(searchInput(e.target.value))}
            />
          </div>
        </div>}

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6 relative">
          {/* Cart */}
          <div className="relative">
            <ShoppingCart
              className="w-6 h-6 text-gray-700 hover:text-green-500 cursor-pointer transition-colors duration-200"
              onClick={handleCart}
            />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-semibold animate-pulse">
                {/* Show unique items count */}
                {cartCount}
                {/* Alternatively, show total quantity: */}
                {/* {totalQuantity} */}
              </span>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={profileRef}>
            <div onClick={() => setOpenProfile(!openProfile)} className="cursor-pointer">
              {user?.photoUrl ? (
                <img
                  src={user?.photoUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border-2 border-green-500 object-cover hover:border-green-600 transition-colors duration-200"
                />
              ) : (
                <User className="w-6 h-6 text-gray-700 hover:text-green-500 transition-colors duration-200" />
              )}
            </div>
            {openProfile && (
              <div className="absolute -right-4 mt-5 w-44 bg-white shadow-lg rounded-md overflow-hidden z-50 border border-gray-200">
                <Link to="/profile">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 cursor-pointer" onClick={() => setOpenProfile(false)}>
                    👤 Profile
                  </div>
                </Link>
                <Link to="/myorders">
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-green-50 cursor-pointer" onClick={() => setOpenProfile(false)}>
                    📦 Orders
                  </div>
                </Link>
                <div className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 cursor-pointer" onClick={handleLogout}>
                  🚪 Logout
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-800" />
              ) : (
                <Menu className="w-6 h-6 text-gray-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4 animate-slide-down">
          <ul className="flex flex-col gap-3 text-gray-700 font-medium">
            <li className="hover:text-green-500"><Link to="/">Home</Link></li>
            
            <li className="hover:text-green-500">Collections</li>
          
            <li className="hover:text-green-500">Contact</li>
          </ul>
         {showSearch && <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              className="w-full h-10 pl-10 pr-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search..."
              onChange={(e)=>dispatch(searchInput(e.target.value))}
            />
          </div>}
        </div>
      )}

      {/* Cart Page */}
      {isCartOpen && <CartPage onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;
