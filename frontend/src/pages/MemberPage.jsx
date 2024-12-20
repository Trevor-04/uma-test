import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function MemberPage() {
  const [memberData, setMemberData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showRewardPoints, setShowRewardPoints] = useState(false);
  const [showRecentPurchases, setShowRecentPurchases] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { memberId } = useParams(); // Get memberId from the route
  const dropdownRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMemberData = async () => {
      const token = localStorage.getItem('token');
      console.log("Token from localStorage:", token); // Log the token
      if (!token) return navigate('/login'); // Redirect to login if no token

      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/members/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMemberData(response.data); // Store the member data
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };

    fetchMemberData();
  }, [navigate, memberId]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const goToSettings = () => {
    if (memberId) {
      navigate(`/member/${memberId}/settings`);
    }
  };

  const goToLogout = () =>{
    localStorage.removeItem("token"); // Remove token from local storage
    navigate(`/`);
  }

  const goToTickets = () => {
    if (memberId) {
      navigate(`/member/${memberId}/tickets`);
    }
  };

  const goToPlans = () => {
    if(memberId){
      navigate(`/member/${memberId}/Checkout`);
    }
  };


  const goToAnimals = () => {
    if (memberId) {
      navigate(`/member/${memberId}/animals`);
    }
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return ''; // Handle if no date is available
    return new Date(isoDate).toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  const toggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  const toggleRewardPoints = () => {
    setShowRewardPoints((prev) => !prev);
  };

  const toggleRecentPurchases = () => {
    setShowRecentPurchases((prev) => !prev);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const goToEvents = () => {
    const memberId = memberData?.memberID; // Use fetched member ID
    if (memberId) {
        navigate(`/member/${memberId}/events`);
    }
  };

  return (
    <div>

      <header className="bg-[#faf0e6] text-[#165e229e] p-5 flex items-center justify-between" ref={dropdownRef}>
        {/* Logo Section */}
      <Link to="/" className="flex items-center">
        <img className="h-[70px]" src="/Coog_Zoo.png" alt="logo" />
      </Link>
        <div className="flex-grow text-center">
          <h1 className="font-bold text-2xl">Member Dashboard</h1>
        </div>

        <button
          onClick={toggleDropdown}
          className="ml-8 bg-[#165e229e] text-white font-bold w-[100px] h-[30px] rounded-2xl"
        >
          Menu
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-20 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
            <ul className="py-1">
              <li>
                <button 
                  onClick={goToSettings}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </button>
              </li>
              <li>
                <button 
                  onClick={goToLogout}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </li>
              <li>
                <button 
                  onClick={goToPlans}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Member Plans
                </button>
              </li>
            </ul>
          </div>
        )}
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 p-4 mt-6">
        <div className="profile-summary text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm">
          <button
            onClick={toggleProfile}
            className="font-bold text-lg mb-4 text-[#165e229e]"
          >
            <h3 className="font-bold">My Profile</h3>
          </button>
          {showProfile ? (
            <div>
              <p><strong>Name:</strong> {memberData?.memberFName} {memberData?.memberLName}</p>
              <p><strong>Email:</strong> {memberData?.memberEmail}</p>
              <p><strong>Phone:</strong> {memberData?.memberPhone}</p>
              <p><strong>Birthday:</strong> {formatDate(memberData?.memberBirthday)}</p>
              <p><strong>Membership Type:</strong> {memberData?.memberType}</p>
              <p><strong>Subscribed On:</strong> {formatDate(memberData?.subscribed_on)}</p>
              <p><strong>Membership Term:</strong> {memberData?.memberTerm}</p>
              <p><strong>Last Billed:</strong> {formatDate(memberData?.last_billed)}</p>
            </div>
          ) : (
            <p>Click "My Profile" to view your details.</p>
          )}
        </div>

        <div
          className="upcoming-events text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
          onClick={goToEvents}
        >
          <h3 className="font-bold">Upcoming events</h3>
        </div>

        <div className="membership-status text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer" onClick={goToAnimals}>
          <h3 className="font-bold text-xl">View our animals</h3>
        </div>

      {/* Reward Points */}
<div 
  className="reward-points flex-col text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
  onClick={toggleRewardPoints}
>
  <h3 className="font-bold text-xl mb-2">Reward Points</h3>
  {showRewardPoints && (
    <div className="flex flex-col space-y-2">
      <p><strong>Current Points:</strong> 150</p>
      <p><strong>Status:</strong> Active</p>
    </div>
  )}
</div>

{/* Recent Purchases */}
<div 
  className="purchases flex-col text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
  onClick={toggleRecentPurchases}
>
  <h3 className="font-bold text-xl mb-2">Recent Purchases</h3>
  {showRecentPurchases && (
    <div className="flex flex-col space-y-2 mt-4">
      <ul className="list-disc pl-4 space-y-2"> {/* Adjusted padding-left and space-y */}
        <li>Item 1 - $10.00 (January 1, 2024)</li>
        <li>Item 2 - $5.00 (December 25, 2023)</li>
        <li>Item 3 - $20.00 (November 15, 2023)</li>
      </ul>
      <button 
        onClick={goToTickets} 
        className="mt-4 bg-[#165e229e] text-white font-bold py-2 px-4 rounded"
      >
        Buy Tickets
      </button>
    </div>
  )}
</div>

{/* Notifications */}
<div 
  className="notifications flex-col text-[#165e229e] w-full bg-white p-6 rounded-lg shadow-sm flex items-center justify-center text-center cursor-pointer"
  onClick={toggleNotifications}
>
  <h3 className="font-bold text-xl mb-2">Notifications</h3>
  {showNotifications && (
    <div className="flex flex-col space-y-2 mt-4">
      {memberData?.expiry_notification ? (
        <p>{memberData.expiry_notification}</p>
      ) : (
        <ul className="list-disc pl-4 list-inside space-y-2"> {/* Adjusted padding-left */}
          <li>Reminder: Membership renewal on {memberData?.subscribed_on}</li>
          <li>New events available for members!</li>
          <li>Check out our new exhibits this month!</li>
        </ul>
      )}
    </div>
  )}
</div>



      </div>
    </div>
  );
}
