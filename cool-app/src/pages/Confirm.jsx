import React, { useEffect, useState } from 'react'

export default function Confirm({data}) {
  const [mapArray,setMapArray] = useState(null)


  useEffect(() => {
    setMapArray(() => Object.entries(data));
  },[data])

  const handleSubmit = (e) => {
    e.preventDefault()

    const data1 = {
      "access_key": e.target.access_key.value,
      "profile_id": e.target.profile_id.value,
      "transaction_uuid": e.target.transaction_uuid.value,
      "signed_field_names": e.target.signed_field_names.value,
      "unsigned_field_names": e.target.unsigned_field_names.value,
      "signed_date_time": e.target.signed_date_time.value,
      "locale": e.target.locale.value,
      "transaction_type": e.target.transaction_type.value,
      "reference_number": e.target.reference_number.value,
      "amount": e.target.amount.value,
      "currency": e.target.currency.value,
      "signature": e.target.signature.value,
      "submit": e.target.submit.value
    }

    console.log(data1);

  }

  if(data && mapArray) return (
    <div className='config'>
      <form action="https://testsecureacceptance.cybersource.com/pay" method='POST' >

        {
          mapArray.map((el, index) => {
            return(
              
                <div key={index}>
                <label htmlFor={el[0]}>{el[0]}</label>
                <input type="text" id={el[0]} name={el[0]} defaultValue={el[1]} />
                </div>
           
            )
          })
        }

        <input type="submit" id="submit" value="Confirm" />

      </form>
    </div>
  )
}
