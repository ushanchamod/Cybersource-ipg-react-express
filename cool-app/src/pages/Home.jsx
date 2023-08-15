import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import Confirm from './Confirm';
import { useEffect, useMemo, useState } from 'react';
import moment from 'moment-timezone';


function Home() {

  const [data, setData] = useState(null);
  const [uuid, setUUID] = useState(null);
  const _uuid = useMemo(() => uuid, [uuid]);

  useEffect(() => {
    axios.get('http://localhost:3145/api/get-reference-number')
    .then(res => {
      setUUID(() => res.data.referenceNumber)
    })
  },[]);


  const handleForm = (e) => {
    e.preventDefault();
   
    const formattedDate = moment().utc().format("YYYY-MM-DDTHH:mm:ss[Z]");

    let data = {
      access_key: '26d2d2d38a123aac9f8d6076b99febea',
      profile_id: '305FCC81-2209-4726-AC56-9BD8444EFD99',
      transaction_uuid: uuidv4(),
      signed_field_names: 'access_key,profile_id,transaction_uuid,signed_field_names,unsigned_field_names,signed_date_time,locale,transaction_type,reference_number,amount,currency',
      unsigned_field_names: '',
      signed_date_time: formattedDate,
      locale: 'en',
      transaction_type: e.target.transaction_type.value,
      reference_number: e.target.reference_number.value,
      amount: e.target.amount.value,
      currency: e.target.currency.value,
    }

    axios.post('http://localhost:3145/api/submit-payment', {data})
    .then(res => {
      setData(() => res.data)
    })
    .catch(err => {
      console.log(err)
    })

  }
  
  if(uuid === null) return(<div>Loading...</div>)

  return(
    <div className='main'>
      {data && <Confirm data={data} />}
      <form onSubmit={handleForm} >
        <div>
          <label htmlFor="transaction_type">Transaction type</label>
          <input type="text" id='transaction_type' name='transaction_type' defaultValue="authorization" />
        </div>
        
        <div>
          <label htmlFor="reference_number">Reference number</label>
          <input type="text" id='reference_number' name='reference_number' defaultValue={_uuid} />
        </div>
        
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="text" id='amount' name='amount' defaultValue="100.00" />
        </div>
        
        <div>
          <label htmlFor="currency">Currency</label>
          <input type="text" id='currency' name='currency' defaultValue="USD" />
        </div>


        <input type="submit" value="Submit" />
      </form>

    </div>
  )
}

export default Home;
