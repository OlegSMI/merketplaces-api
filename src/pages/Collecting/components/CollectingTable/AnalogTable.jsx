import { useEffect, useState } from "react";

import {
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";

import { getAlibabaProducts } from "@api/operator/useCollectGoodsAPI";
import AnalogRow from "./AnalogRow";

import styles from "./Table.module.scss";

const AnalogTable = ({ itemId, weight }) => {
  const [products, setProducts] = useState([]);

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
      key: "link",
      name: "Ссылка",
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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAlibabaProducts(itemId);
      setProducts(response);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (products.length !== 0) {
      console.log("change");
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.weight === 0 ? { ...product, weight } : product
        )
      );
    }
  }, [weight]);

  return (
    <>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow className={styles.tableHead}>
            {headerContent.map((item) => (
              <TableCell
                key={item.key}
                align="center"
                className={styles.tableHeadCell}
              >
                <div>{item.name}</div>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            "& > :nth-last-child(1)": {
              "& > *": { border: "none" },
            },
          }}
        >
          {products.length > 0 ? (
            <>
              {products.map((item) => (
                <AnalogRow key={item.id} item={item} />
              ))}
            </>
          ) : (
            <CircularProgress />
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default AnalogTable;

AnalogTable.propTypes = {
  itemId: PropTypes.number,
  weight: PropTypes.number,
};
