import axios from 'axios';
import Confirm from './Confirm';
import { useEffect, useMemo, useState } from 'react';



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
   
    let data = {
      reference_number: e.target.reference_number.value,
      amount: e.target.amount.value,
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
          <label htmlFor="reference_number">Reference number</label>
          <input type="text" id='reference_number' name='reference_number' defaultValue={_uuid} />
        </div>
        
        <div>
          <label htmlFor="amount">Amount</label>
          <input type="text" id='amount' name='amount' defaultValue="100.00" />
        </div>

        <input type="submit" value="Submit" />
      </form>

    </div>
  )
}

export default Home;
