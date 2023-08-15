
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Router from './Router';

function App() {

  const callCyberSours = async (data) => {
    const headers = {
      'Content-Type': 'application/json',
    };

    axios.post('https://testsecureacceptance.cybersource.com/pay', {data}, headers)
    .then(res => {
      console.log(res)
    })
  }


  const handleForm = (e) => {

    const data = {
      access_key: '26d2d2d38a123aac9f8d6076b99febea',
      profile_id: '305FCC81-2209-4726-AC56-9BD8444EFD99',
      transaction_uuid: uuidv4(),
      signed_field_names: 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency',
      unsigned_field_names: '',
      signed_date_time: new Date().toISOString(),
      locale: 'en',
      transaction_type: e.target.transaction_type.value,
      reference_number: e.target.reference_number.value,
      amount: e.target.amount.value,
      currency: e.target.currency.value,
    }

    axios.post('http://localhost:3145/api/submit-payment', {data})
    .then(res => {
      console.log(res.data)
      callCyberSours(res.data)
    })
    .catch(err => {
      console.log(err)
    })

  }
  
  return(
    <Router />
  )
}

export default App;
