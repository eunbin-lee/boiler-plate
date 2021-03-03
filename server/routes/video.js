const express = require('express');
const router = express.Router();
// const { Video } = require('../models/Video');

const { auth } = require('../middleware/auth');
const multer = require('multer');

// config 옵션
let storage = multer.diskStorage({
  // uploads 폴더에 파일 저장
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  // 저장할 때 파일 이름 설정 (ex. 2021030312345_hello)
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  // mp4 확장자만 올릴 수 있도록 설정
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    }
    cb(null, true);
  },
});

const upload = multer({ storage: storage }).single('file');

//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
  // 비디오를 서버에 저장한다.
  upload(req, res, (err) => {
    // 에러가 일어나면 VideoUploadPage.js의 alert가 뜨도록 설정
    if (err) {
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
