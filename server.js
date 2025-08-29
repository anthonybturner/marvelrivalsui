const express = require('express');
const path = require('path');
const app = express();

// Serve static files from Angular dist folder
app.use(express.static(path.join(__dirname, 'dist/mrui-web')));

// Redirect all other routes to index.html (Angular handles routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/mrui-web', 'index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`🚀 Angular app running on port ${port}`);
});
