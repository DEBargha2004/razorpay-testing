'use client'

import { useEffect, useState } from 'react'

export default function Home () {
  const [allowPayment, setAllowPayment] = useState(false)
  const loadScript = async url => {
    const script = document.createElement('script')
    script.src = url

    script.onload = () => {
      setAllowPayment(true)
    }

    document.querySelector('body').appendChild(script)
  }
  const handlePay = async () => {
    let res = await fetch('/api/payment', { method: 'POST' })
    const { id, amount } = await res.json()
    var options = {
      key: process.env.NEXT_PUBLIC_key_id, // Enter the Key ID generated from the Dashboard
      amount: amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency: 'INR',
      name: 'Acme Corp', //your business name
      description: 'Test Transaction',
      image: 'https://example.com/your_logo',
      order_id: id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: function (response) {
        alert(response.razorpay_payment_id)
        alert(response.razorpay_order_id)
        alert(response.razorpay_signature)
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
        name: 'Gaurav Kumar', //your customer's name
        email: 'gaurav.kumar@example.com',
        contact: '9000090000' //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: 'Razorpay Corporate Office'
      },
      theme: {
        color: '#3399cc'
      }
    }
    if (!allowPayment) return
    const razorpay = new Razorpay(options)
    razorpay.open()
  }

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js')
  }, [])

  return (
    <div className='flex h-[100px] items-center justify-center'>
      <button
        className='px-2 py-1 rounded bg-violet-500 text-white'
        onClick={handlePay}
      >
        Pay
      </button>
    </div>
  )
}
