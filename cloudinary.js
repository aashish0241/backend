// const cloudinary = require('cloudinary').v2

// // Function to upload an image to Cloudinary
// // async function uploadImage(filePath) {
// //   try {
// //     const result = await cloudinary.uploader.upload(filePath, { folder: 'your_folder_name' });
// //     console.log('Image uploaded successfully:');
// //     console.log(result);
// //     return result;
// //   } catch (error) {
// //     console.error('Error uploading image to Cloudinary:');
// //     console.error(error);
// //     throw error;
// //   }
// // }
//  const cloudinaryUploadImg = async (fileToUpload) =>{
//                   return  new Promise((resolve) =>{
//                                     cloudinary.uploader.upload(fileToUpload , (result) =>{
//                                                       resolve(
//                                                                         {
//                                                                                           url: result.secure_url,
//                                                                         },
//                                                                         {
//                                                                                           resource_type: "auto",
//                                                                         }
//                                                       )
//                                     })
//                   })
//  }
//  module.exports = cloudinaryUploadImg;
// // const imagePath = 'path/to/your/image.jpg';
// // uploadImage(imagePath);
