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
import { useDispatch, useSelector } from "react-redux";
import { setWbProducts, deleteWbProduct } from "../../redux/wbProducts/slice";

import Row from "./mainRow";
import styles from "./Table.module.scss";
import emptyState from "../../assets/table/emptyState.svg";

const CollapsibleTable = ({
  search,
  categoryOption,
  currentPage,
  handlePageChange,
}) => {
  const products = useSelector((state) => state.wbProducts.items);
  // const currentPage = useSelector((state) => state.wbProducts.currentPage);
  const totalPages = useSelector((state) => state.wbProducts.totalPages);

  const [state, setState] = useState(false);
  const dispatch = useDispatch();

  const filterData = () => {
    return products.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (categoryOption === "" || item.category === categoryOption)
    );
  };

  const deleteRow = (e, id) => {
    e.stopPropagation();
    dispatch(deleteWbProduct(id));
  };

  const comboChange = (e, id) => {
    e.stopPropagation();
    console.log("id", id);
    dispatch(
      setWbProducts(
        products.map((row) =>
          row.id === id ? { ...row, check: !row.check } : row
        )
      )
    );
  };

  const saveEdit = (newData) => {
    dispatch(
      setWbProducts(
        products.map((item) => {
          if (item.id === newData.id) {
            return { ...item, ...newData };
          }
          return item;
        })
      )
    );
  };

  return (
    <div className={styles.table}>
      {products.length === 0 ? (
        <div className={styles.emptyState}>
          <img src={emptyState} alt="Empty State" />
          <p>Вы не применили фильтры для поиска товара</p>
          <p>Заполните поля фильтров, чтобы начать работу c таблицей</p>
        </div>
      ) : (
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
                        console.log(newState);
                        dispatch(
                          setWbProducts(
                            products.map((row) => ({ ...row, check: newState }))
                          )
                        );
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
                {filterData().map((row) => (
                  <Row
                    key={row.id}
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
              count={totalPages}
              shape="rounded"
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </>
      )}
    </div>
  );
};

CollapsibleTable.propTypes = {
  search: PropTypes.string,
  deleteRow: PropTypes.func,
  categoryOption: PropTypes.string,
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
};

export default CollapsibleTable;
