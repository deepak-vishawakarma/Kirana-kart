import multer from "multer";
import cloudinary from "./utils/Cloudinary.js";
import {CloudinaryStorage} from "multer-storage-cloudinary"

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder: "Data_images",
        allowed_formates:["jpeg", "jpg", "png"],
        transformation:[{width:500, height:500, crop:"limit"}]
    }
})

const upload = multer({ storage });

export default upload;
