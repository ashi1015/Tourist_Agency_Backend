const Tourist = require('../models/tourist.model');

//arrow function for tourist registration
const register = async (req, res) => {
    //check request body
    if (req.body) {

        var emailAlreadyUsed = true;
        await Tourist.findOne({ email: req.body.email }, function (err, docs) {
            if (err) {
                console.log(err)
            }
            else {
                if (docs == null) {
                    emailAlreadyUsed = false;
                }
            }
        });
        if (emailAlreadyUsed) {
            res.status(409).send({
                data: null,
                message: "Email already in use"
            });
        } else {
            const tourist = new Tourist(req.body); //create object for get data from the front end
            await tourist.save() //save this data
                .then(data => {
                    res.status(201).json({
                        data: data,
                        message: "Successfuly Registered"
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        data:null,
                        message: error.message
                    });
                });
        }
    }


}


const signin = async (req, res) => {

    var message = "Server Error";
    var status = "failed";
    var data = null;
    await Tourist.findOne({ email: req.body.email }, function (err, user) {

        if (err) {
            console.log(err)
        }
        else {
            if (user == null) {
                message = "Invalid email";
            } else {
                if (user.password == req.body.password) {
                    message = "Login success";
                    data = user;
                    status = "success";
                } else {
                    message = "Invalid password";
                }
            }
        }
        res.status(200).json({
            status: status,
            message: message,
            data: data
        });
    });

}


const getProfile = async (req, res) => {
    await Tourist.findOne({ email: req.params.email })
        .then(response => {
            res.status(200).send({ data: { tourist: response } });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });

        });

}


//update tourists profile
const updateProfile = async (req, res) => {
    var email = req.params.email

    await User.findOneAndUpdate({ email: email }, req.body)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
}


//delete user
const deleteProfile = async (req, res) => {
    var email = req.params.email
  
    await Tourist.findOneAndDelete({ email: email }, req.body)
        .then(data => {
            res.status(200).send({ data: data });
        })
        .catch(error => {
            res.status(500).send({ error: error.message });
        });
    
  };

//export the functions
module.exports = {
    register,
    signin,
    getProfile,
    updateProfile,
    deleteProfile
};