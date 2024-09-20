// backend/controllers/upload-controller.js

const uploadLogo = (req, res) => {
  try {
    res.json({ logo: req.file.filename });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const uploadStaff = (req, res) => {
  try {
    res.json({
      photo: req.files['photo'] ? req.files['photo'][0].filename : null,
      front_image: req.files['front_image'] ? req.files['front_image'][0].filename : null,
      back_image: req.files['back_image'] ? req.files['back_image'][0].filename : null,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadLogo,
  uploadStaff,
};
