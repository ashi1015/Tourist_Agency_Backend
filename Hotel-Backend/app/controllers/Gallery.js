/*
*uditha's
*/

const router = require('express').Router();
const Hotel = require('../models/hotel.model');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

const storage = multer.diskStorage({
    destination: './uploads/hotel',
    filename: function (req, file, callback){
        const imageID = uuidv4();
        const uploadName = imageID+file.originalname;
        callback(null, uploadName);
    }

});

const upload = multer({storage:storage});

router.post("/", upload.single('profileImage'), async (req,res) => {

 
    let profileImage =  req.file.filename;
    // let status = req.body.status;

    const isExisting = await Hotel.findOne({"hotelName": hotelName});

   
        const hotel = new Hotel({
         
            imagePath: profileImage,
          
        });

        hotel.save().then((hotel) => {
            res.json({status:201, hotel:hotel})
        }).catch((err) => {
            res.json({status:400, message:err})
        })
    

})