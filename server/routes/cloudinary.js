const {uploadController} = require("../controllers/cloudinaryController");

const router = require("express").Router();
const Multer = require("multer");

const storage = new Multer.memoryStorage();
const upload = Multer({storage});

router.post("/upload", upload.single('image'), uploadController);

module.exports = router;