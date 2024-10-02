import {
  Pagination,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import PropTypes from "prop-types";
import React, { useState } from "react";

import AnalogRow from "./AnalogRow";
import styles from "./Table.module.scss";

const AnalogTable = () => {
  const [currentPage, setCurrentPage] = useState(1);

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
    // {
    //   key: "status",
    //   name: "Статус",
    //   sortable: true,
    //   direction: "asc",
    // },
    // {
    //   key: "action",
    //   name: "Действие",
    //   sortable: false,
    //   direction: "asc",
    // },
  ];

  const handlePageChange = (e, value) => {
    setCurrentPage(value);
  };

  // const changeDirectionHandle = (key, direction) => {
  //   setSortedProducts(sortedData(products, key, direction));
  // };

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
        {/* <TableHeader
          changeDirection={(key, direction) =>
            changeDirectionHandle(key, direction)
          }
        /> */}

        <TableBody
          sx={{
            "& > :nth-last-child(1)": {
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
