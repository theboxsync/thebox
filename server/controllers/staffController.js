const Staff = require("../models/staffModel");

const getStaffPositions = (req, res) => {
  try {
    Staff.distinct("position", { hotel_id: req.user }).then((data) =>
      res.json(data)
    );
  } catch (error) {
    console.log(error);
  }
};

const getStaffData = (req, res) => {
  try {
    Staff.find({ hotel_id: req.user })
      .then((data) => {
        res.json(data);
      })
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const getStaffDataById = (req, res) => {
  try {
    const staffId = req.params.id;
    Staff.findOne({ _id: staffId }).then((data) => {
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

const addStaff = (req, res) => {
  try {
    console.log(req.body);
    const staffData = { ...req.body, hotel_id: req.user };
    Staff.create(staffData)
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
  }
};

const updateStaff = async (req, res) => {
  try {
    const staffId = req.params.id;
    const updatedData = req.body;

    // Find the existing staff member by ID to check for old images
    const existingStaff = await Staff.findById(staffId);

    if (!existingStaff) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (updatedData.photo !== null) {
      if (existingStaff.photo) {
        console.log("Photo Found");
        const oldPhotoPath = path.join(
          __dirname,
          `../uploads/staff/profile/${existingStaff.photo}`
        );
        console.log("Old Path : ", oldPhotoPath);
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath);
        } else {
          console.log("Photo Not Found");
        }
      }
    } else {
      updatedData.photo = existingStaff.photo;
    }

    if (updatedData.front_image !== null) {
      if (existingStaff.front_image) {
        const oldFrontImagePath = path.join(
          __dirname,
          `../uploads/staff/id_cards/${existingStaff.front_image}`
        );
        if (fs.existsSync(oldFrontImagePath)) {
          fs.unlinkSync(oldFrontImagePath);
        }
      }
    } else {
      updatedData.front_image = existingStaff.front_image;
    }

    if (updatedData.back_image !== null) {
      if (existingStaff.back_image) {
        const oldBackImagePath = path.join(
          __dirname,
          `../uploads/staff/id_cards/${existingStaff.back_image}`
        );
        if (fs.existsSync(oldBackImagePath)) {
          fs.unlinkSync(oldBackImagePath);
        }
      }
    } else {
      updatedData.back_image = existingStaff.back_image;
    }

    // Update the staff data in the database
    const updatedStaff = await Staff.findByIdAndUpdate(staffId, updatedData, {
      new: true,
    });

    res.json({ message: "Staff updated successfully", staff: updatedStaff });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteStaff = async (req, res) => {
  try {
    const staffId = req.params.id; // This is the staff ID you want to delete
    const staffData = await Staff.findById(staffId);

    if (!staffData) {
      return res.status(404).json({ message: "Staff not found" });
    }

    if (staffData.photo) {
      console.log("Photo Found");
      const oldPhotoPath = path.join(
        __dirname,
        `../uploads/staff/profile/${staffData.photo}`
      );
      console.log("Old Path : ", oldPhotoPath);
      if (fs.existsSync(oldPhotoPath)) {
        fs.unlinkSync(oldPhotoPath);
      } else {
        console.log("Photo Not Found");
      }
    }

    if (staffData.front_image) {
      const oldFrontImagePath = path.join(
        __dirname,
        `../uploads/staff/id_cards/${staffData.front_image}`
      );
      if (fs.existsSync(oldFrontImagePath)) {
        fs.unlinkSync(oldFrontImagePath);
      }
    }

    if (staffData.back_image) {
      const oldBackImagePath = path.join(
        __dirname,
        `../uploads/staff/id_cards/${staffData.back_image}`
      );
      if (fs.existsSync(oldBackImagePath)) {
        fs.unlinkSync(oldBackImagePath);
      }
    }

    Staff.deleteOne({ _id: staffId })
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred");
  }
};

module.exports = {
  getStaffPositions,
  getStaffData,
  getStaffDataById,
  addStaff,
  updateStaff,
  deleteStaff,
};
