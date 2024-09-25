import user from "../Modules/user.js";


export const updatedata=async (req, res) => {


    try {
        const updateuser= await user.findByIdAndUpdate(req.params.id,{ $set : req.body},{new:true});
       
       res.status(200).json(updateuser);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error creating user",
            error: err.message
        });
    }
}

export const deletedata=async (req, res) => {


    try {
             await user.findByIdAndDelete(req.params.id,{ $set : req.body},{new:true});
       
       res.status(200).send("deteled  user");
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error deleting user",
            error: err.message
        });
    }
}

export const read_one_data=async (req, res) => {


    try {
        const user= await user.findById(req.params.id);
       
       res.status(200).json(user);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting user",
            error: err.message
        });
    }
}
export const read_all_data=async (req, res) => {


    try {
        const user= await user.find();
       
       res.status(200).json(user);
   
    } catch (err) {
        // Respond with a 400 status code and error message if something goes wrong
        res.status(400).json({
            msg: "Error geting user",
            error: err.message
        });
    }
}