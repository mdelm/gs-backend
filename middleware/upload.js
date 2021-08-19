const express = require('express');
const multer  = require('multer');
const fs = require('fs');
const dir = './uploads';

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }
    console.log("hello");
    callback(null, dir);
  },
  filename: (req, file, callback) => {
    callback(null, `${file.originalname}`);
  }
});

const fileFilter = (req, file, callback) => {  
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') { 
    callback(null, true);
  } else {
    callback(null, false);  
  } 
}

const upload = multer({ 
  storage: storage,
  limits: {
    fieldSize: 500 * 1024 * 1024,
  }, 
  fileFilter: fileFilter 
});

module.exports = upload;
