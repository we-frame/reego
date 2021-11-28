import React from 'react';
import styles from '@/styles/account/Orders.module.css';

const Orders = () => {
  return (
    <section>
      <h4>My Orders</h4>
      <p>Vipul Uthaiah</p>
      <hr />
      <div>
        <div className={styles.ordersComp}>
          <h5>Arriving Tomorrow</h5>
          <p>On Tue,2 Nov</p>
          <div>
            <h3>Iphone 13</h3>
            <p>Screen Issues and battery issues</p>
            <p>Tracking no : 3838792</p>
          </div>
        </div>
        <div className={styles.ordersComp}>
          <h5>Resolved</h5>
          <p>On Tue,2 Nov</p>
          <div>
            <h3>Realme 7</h3>
            <p>battery issues</p>
            <p>Tracking no : 8738723</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
