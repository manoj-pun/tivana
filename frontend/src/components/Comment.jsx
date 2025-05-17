import React, { useContext, useEffect,useState } from "react";
import { assets, fakeComments } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const Comment = ({ isModal = true }) => {

  const {setShowComment} = useContext(AppContext)
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const toggleLike = () => {
    setLiked(prev => !prev);
  };

  const toggleSave = () => {
  setSaved(prev => !prev);
};

  return (
    <div
      className={`${
        isModal
          ? "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg"
          : ""
      }`}
    >
      <div className={`${isModal ? "w-[500px]" : "w-full"} bg-[#171717] p-4 rounded-2xl shadow-lg`}>
        {/* Rest of the comment component remains the same */}
        {/* Profile Info */}
        <div className="flex items-center gap-3 mb-3">
          <img
            src={fakeComments.userProfile.user}
            alt=""
            className="w-9 rounded-full"
          />
          <span className="font-semibold text-white">
            {fakeComments.userProfile.username}
          </span>
        </div>

        <hr className="border-gray-600 w-full" />

        {/* Scrollable Container (User Post + Comments) */}
        <div className="max-h-[42vh] overflow-y-auto space-y-4 pt-2">
          {/* User Post */}
          <div className="mb-3">
            <div className="flex gap-3 items-start">
              <img
                src={fakeComments.userProfile.user}
                alt=""
                className="w-9 rounded-full"
              />
              <p className="text-sm">
                <span className="font-semibold text-white">
                  {fakeComments.userProfile.username}
                </span>
                <span className="text-gray-300 ml-1">
                  {fakeComments.userProfile.text}
                </span>
              </p>
            </div>
          </div>

          {/* Comments List */}
          {fakeComments.Comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 items-start">
              <img
                src={comment.user}
                className="w-9 h-9 rounded-full object-cover flex-shrink-0"
              />
              <div className="text-sm flex-1">
                <span className="font-semibold text-white">
                  {comment.username}
                </span>{" "}
                <span className="text-gray-300 ml-1">{comment.text}</span>
              </div>
            </div>
          ))}
        </div>

        <hr className="border-gray-600 mt-4" />

        {/* Actions */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {liked ? (
                      <img
                        src={assets.heartFilled}
                        className="w-6 h-6 cursor-pointer"
                        onClick={toggleLike}
                        alt="Unlike"
                      />
                    ) : (
                      <img
                        src={assets.heart}
                        className="w-6 h-6 cursor-pointer"
                        onClick={toggleLike}
                        alt="Like"
                      />
                    )}
            {/* <img
              src={assets.comment}
              alt="Comment"
              className="w-6 h-6 cursor-pointer"
            /> */}
            <img
              src={assets.send}
              alt="Send"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
          <div>
            {saved ? (
              <img
                src={assets.saveFilled}
                alt="Unsave"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleSave}
              />
            ) : (
              <img
                src={assets.save}
                alt="Save"
                className="w-6 h-6 cursor-pointer"
                onClick={toggleSave}
              />
            )}
          </div>
        </div>

        {/* Timestamp */}
        <div className="mt-2 text-sm text-gray-400">
          <span>
            {fakeComments.Comments.length
              ? fakeComments.Comments[0].timestamp
              : "Just now"}
          </span>
        </div>

        <hr className="border-gray-600 mt-4" />

        {/* Add Comment */}
        <div className="flex items-center mt-3">
          <input
            type="text"
            className="w-full text-white p-1.5 bg-transparent outline-none placeholder-[#b3afaf]"
            placeholder="Add a comment..."
          />
          <span className="text-blue-400 cursor-pointer hover:opacity-80 ml-2">
            Post
          </span>
        </div>
      </div>
      
      <div className='absolute top-10 right-20'>
        <img src={assets.cross_icon} alt="" className='w-5 cursor-pointer' onClick={() => setShowComment(false)}/>
      </div>
      
    </div>
  );
};

export default Comment;