import React from 'react';
import css from './style.module.css';

const Info = () => {
  return (
    <div className={css.robot}>
      <div>
        <span className={css.robotName}>vehicle 1</span>
      </div>
      <div className={css.robotInfo}>
        <div className={css.charge}> Заряд батареи 22%</div>
        <div className={css.lastActivity}>Последняя активность 12:33</div>
      </div>
      <div className={css.case}>
        <span className={css.orderInfo}>Данные о заказе</span>
        <div className={css.caseInfo}>
          <div className={css.caseTitle}>Заказ № 12</div>
          <div className={css.caseTable}>Стол № 5</div>
          <div className={css.description}>Здесь описание заказа</div>
        </div>
      </div>
    </div>
  );
};

export default Info;
