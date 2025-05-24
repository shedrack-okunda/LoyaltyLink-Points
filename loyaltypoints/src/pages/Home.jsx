import React, { useState } from "react";

export const Home = () => {
  const [currentPoints, setCurrentPoints] = useState(7);
  const [totalVisits, setTotalVisits] = useState(7);
  const [rewardEarned, setRewardEarned] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

  // Mock visit history data
  const visitHistory = [
    { date: "May 24, 2025", time: "10:30 AM", points: 1 },
    { date: "May 17, 2025", time: "11:15 AM", points: 1 },
    { date: "May 10, 2025", time: "09:45 AM", points: 1 },
    { date: "May 03, 2025", time: "10:00 AM", points: 1 },
    { date: "Apr 26, 2025", time: "12:30 PM", points: 1 },
    { date: "Apr 19, 2025", time: "01:15 PM", points: 1 },
    { date: "Apr 12, 2025", time: "11:00 AM", points: 1 },
  ];

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length <= 10) {
      setPhoneNumber(value);
    }
  };

  const formatPhoneNumber = (value) => {
    if (!value) return "";
    const phoneNumber = value.replace(/\D/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handleCheckIn = () => {
    if (phoneNumber.length === 10) {
      setIsCheckedIn(true);

      // Simulate adding a point
      const newPoints = currentPoints + 1;
      setCurrentPoints(newPoints);
      setTotalVisits(totalVisits + 1);

      // Check if reward is earned (10 points)
      if (newPoints >= 10) {
        setRewardEarned(true);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
      }
    }
  };

  const handleClaimReward = () => {
    setRewardEarned(false);
    setCurrentPoints(0);
  };

  const resetCheckIn = () => {
    setIsCheckedIn(false);
    setPhoneNumber("");
  };

  return (
    <>
      <div className="flex-1 pt-16 pb-16">
        {activeTab === "home" && (
          <div className="px-4 py-6">
            {!isCheckedIn ? (
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md">
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">
                      Welcome!
                    </h1>
                    <p className="text-gray-600">
                      Enter your phone number to check in
                    </p>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Phone Number
                    </label>
                    <div className="relative mb-4">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <i className="fas fa-phone text-gray-600"></i>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        className="block w-full pl-10 pr-3 py-3 border-none bg-gray-100 text-gray-900 placeholder-gray-500 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none text-lg"
                        placeholder="(254) 123-4567"
                        value={formatPhoneNumber(phoneNumber)}
                        onChange={handlePhoneChange}
                      />
                    </div>

                    <button
                      onClick={handleCheckIn}
                      disabled={phoneNumber.length !== 10}
                      className={`w-full py-3 px-4 text-white font-medium rounded-lg shadow-md transition-all duration-200 !rounded-button ${
                        phoneNumber.length === 10
                          ? "bg-gradient-to-r from-yellow-600 to-yellow-600 hover:from-yellow-700 hover:to-yellow-700"
                          : "bg-gray-400 cursor-not-allowed"
                      }`}
                    >
                      Check In
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Why Check In?
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                          <i className="fas fa-star text-indigo-600"></i>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-md font-medium text-gray-900">
                            Earn Points
                          </h3>
                          <p className="text-sm text-gray-500">
                            Every visit adds points to your account
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                          <i className="fas fa-gift text-purple-600"></i>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-md font-medium text-gray-900">
                            Get Rewards
                          </h3>
                          <p className="text-sm text-gray-500">
                            Redeem your points for special offers
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-pink-100 flex items-center justify-center">
                          <i className="fas fa-history text-pink-600"></i>
                        </div>
                        <div className="ml-4">
                          <h3 className="text-md font-medium text-gray-900">
                            Track History
                          </h3>
                          <p className="text-sm text-gray-500">
                            View your visit history and rewards
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md">
                  {showConfetti && (
                    <div className="fixed inset-0 z-10 pointer-events-none">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl animate-bounce">
                          <i className="fas fa-trophy text-yellow-500"></i>
                          <i className="fas fa-star text-purple-500 animate-spin"></i>
                          <i className="fas fa-gift text-pink-500"></i>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6 text-center">
                    <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <i className="fas fa-check text-3xl text-green-600"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      Check-in Successful!
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Thank you for visiting us today.
                    </p>

                    {rewardEarned ? (
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white p-4 rounded-lg mb-4 animate-pulse">
                        <h3 className="text-xl font-bold mb-1">
                          Congratulations!
                        </h3>
                        <p>You've earned a free reward!</p>
                      </div>
                    ) : null}

                    <button
                      onClick={resetCheckIn}
                      className="mt-2 py-2 px-4 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-all duration-200 !rounded-button"
                    >
                      Done
                    </button>
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h2 className="text-lg font-semibold text-gray-800 mb-4">
                      Your Progress
                    </h2>
                    <div className="mb-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">
                          {currentPoints} / 10 points
                        </span>
                        <span className="text-sm font-medium text-gray-700">
                          {rewardEarned
                            ? "Reward Ready!"
                            : `${10 - currentPoints} more to go`}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-2.5 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${(currentPoints / 10) * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    {rewardEarned && (
                      <button
                        onClick={handleClaimReward}
                        className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-medium rounded-lg shadow-md hover:from-yellow-500 hover:to-orange-600 transition-all duration-200 !rounded-button"
                      >
                        Claim Your Reward
                      </button>
                    )}
                  </div>

                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-semibold text-gray-800">
                        Recent Visits
                      </h2>
                      <span className="text-sm text-gray-500">
                        Total: {totalVisits}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {visitHistory.map((visit, index) => (
                        <div
                          key={index}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-800">
                              {visit.date}
                            </p>
                            <p className="text-sm text-gray-500">
                              {visit.time}
                            </p>
                          </div>
                          <div className="bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full text-sm">
                            +{visit.points} point
                          </div>
                        </div>
                      ))}

                      {isCheckedIn && (
                        <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
                          <div>
                            <p className="font-medium text-gray-800">
                              May 24, 2025
                            </p>
                            <p className="text-sm text-gray-500">Just now</p>
                          </div>
                          <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm">
                            +1 point
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "rewards" && (
          <div className="px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Rewards</h1>
              <p className="text-gray-600">
                View and redeem your earned rewards
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Available Rewards
              </h2>

              {rewardEarned ? (
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 text-white shadow-lg mb-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold mb-1">Free Haircut</h3>
                      <p className="text-sm opacity-90">
                        Valid until June 24, 2025
                      </p>
                    </div>
                    <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center">
                      <i className="fas fa-cut text-2xl"></i>
                    </div>
                  </div>
                  <button
                    onClick={handleClaimReward}
                    className="mt-4 w-full py-2 px-4 bg-white text-indigo-700 font-medium rounded-lg hover:bg-gray-100 transition-all duration-200 !rounded-button"
                  >
                    Redeem Now
                  </button>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-3">
                    <i className="fas fa-gift text-yellow-500 text-2xl"></i>
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-1">
                    No rewards yet
                  </h3>
                  <p className="text-gray-500">
                    Keep checking in to earn rewards!
                  </p>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Rewards History
              </h2>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Free Haircut</p>
                    <p className="text-sm text-gray-500">
                      Redeemed on Apr 05, 2025
                    </p>
                  </div>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    Used
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">50% Off Service</p>
                    <p className="text-sm text-gray-500">
                      Redeemed on Feb 15, 2025
                    </p>
                  </div>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    Used
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-800">Free Product</p>
                    <p className="text-sm text-gray-500">
                      Redeemed on Jan 10, 2025
                    </p>
                  </div>
                  <div className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-sm">
                    Used
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="px-4 py-6">
            <div className="text-center mb-6">
              <h1 className="text-2xl font-bold text-gray-800">My Profile</h1>
              <p className="text-gray-600">Manage your account information</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center mb-6">
                <div className="h-20 w-20 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  SOB
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-bold text-gray-800">Sheddy </h2>
                  <p className="text-gray-600">(254) 123-4567</p>
                  <p className="text-sm text-gray-500">
                    Member since January 2025
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-star text-yellow-500 mr-3"></i>
                    <span className="text-gray-800">Loyalty Points</span>
                  </div>
                  <span className="font-medium">{currentPoints} points</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-history text-indigo-500 mr-3"></i>
                    <span className="text-gray-800">Total Visits</span>
                  </div>
                  <span className="font-medium">{totalVisits}</span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <i className="fas fa-gift text-purple-500 mr-3"></i>
                    <span className="text-gray-800">Rewards Redeemed</span>
                  </div>
                  <span className="font-medium">3</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Account Settings
              </h2>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <i className="fas fa-user text-yellow-600 mr-3"></i>
                    <span className="text-gray-800">Edit Profile</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <i className="fas fa-bell text-yellow-600 mr-3"></i>
                    <span className="text-gray-800">Notifications</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <i className="fas fa-lock text-yellow-600 mr-3"></i>
                    <span className="text-gray-800">Privacy Settings</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>

                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer">
                  <div className="flex items-center">
                    <i className="fas fa-question-circle text-yellow-600 mr-3"></i>
                    <span className="text-gray-800">Help & Support</span>
                  </div>
                  <i className="fas fa-chevron-right text-gray-400"></i>
                </div>

                <button className="w-full py-3 px-4 mt-2 bg-red-100 text-red-600 font-medium rounded-lg hover:bg-red-200 transition-all duration-200 !rounded-button">
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div className="bg-white border-t border-gray-200 fixed bottom-0 w-full py-2 px-4 grid grid-cols-3 gap-1 shadow-lg">
        <button
          onClick={() => setActiveTab("home")}
          className={`flex flex-col items-center justify-center py-2 cursor-pointer ${
            activeTab === "home" ? "text-yellow-600" : "text-gray-500"
          }`}
        >
          <i
            className={`fas fa-home text-xl mb-1 ${
              activeTab === "home" ? "text-yellow-600" : "text-gray-500"
            }`}
          ></i>
          <span className="text-xs">Home</span>
        </button>

        <button
          onClick={() => setActiveTab("rewards")}
          className={`flex flex-col items-center justify-center py-2 cursor-pointer ${
            activeTab === "rewards" ? "text-yellow-600" : "text-gray-500"
          }`}
        >
          <i
            className={`fas fa-gift text-xl mb-1 ${
              activeTab === "rewards" ? "text-yellow-600" : "text-gray-500"
            }`}
          ></i>
          <span className="text-xs">Rewards</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center justify-center py-2 cursor-pointer ${
            activeTab === "profile" ? "text-yellow-600" : "text-gray-500"
          }`}
        >
          <i
            className={`fas fa-user text-xl mb-1 ${
              activeTab === "profile" ? "text-yellow-600" : "text-gray-500"
            }`}
          ></i>
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </>
  );
};
