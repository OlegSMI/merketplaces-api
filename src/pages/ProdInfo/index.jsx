import styles from "./ProdInfo.module.scss";
import back from "../../assets/sidebar/back.png";
import { useLocation } from "react-router-dom";

import { Field } from "../../components";
import { getInfoProductById } from "@api/operator/useChinaAPI";
// import avatar from "../../assets/ChinaBox.png";

function ProdInfo() {
  const location = useLocation();
  const { id } = location.state;

  const data = getInfoProductById(id);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => window.history.back()}>
          <img src={back} alt="back" />
        </button>
        <p>Инофрмация о товаре</p>
      </div>
      <div className={styles.body}>
        <img src={data.thumb} alt="Avatar" />
        <div className={styles.generalInfo}>
          <Field title="Артикул" text={data.id} />
          <Field title="Наименование" text={data.name} />
          <Field title="Категория" text={data.category} />
          <Field title="Описание" text={data.subject} />
          <Field title="Бренд" text={data.brand} />
          <Field title="Цвет" text={data.color} />
          <Field title="Рейтинг" text={data.rating} />
          <Field title="Кол-во отзывов" text={data.comments} />
        </div>
        <div className={`${styles.secondaryInfo} ${styles.generalInfo}`}>
          {/* <h5>Ключевые слова</h5>
          <div className={styles.keywords}>
            {keybords.map((keybord, index) => (
              <p key={index}>#{keybord}</p>
            ))}
          </div>

          <h5>Выручка</h5> */}
          <Field title="Дата первого появления" text={data.skuFirstDate} />
          <Field title="Общее кол-во продаж" text={data.sales} />
          <Field title="Окончательная цена товара" text={data.finalPrice} />
          <Field
            title="Cредний доход от продаж товара"
            text={data.revenueAverage}
          />
          <Field
            title="Cреднее количество продаж в день."
            text={data.salesPerDayAverage}
          />
          <Field
            title="Cредний доход от продаж товара. "
            text={data.revenueAverage}
          />

          <Field title="Окончательная цена товара." text={data.finalPrice} />
          <Field
            title="Цена, по которой товар предлагается клиенту."
            text={data.clientPrice}
          />
          <Field title="Ссылка на страницу товара. " text={data.url} />
        </div>
      </div>
    </div>
  );
}

export default ProdInfo;
