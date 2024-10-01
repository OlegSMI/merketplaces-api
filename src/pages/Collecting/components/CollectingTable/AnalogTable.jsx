import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Stack,
  Pagination,
  CircularProgress,
} from "@mui/material";

import AnalogRow from "./AnalogRow";
import styles from "./Table.module.scss";

const AnalogTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  return (
    <>
      {/* {(products === null && (
        <CircularProgress color="white"></CircularProgress>
      )) ||
        (products.length === 0 ? (
          <div className={styles.emptyAnalogs}>Нет аналогов</div>
        ) : ( */}
      <Table sx={{ minWidth: 650 }} size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow className={styles.tableHead}>
            <TableCell align="center">Товар</TableCell>
            <TableCell align="center">Цена</TableCell>
            <TableCell align="center">Вес</TableCell>
            <TableCell align="center">Статус</TableCell>
            <TableCell align="center">Действие</TableCell>
          </TableRow>
        </TableHead>

        <TableBody
          sx={{
            "& > :nth-last-child()": {
              "& > *": { border: "none" },
            },
          }}
        >
          {/* {products?.map((item) => ( */}
          {[...Array(5)].map((item) => (
            <AnalogRow key={item} />
          ))}

          {/* ))} */}
        </TableBody>
      </Table>
      <Stack className={styles.pagination}>
        <Pagination
          count={3}
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
      {/* ))} */}
    </>
  );
};

export default AnalogTable;

AnalogTable.propTypes = {
  products: PropTypes.array,
};
