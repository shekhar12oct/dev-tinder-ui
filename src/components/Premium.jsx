import React from 'react';
import axiosInstance from '../utils/axiosInstance';

const Premium = () => {
  const handleBuyClick = async (type) => {
    const order = await axiosInstance.post('/payment/create', {
      membershipType: type,
    });

    const { amount, keyId, currency, notes, orderId } = order.data;
    const options = {
      key: keyId,
      amount,
      currency,
      name: 'Dev Tinder',
      description: 'Connect to other developers',
      order_id: orderId,
      prefill: {
        name: `${notes.firstName} ${notes.lastName}`,
        email: notes.email,
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    //   it should open the razorpay dialog box
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className='m-10'>
      <div className='flex w-full flex-col lg:flex-row'>
        <div className='card bg-base-300 rounded-box grid h-80 grow place-items-center'>
          <h1 className='font-bold text-3xl'>Silver Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>100 connections request per day</li>
            <li>Blue Tick</li>
            <li>3 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick('silver')}
            className='btn btn-secondary'
          >
            Buy Silver
          </button>
        </div>
        <div className='divider lg:divider-horizontal'>OR</div>
        <div className='card bg-base-300 rounded-box grid h-80 grow place-items-center'>
          <h1 className='font-bold text-3xl'>Gold Membership</h1>
          <ul>
            <li>Chat with other people</li>
            <li>Infinite connections request per day</li>
            <li>Blue Tick</li>
            <li>6 Months</li>
          </ul>
          <button
            onClick={() => handleBuyClick('gold')}
            className='btn btn-primary'
          >
            Buy Gold
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;
