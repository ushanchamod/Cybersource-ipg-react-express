const { v4 } = require('uuid');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const sign = require('./security');
const moment = require('moment-timezone');
const transporter = require('./components/email');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});


app.post('/api/submit-payment', async (req, res) => {
  
  const {data} = req.body;

  if(data){
    req.body.data.access_key = '26d2d2d38a123aac9f8d6076b99febea';
    req.body.data.profile_id = '305FCC81-2209-4726-AC56-9BD8444EFD99';
    req.body.data.transaction_uuid = v4();
    req.body.data.signed_field_names = 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency,bill_to_address_city,bill_to_address_country,bill_to_address_line1,bill_to_address_postal_code,bill_to_email,bill_to_forename,bill_to_surname';
    req.body.data.unsigned_field_names = '';
    req.body.data.signed_date_time = moment().utc().format("YYYY-MM-DDTHH:mm:ss[Z]");
    req.body.data.locale = 'en';
    req.body.data.transaction_type = 'authorization';
    req.body.data.currency = 'LKR';

    // need to add as user
    req.body.data.bill_to_address_city = 'Polonnaruwa';
    req.body.data.bill_to_address_country = 'LK';
    req.body.data.bill_to_address_line1 = 'Weerapura, Thambala, Polonnaruwa';
    req.body.data.bill_to_address_postal_code = '51049';
    req.body.data.bill_to_email  = 'ushanchamodbandara@gmail.com';
    req.body.data.bill_to_forename  = 'Ushan';
    req.body.data.bill_to_surname   = 'Chamod';
    // reference number comes from front end in this case

    

    let signData = sign(data);
    let resData = {
      ...data, 
      signature: signData};
    

    console.log(resData);
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



app.post('/api/verify-payment', async (req, res) => {

  const sendData = {
    body : req.body,
    headers : req.headers
  }

  const convert_to_string = JSON.stringify(sendData);

  let mailOptions = {
    from: " Check workable <uc.chamod.public@gmail.com>",
    to: `ushanchamodbandara@gmail.com`,
    subject: "Call end point from cyber source",
    text: convert_to_string,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      return res.status(500).send("email_can_not_send"); //****** output
    } else {
      //   console.log("Email sent: " + info.response);
      return res.status(200).send({ ID: result.insertId }); //****** output
    }
  });

  return res.send(convert_to_string);

})


// Start the Express server
const PORT = process.env.PORT || 3145;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


