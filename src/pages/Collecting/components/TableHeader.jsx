import sortImg from "@assets/table/sort.png";
import { TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import styles from "./Table.module.scss";

const headerContent = [
  {
    key: "article",
    name: "Артикул",
    sortable: false,
    direction: "asc",
  },
  {
    key: "name",
    name: "Товар",
    sortable: true,
    direction: "asc",
  },
  {
    key: "category",
    name: "Категория",
    sortable: true,
    direction: "asc",
  },
  {
    key: "price",
    name: "Цена",
    sortable: true,
    direction: "asc",
  },
  {
    key: "weight",
    name: "Вес",
    sortable: true,
    direction: "asc",
  },
  {
    key: "status",
    name: "Статус",
    sortable: true,
    direction: "asc",
  },
  {
    key: "action",
    name: "Действие",
    sortable: false,
    direction: "asc",
  },
];

const TableHeader = () => {
  const [headers, setHeaders] = useState(headerContent);

  const requestSort = (headItem) => {
    if (!headItem.sortable) {
      return;
    }

    let direction = "asc";

    if (headItem.direction === "asc") {
      direction = "desc";
    } else direction = "asc";

    setHeaders([...headers, { ...headItem, direction: direction }]);
    console.log(headers);
  };

  return (
    <TableHead>
      <TableRow className={styles.tableHead}>
        {headers.map((headItem) => {
          <TableCell
            key={headItem.key}
            align="center"
            sx={{ ...(headItem.sortable && { cursor: "pointer" }) }}
            onClick={() => requestSort(headItem)}
          >
            {headItem.name} <img src={sortImg} alt="sort" />
          </TableCell>;
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
