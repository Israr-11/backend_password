const passwordSaver = require("../Model/model2");


const searchData = async (req, res) => {
    const email = req.user.email;

    try {
        const searchTerm = req.query.q;
        if (!searchTerm) {
            return res.status(400).json({
                status: "Failed",
                message: "Search term is required"
            });
        }

        const results = await passwordSaver.find({
            createdBy: email,
            $or: [
                { organizationName: { $regex: searchTerm, $options: "i" } },
                { emailUsed: { $regex: searchTerm, $options: "i" } }
            ],
        });

        if (results.length === 0) {
            return res.status(404).json({
                status: "Failed",
                message: "No such entry exist",
            });
        }

        res.status(200).json(results);
    } catch (e) {
        console.log(e);
        res.status(400).json({
            Status: "Failed",
            message: "Cannot find this entry",
        });
    }
};

module.exports=
{searchData};