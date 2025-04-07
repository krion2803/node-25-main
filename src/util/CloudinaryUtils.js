const cloudinary = require('cloudinary').v2;

const uploadFileToCloudinary = async (file)=>{
    cloudinary.config({
        cloud_name:"dnm8pkwet",
        api_key:"199786161739884",
        api_secret:"2DUiZxi13JtphzuHAyBJ1BNAnDs"
    })
    const clouudinaryResponse  = await cloudinary.uploader.upload(file.path)
    return clouudinaryResponse ;
}

module.exports={uploadFileToCloudinary}