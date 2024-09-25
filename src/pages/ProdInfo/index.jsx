import styles from "./ProdInfo.module.scss";
import back from "../../assets/sidebar/back.png";
import { useLocation } from "react-router-dom";

import { Field } from "../../components";
// import { getInfoProductById } from "@api/operator/useChinaAPI";
// import avatar from "../../assets/ChinaBox.png";

function ProdInfo() {
  const location = useLocation();
  // const { id } = location.state;
  // const data = getInfoProductById(id);
  const { data, sourse } = location.state;

  console.log(data, sourse);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => window.history.back()}>
          <img src={back} alt="back" />
        </button>
        <p>Инофрмация о товаре</p>
      </div>
      <div className={styles.body}>
        <img src={sourse === "wb" ? data.thumb : ""} alt="Avatar" />
        <div className={styles.generalInfo}>
          <Field
            title="Артикул"
            text={sourse === "wb" ? data.id : data.itemId}
          />
          <Field
            title="Наименование"
            text={sourse === "wb" ? data.name : "china"}
          />
          <Field
            title="Категория"
            text={sourse === "wb" ? data.category : "china"}
          />
          <Field
            title="Описание"
            text={sourse === "wb" ? data.subject : "china"}
          />
          <Field title="Бренд" text={sourse === "wb" ? data.brand : "china"} />
          <Field title="Цвет" text={sourse === "wb" ? data.color : "china"} />
          <Field
            title="Рейтинг"
            text={sourse === "wb" ? data.rating : "china"}
          />
          <Field
            title="Кол-во отзывов"
            text={sourse === "wb" ? data.comments : "china"}
          />
        </div>
        <div className={`${styles.secondaryInfo} ${styles.generalInfo}`}>
          {/* <h5>Ключевые слова</h5>
          <div className={styles.keywords}>
            {keybords.map((keybord, index) => (
              <p key={index}>#{keybord}</p>
            ))}
          </div>

          <h5>Выручка</h5> */}
          <Field
            title="Дата первого появления"
            text={sourse === "wb" ? data.skuFirstDate : "china"}
          />
          <Field
            title="Общее кол-во продаж"
            text={sourse === "wb" ? data.sales : "china"}
          />
          <Field
            title="Окончательная цена товара"
            text={sourse === "wb" ? data.finalPrice : "china"}
          />
          <Field
            title="Cредний доход от продаж товара"
            text={sourse === "wb" ? data.revenueAverage : "china"}
          />
          <Field
            title="Cреднее количество продаж в день."
            text={sourse === "wb" ? data.salesPerDayAverage : "china"}
          />
          <Field
            title="Cредний доход от продаж товара. "
            text={sourse === "wb" ? data.revenueAverage : "china"}
          />

          <Field
            title="Окончательная цена товара."
            text={sourse === "wb" ? data.finalPrice : "china"}
          />
          <Field
            title="Цена, по которой товар предлагается клиенту."
            text={sourse === "wb" ? data.clientPrice : "china"}
          />
          <Field
            title="Ссылка на страницу товара. "
            text={sourse === "wb" ? data.url : "china"}
          />
        </div>
      </div>
    </div>
  );
}

export default ProdInfo;
