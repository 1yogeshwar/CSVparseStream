

const express = require('express');
const multer = require('multer'); 
const router = express.Router();
const controller = require('../controller/csv.controller');


const upload = multer({ storage: multer.memoryStorage() });


router.post('/', upload.single('file'),  controller.validateCsv  )

// router.post('/validate', upload.single('file'), (req, res) => { 
//   if (!req.file) {
//     return res.send('No file uploaded');
//   }
  
//   res.send('File received: ' + req.file.originalname);
// });

module.exports = router;