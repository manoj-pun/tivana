// import userModel from "../models/userModel.js";
// import postModel from "../models/postModel.js";
// import { v2 as cloudinary } from "cloudinary";

// export const uploadPost = async (req, res) => {
//   const { description, hasDropdowns } = req.body;
//   const files = req.files;

//   // Validate thumbnail image
//   if (!files?.thumbnailImage?.[0]) {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Thumbnail image is required" 
//     });
//   }

//   // Validate description
//   if (!description || description.trim() === "") {
//     return res.status(400).json({ 
//       success: false, 
//       message: "Description is required" 
//     });
//   }

//   // Validate user
//   const userId = req.user?.id;
//   if (!userId) {
//     return res.status(401).json({ 
//       success: false, 
//       message: "User not authorized" 
//     });
//   }

//   const userDoc = await userModel.findById(userId);
//   if (!userDoc) {
//     return res.status(404).json({ 
//       success: false, 
//       message: "User not found" 
//     });
//   }

//   const username = userDoc.username;
//   let dropdowns = [];
//   let cloudinaryFolder = `tivana/users/${username}/profileInfo/UserPosts/thumbnailPosts`;

//   if (hasDropdowns === "true") {
//     cloudinaryFolder = `tivana/users/${username}/profileInfo/UserPosts/dropdownPosts`;

//     // Validate dropdown data exists
//     if (!req.body.dropdowns) {
//       return res.status(400).json({
//         success: false,
//         message: "Dropdown data is required when hasDropdowns is true",
//       });
//     }

//     // Validate at least one dropdown image exists
//     if (!files?.dropdownImages || files.dropdownImages.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "At least one dropdown image is required",
//       });
//     }

//     dropdowns = JSON.parse(req.body.dropdowns);

//     // Validate each dropdown item
//     for (const [index, dropdown] of dropdowns.entries()) {
//       if (!dropdown.title || dropdown.title.trim() === "") {
//         return res.status(400).json({
//           success: false,
//           message: `Title is missing for dropdown ${index + 1}`,
//         });
//       }
//       if (!dropdown.description || dropdown.description.trim() === "") {
//         return res.status(400).json({
//           success: false,
//           message: `Description is missing for dropdown ${index + 1}`,
//         });
//       }
//     }
//   }

//   // Upload thumbnail image
//   const thumbnailResult = await cloudinary.uploader.upload(
//     files.thumbnailImage[0].path,
//     { folder: cloudinaryFolder }
//   );

//   // Upload all dropdown images
//   const dropdownImagesResults = [];
//   if (files.dropdownImages) {
//     for (const file of files.dropdownImages) {
//       const result = await cloudinary.uploader.upload(file.path, {
//         folder: cloudinaryFolder,
//       });
//       dropdownImagesResults.push(result.secure_url);
//     }
//   }

//   // Save post
//   const newPost = new postModel({
//     userId,
//     username,
//     description,
//     thumbnail: thumbnailResult.secure_url,
//     dropdownImages: dropdownImagesResults,
//     dropdowns,
//     postType: hasDropdowns === "true" ? "dropdown" : "regular",
//   });

//   await newPost.save();

//   // Populate user data in response
//   const populatedPost = await postModel
//     .findById(newPost._id)
//     .populate("userId", "username fullname profileImage");

//   return res.status(201).json({
//     success: true,
//     message: "Post uploaded successfully",
//     post: populatedPost,
//   });
// };

// export const getPosts = async (req, res) => {
//   try {
//     const posts = await postModel
//       .find()
//       .sort({ createdAt: -1 })
//       .populate("userId", "username fullname profileImage");

//     res.json({ success: true, posts });
//   } catch (error) {
//     res.json({ success: false, message: error.message });
//   }
// };
