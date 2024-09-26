import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import PropTypes from "prop-types";

import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getProductsByImage } from "@api/operator/useChinaAPI";
import AnalogRow from "./analogRow";
import styles from "./Table.module.scss";

const AnalogTabble = React.memo(function AnalogTabble({ product }) {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setProducts(await getProductsByImage(product));
    };
    fetchProducts();
  }, []);

  console.log(products);

  return (
    <>
      {(products === null && (
        <CircularProgress color="white"></CircularProgress>
      )) ||
        (products.length === 0 ? (
          <div className={styles.emptyAnalogs}>Нет аналогов</div>
        ) : (
          <Table
            sx={{ minWidth: 650 }}
            size="small"
            aria-label="collapsible table"
          >
            <TableHead>
              <TableRow className={styles.tableHead}>
                <TableCell align="center">Товар</TableCell>
                <TableCell align="center">Цена</TableCell>
                <TableCell align="center">Название компании</TableCell>
                <TableCell align="center">Ссылка</TableCell>
                <TableCell align="center">Статус</TableCell>
                <TableCell align="center">Действие</TableCell>
              </TableRow>
            </TableHead>

            <TableBody
              sx={{
                "& > :nth-last-child(n)": {
                  "& > *": { border: "none" },
                },
              }}
            >
              {products?.map((item) => (
                <AnalogRow item={item} key={item.id} />
              ))}
            </TableBody>
          </Table>
        ))}
    </>
  );
});

AnalogTabble.propTypes = {
  product: PropTypes.number.isRequired,
};

export default AnalogTabble;
