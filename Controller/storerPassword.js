const passwordSaver = require("../Model/model2");


//GET Request

const gettingAllData = async (req, res) => {
    const email = req.user.email;
    try {
      const entries = await passwordSaver.find({ createdBy: email });
      res.status(200).json(entries);
    } catch (error) {
      res.status(404).json({
        status: "Failed",
        error,
      });
    }
  };
  

//GET ONE
const gettingOne = async (req, res) => {
    try {
        const getting_one = await passwordSaver.findById(req.params.passwordId);

        if (!getting_one){
            return res.status(404).json("No such ID exist in Database")
        }

        res.status(200).json(getting_one)
    }
    catch (error) {
        console.log(error)
        res.status(404).json({
            status: "Failed",
            error
        })
    }
}


//POST Request_

const postingData = async (req, res) => {
    try {
        const router = new passwordSaver({
            organizationName: req.body.organizationName,
            emailUsed: req.body.emailUsed,
            passwordUsed: req.body.passwordUsed,
            createdBy:req.user.email
        });

        const posting = await router.save();
        res.status(200).json(posting)
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            error
        })
    }
}


//Update Request

const updatingData = async (req, res) => {
    try {
        const router = {
            organizationName: req.body.organizationName,
            emailUsed: req.body.emailUsed,
            passwordUsed: req.body.passwordUsed,
            createdBy:req.user.email

        }
        const updating = await passwordSaver.findByIdAndUpdate(
            { _id: req.params.passwordId },
            router,
            { returnDocument: "after" }
        );
        res.status(200).json(updating)
    }
    catch (error) {
        console.log(error)
        res.status(500).json({
            status: "Failed",
            error
        })
    }
}


//Delete Request

const deletingData = async (req, res) => {
    try {
        const deleting = await passwordSaver.findByIdAndDelete(req.params.passwordId);
        if (deleting === null) {
            res.status(400).json("The ID doesn't exist in DB")
        }
        res.status(200).json(
            {

                status: "Successful",
            }
        )
    }
    catch (error) {
        res.status(500).json({
            status: "Failed",
            error
        })
    }
}



module.exports =
{
    gettingAllData,
    gettingOne,
    postingData,
    updatingData,
    deletingData,
}