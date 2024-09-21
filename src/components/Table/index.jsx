import {
  TableBody,
  Checkbox,
  Stack,
  TableRow,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableCell,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";
import { useState } from "react";

import Row from "./mainRow";
import styles from "./Table.module.scss";

const CollapsibleTable = ({ search }) => {
  const createData = (
    id,
    check,
    name,
    profit,
    rating,
    comments,
    sells,
    revenue,
    dynamic
  ) => {
    return {
      id,
      check,
      name,
      profit,
      rating,
      comments,
      sells,
      revenue,
      dynamic,
    };
  };
  const [rows, setRows] = useState([
    createData(
      0,
      false,
      "Трусы",
      346346,
      123,
      11,
      23232323,
      33434,
      [1, 3, 3, 5, 6, 8, 6, 3, 10, 20, 17, 12, 12, 13]
    ),
    createData(
      1,
      false,
      "Носки",
      346346,
      123,
      22,
      23232323,
      33434,
      [1, 3, 3, 5, 6, 8, 6, 3, 10, 20, 17, 12, 12, 13]
    ),
    createData(
      2,
      false,
      "Комплект белья",
      346346,
      123,
      33,
      23232323,
      33434,
      [1, 3, 3, 5, 6, 8, 6, 3, 10, 20, 17, 12, 12, 13]
    ),
    createData(
      3,
      false,
      "Слюнявчик",
      346346,
      123,
      44,
      23232323,
      33434,
      [1, 3, 3, 5, 6, 8, 6, 3, 10, 20, 17, 12, 12, 13]
    ),
    createData(
      4,
      false,
      "Валенки",
      346346,
      123,
      55,
      23232323,
      33434,
      [1, 3, 3, 5, 6, 8, 6, 3, 10, 20, 17, 12, 12, 13]
    ),
  ]);
  const [state, setState] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Начальная страница

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    console.log("Текущая страница:", value);
  };

  const deleteRow = (e, id) => {
    e.stopPropagation();
    setRows((rows) => rows.filter((row) => row.id !== id));
  };

  const comboChange = (e, name) => {
    e.stopPropagation();
    setRows((rows) =>
      rows.map((row) =>
        row.name === name ? { ...row, check: !row.check } : row
      )
    );
  };

  const filteredProducts = rows.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const saveEdit = (newData) => {
    console.log("Новые данные:", newData);
    const updatedRows = rows.map((item) => {
      if (item.id === newData.id) {
        return { ...item, ...newData };
      }
      return item;
    });

    setRows(updatedRows);
    console.log("Сохраненные данные:", rows);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        className={styles.container}
      >
        <Table
          sx={{ minWidth: 650 }}
          size="small"
          aria-label="collapsible table"
        >
          <TableHead>
            <TableRow className={styles.tableHead}>
              <TableCell align="center">
                <Checkbox
                  checked={state}
                  onClick={() => {
                    const newState = !state;
                    setRows(rows.map((row) => ({ ...row, check: newState })));
                    setState(newState);
                  }}
                />
              </TableCell>
              <TableCell align="start">Товар</TableCell>
              <TableCell align="center">
                Потенциальная прибыль за период
              </TableCell>
              <TableCell align="center">Рейтинг</TableCell>
              <TableCell align="center">Комментарии</TableCell>
              <TableCell align="center">Продажи</TableCell>
              <TableCell align="center">Выручка</TableCell>
              <TableCell align="center">Динамика продаж</TableCell>
              <TableCell align="center">Действие</TableCell>
              <TableCell align="center">Изменить</TableCell>
              <TableCell align="center">Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& > :nth-last-child(n)": {
                "& > *": { borderBottom: "none" },
              },
            }}
          >
            {filteredProducts.map((row) => (
              <Row
                key={row.name}
                row={row}
                deleteRow={(e) => deleteRow(e, row.id)}
                comboChange={comboChange}
                saveEdit={saveEdit}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack className={styles.pagination}>
        <Pagination
          count={10}
          shape="rounded"
          page={currentPage}
          onChange={handlePageChange}
        />
      </Stack>
    </>
  );
};

CollapsibleTable.propTypes = {
  search: PropTypes.string,
};

export default CollapsibleTable;
