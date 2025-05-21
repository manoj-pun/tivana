import React, { useState, useCallback, useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import { assets } from "../assets/assets";

const Search = () => {
  const { backendUrl, setShowSearch } = useContext(AppContext);
  const [query, setQuery] = useState("");
  const [recentUsers, setRecentUsers] = useState(() => {
    try {
      const saved = localStorage.getItem("recentSearches");
      const parsed = saved ? JSON.parse(saved) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Error parsing recent searches:", error);
      return [];
    }
  });
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      localStorage.setItem("recentSearches", JSON.stringify(recentUsers));
    } catch (error) {
      console.error("Error saving recent searches:", error);
    }
  }, [recentUsers]);

  const fetchUsers = useCallback(
    debounce(async (value) => {
      if (!value.trim()) {
        setSearchResults([]);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await axios.get(
          `${backendUrl}/api/user/search?query=${encodeURIComponent(value)}`,
          { withCredentials: true }
        );
        setSearchResults(response.data.success ? response.data.users : []);
      } catch (error) {
        console.error("Error searching users:", error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }, 300),
    [backendUrl]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value.trim()) {
      setIsSearching(true);
    }
    fetchUsers(value);
  };

  const handleUserClick = (user) => {
  if (!user?._id || !user?.username) return;

  setRecentUsers((prev) => {
    const exists = prev.find((u) => u._id.toString() === user._id.toString());
    return exists ? prev : [user, ...prev].slice(0, 10);
  });

  setQuery("");
  setSearchResults([]);

  setTimeout(() => {
    setShowSearch(false);
    navigate(`/${user.username}`);
  }, 100);
};

  const clearAllUsers = () => {
    setRecentUsers([]);
  };

  const removeUser = (userId) => {
    setRecentUsers((prev) => prev.filter((user) => user._id.toString() !== userId.toString()));
  };

  return (
    <div className="w-90 max-sm:w-80 min-h-screen fixed top-0 bottom-0 border-r-[#262626] border-r-1 rounded-r-2xl bg-black">
      <div className="pt-8 p-3">
        <div className="flex items-center justify-between">
        <h1 className="text-white text-[25px] font-semibold mb-4">Search</h1>
        <img onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="" className="w-5 h-5 -mt-15 cursor-pointer"/>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="Search"
          className="p-1.5 w-full outline-none bg-[#212121] text-white rounded"
          autoFocus
        />
      </div>

      <hr className="mt-4 border-[#262626]" />

      <div className="p-3 flex justify-between items-center">
        <h1 className="text-white font-semibold">Recent</h1>
        {recentUsers.length > 0 && (
          <span className="text-[#4193EF] cursor-pointer" onClick={clearAllUsers}>
            Clear all
          </span>
        )}
      </div>

      {/* Loading indicator - appears only when searching and query exists */}
        {isSearching && query && (
          <div className="flex justify-center items-center">
            <div className="loading-dots">
              <div className="dot animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="dot animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="dot animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

      {query ? (
        <>
          {searchResults.length > 0 ? (
            <div className="cursor-pointer">
              {searchResults.map((user) => (
                <div
                  key={user._id}
                  className="flex items-center hover:bg-[#282828] p-2"
                  onClick={() => handleUserClick(user)}
                >
                  <img
                    src={user.profileImage || assets.defaultprofile}
                    alt={user.username}
                    className="w-10 h-10 rounded-full mr-3 object-cover cursor-pointer"
                  />
                  <div className="cursor-pointer">
                    <div className="flex items-center gap-1">
                      <p className="text-white font-medium">{user.username}</p>
                      {user.isVerified && (
                        <img src={assets.verified} alt="Verified" className="w-4 h-4" />
                      )}
                    </div>
                    <p className="text-[#808080] text-sm">{user.fullname}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : !isSearching ? (
            <div className="text-[#808080] flex items-center justify-center mt-50">
              <p>No users found.</p>
            </div>
          ) : null}
        </>
      ) : recentUsers.length > 0 ? (
        <div>
          {recentUsers.map((user) => (
            <div
              key={user._id}
              className="flex items-center hover:bg-[#282828] p-2 cursor-pointer"
            >
              <img
                src={user.profileImage || assets.defaultprofile}
                alt={user.username}
                className="w-10 h-10 rounded-full mr-3 object-cover cursor-pointer"
                onClick={() => handleUserClick(user)}
              />
              <div className="cursor-pointer" onClick={() => handleUserClick(user)}>
                <div className="flex items-center gap-1">
                  <p className="text-white font-medium">{user.username}</p>
                  {user.isVerified && (
                    <img src={assets.verified} alt="Verified" className="w-4 h-4" />
                  )}
                </div>
                <p className="text-[#808080] text-sm">{user.fullname}</p>
              </div>
              <div
                className="cursor-pointer ml-auto"
                onClick={() => removeUser(user._id)}
              >
                <img src={assets.cross_icon} alt="Remove" className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-[#808080] flex items-center justify-around mt-50">
          <p>Recent searches will appear here.</p>
        </div>
      )}
    </div>
  );
};

export default Search;