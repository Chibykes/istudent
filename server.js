const express = require('express');
const app = express();
const path = require('path');

const static = path.resolve(__dirname, 'src/public');
const port = process.env.PORT || 8080;
const uri = '0.0.0.0';

app.use(express.json());
app.use(express.static(static));
app.use(express.urlencoded({ extended: true }));

app.get('/scan', (req, res)=>{
    res.sendFile(path.resolve(static, 'index.html'));
});

app.listen(port, uri, () => {
    console.log(`Server is running on port ${port}`)
});