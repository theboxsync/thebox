const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadLogo, uploadStaff } = require("../controllers/upload-controller");

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = path.join(__dirname, '../uploads');
    if (file.fieldname === 'photo') {
      uploadPath = path.join(uploadPath, 'staff/profile');
    } else if (file.fieldname === 'front_image' || file.fieldname === 'back_image') {
      uploadPath = path.join(uploadPath, 'staff/id_cards');
    }
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Route for uploading the logo
router.post('/uploadlogo', upload.single('logo'), uploadLogo);

// Route for uploading staff details and photos
router.post('/uploadstaff', upload.fields([
  { name: 'photo' },
  { name: 'front_image' },
  { name: 'back_image' },
]), uploadStaff);

module.exports = router;
