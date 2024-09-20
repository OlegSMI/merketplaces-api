import { Checkbox } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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
              <TableCell>
                <Checkbox
                  checked={state}
                  onClick={() => {
                    const newState = !state;
                    setRows(rows.map((row) => ({ ...row, check: newState })));
                    setState(newState);
                  }}
                />
              </TableCell>
              <TableCell>Товар</TableCell>
              <TableCell>Потенциальная прибыль за период</TableCell>
              <TableCell>Рейтинг</TableCell>
              <TableCell>Комментарии</TableCell>
              <TableCell>Продажи</TableCell>
              <TableCell>Выручка</TableCell>
              <TableCell>Динамика продаж</TableCell>
              <TableCell>Действие</TableCell>
              <TableCell>Изменить</TableCell>
              <TableCell>Удалить</TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              "& > :nth-last-child(2)": {
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
