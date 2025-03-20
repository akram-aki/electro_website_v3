import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv'
dotenv.config();

(async function () {

    cloudinary.config({
        cloud_name: 'dyzpjvipc',
        api_key: '147782554366559',
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const uploadResult = await cloudinary.uploader
        .upload(
            'public/crypto.png', {
            public_id: 'crypto',
        }
        )
        .catch((error) => {
            console.log(error);
        });


    const optimizeUrl = cloudinary.url('crypto', {
        fetch_format: 'auto',
        quality: 'auto'
    });

    console.log(optimizeUrl);
})();