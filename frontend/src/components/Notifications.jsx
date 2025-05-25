import React from "react";
import { notificationsData } from "../assets/assets"; // Assuming your notifications data is imported from the file

const Notifications = () => {
  return (
    <div className="w-90 max-sm:w-80 min-h-screen fixed top-0 bottom-0 bg-black border-r-[#262626] border-r-1 rounded-r-2xl z-50">
      <div className="pt-8 p-3">
        <h1 className="text-white text-[25px] font-semibold mb-4">
          Notifications
        </h1>
      </div>

      <hr className="mt-4 border-[#262626]" />

      <div>
        {notificationsData.map((notification) => (
          <div
            key={notification._id}
            className="flex items-center p-3 hover:bg-[#282828] cursor-pointer"
          >
            <img
              src={notification.profileImage}
              alt={notification.username}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />

            <div className="flex-1 flex items-center">
              <div>
                <p className="text-sm">
                  <span className="font-semibold text-white">
                    {notification.username}
                  </span>{" "}
                  <span className="text-white">{notification.userAction}</span>
                </p>

                <p className="text-[13px] text-[#808080]">
                  {notification.timestamp}
                </p>
              </div>

              {notification.likedPost && (
                <img
                  src={notification.likedPost}
                  alt="Liked Post"
                  className="w-10 h-10 ml-2 rounded-lg object-cover"
                />
              )}

              {notification.commentedPost && (
                <img
                  src={notification.commentedPost}
                  alt="Commented Post"
                  className="w-10 h-10 ml-2 rounded-lg object-cover"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
