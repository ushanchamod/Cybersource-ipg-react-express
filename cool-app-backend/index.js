const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sign = require('./security');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
})


app.post('/api/submit-payment', async (req, res) => {
  const {data} = req.body;;

  if(data){
    let signData = sign(data);
    let resData = {...data, signature: signData};
    

    res.header('Access-Control-Allow-Origin', '*');
    return res.status(200).json(resData);
    
  }

  // response error
  res.status(400).json({ message: 'Invalid request' })
});

app.get('/api/get-reference-number', async (req, res) => {
  const uuid = String(Math.floor(Math.random() * 1000000000));
  return res.status(200).json({ referenceNumber: uuid });
});


// Start the Express server
const PORT = process.env.PORT || 3145;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
