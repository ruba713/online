const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/:filename', (req, res) => {
  const filePath = path.join(__dirname, '../videos', req.params.filename);
  const stat = fs.statSync(filePath);
  const range = req.headers.range;

  if (!range) {
    return res.status(416).send('Requires range header');
  }

  const [start, end] = range.replace(/bytes=/, "").split("-");
  const startByte = parseInt(start, 10);
  const endByte = end ? parseInt(end, 10) : stat.size - 1;
  const chunkSize = endByte - startByte + 1;

  const file = fs.createReadStream(filePath, { start: startByte, end: endByte });
  const headers = {
    'Content-Range': `bytes ${startByte}-${endByte}/${stat.size}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': chunkSize,
    'Content-Type': 'video/mp4',
  };

  res.writeHead(206, headers);
  file.pipe(res);
});

module.exports = router;
