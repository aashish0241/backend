// const cloudinary = require('cloudinary').v2;

// // Configure Cloudinary
// cloudinary.config({
//   cloud_name: 'dkrarj6gn',
//   api_key: '416182517694345',
//   api_secret: 'VdVvt3n5lf21t1Bi_dHo0GChYTU'
// });

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
