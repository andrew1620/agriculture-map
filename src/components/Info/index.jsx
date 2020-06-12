import React from 'react';
import css from './style.module.css';

const Info = ({ orderInfo }) => {
  const {
    name = 'loading...',
    batteryCharge = 'loading...',
    lastActivity = 'loading...',
    orderData: {
      tableNumber = 'loading...',
      orderNumber = 'loading...',
      orderDescription = 'loading...'
    } = {}
  } = orderInfo;
  return (
    <div className={css.robot}>
      <div>
        <span className={css.robotName}>{name}</span>
      </div>
      <div className={css.robotInfo}>
        <div className={css.charge}>
          Заряд батареи
          {` ${batteryCharge}`}
        </div>
        <div className={css.lastActivity}>Последняя активность{` ${lastActivity}`}</div>
      </div>
      <div className={css.case}>
        <span className={css.orderInfo}>Данные о заказе</span>
        <div className={css.caseInfo}>
          <div className={css.caseTitle}>Заказ №{` ${orderNumber}`}</div>
          <div className={css.caseTable}>Стол №{` ${tableNumber}`}</div>
          <div className={css.description}>{` ${orderDescription}`}</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
