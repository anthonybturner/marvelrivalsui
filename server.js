const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'dist/mrui-web')));

// Catch-all handler to return index.html for Angular routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mrui-web', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Angular app running on port ${port}`);
});
