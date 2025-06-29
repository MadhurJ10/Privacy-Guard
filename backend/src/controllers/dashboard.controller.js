const { default: mongoose } = require('mongoose')
const dashboardModel = require('../models/dashboard.model')


module.exports.CreateDashboard = async (req, res) => {
    const { appName, email, password, location, phoneNumber, aadharnumber } = req.body
    const { userId } = req

    try {
        //if user already exist just update the apps array
        let dashboard = await dashboardModel.findOne({ userId: userId });
        if (dashboard) {
            console.log(dashboard);
            const newApp = {
                appName: appName,
                email,
                password,
                location,
                phoneNumber,
                aadharnumber,
            };

            // Push the new app data into the apps array
            dashboard.apps.push(newApp);

            // Save the updated dashboard document
            await dashboard.save();

            // Send the pushed data as a response
            return res.json({
                msg: "User already existed, updated successfully",
                newApp, // Include the newly pushed data in the response
            });
        }


        //if new user the create new docs
        const dash = await dashboardModel.create({
            userId,
            apps: [ {
                appName: appName,
                email,
                password,
                location,
                phoneNumber,
                aadharnumber,
            } ]
        })
        res.json({
            msg: "dashboard par aaya kuch",
            appName,
            email,
            dash
        })

    }
    catch (error) {
        res.status(500).json({
            msg: "An error occurred while processing the request.",
            error: error.message,
        });
    }

}

module.exports.getDashboard = async (req, res) => {

    const { userId } = req;

    try {
        // Query the dashboard for the given userId
        const info = await dashboardModel.findOne({ userId });

        if (!info) {
            return res.status(404).json({
                msg: "No dashboard found for this user.",
            });
        }

        // Send the apps array in the response
        res.status(200).json({
            msg: 'hehehe',
            apps: info.apps,
        });
    } catch (error) {
        // Handle any unexpected errors
        res.status(500).json({
            msg: "An error occurred while fetching the dashboard.",
            error: error.message,
        });
    }
};

// try to add validation , as multiple request can be sent
module.exports.updateDashboard = async (req, res) => {
    const { data_id, ...updateFields } = req.body; // Extract data_id and remaining fields
    const { userId } = req;

    const enterObjectId = new mongoose.Types.ObjectId(data_id);

    try {
        // Dynamically build the $set object for the update operation
        const updateSet = Object.keys(updateFields).reduce((acc, field) => {
            acc[`apps.$.${field}`] = updateFields[field];
            return acc;
        }, {});

        const infoUpdate = await dashboardModel.findOneAndUpdate(
            { userId: userId, 'apps._id': enterObjectId },
            { $set: updateSet },
            { new: true } // Return the updated document
        );

        if (!infoUpdate) {
            return res.status(404).json({ msg: "App not found or user unauthorized" });
        }

        return res.json({
            msg: "Update successful",
            infoUpdate,
        });
    } catch (err) {
        console.error("Error updating dashboard:", err);
        return res.status(500).json({ msg: "Internal server error" });
    }
};

module.exports.deleteDashboard = async (req, res) => {
    const { data_id } = req.body
    const { userId } = req;


    const enterObjectId = new mongoose.Types.ObjectId(data_id)

    try {
        const updateDashboard = await dashboardModel.findOneAndUpdate(
            { userId: userId },
            { $pull: { apps: { _id: enterObjectId } } },
            { new: true }
        )
        console.log(updateDashboard)
        if (!updateDashboard) {
            return res.status(404).json({ msg: "Dashboard or entry not found" });
        }

        res.json({
            msg: "Entry deleted successfully",
            updateDashboard,
        });
    } catch (error) {

        console.error(error);
        res.status(500).json({ msg: "Internal Server Error", error: error.message });
    }
}