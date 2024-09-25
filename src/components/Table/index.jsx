import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import PropTypes from "prop-types";

import { useSelector } from "react-redux";

import emptyState from "../../assets/table/emptyState.svg";
import Row from "./mainRow";
import styles from "./Table.module.scss";

const CollapsibleTable = ({
  search,
  currentPage,
  handlePageChange,
  products,
}) => {
  const totalPages = useSelector((state) => state.wbProducts.totalPages);

  const filterData = () => {
    return products?.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className={styles.table}>
      {products?.length === 0 ? (
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
                  <TableCell align="center">Товар</TableCell>
                  <TableCell align="center">Доход от продаж</TableCell>
                  <TableCell align="center">Рейтинг</TableCell>
                  <TableCell align="center">Кол-во отзывов</TableCell>
                  <TableCell align="center">Кол-во продаж</TableCell>
                  <TableCell align="center">Выручка</TableCell>
                  <TableCell align="center">Динамика продаж</TableCell>
                  <TableCell align="center">Статус</TableCell>
                  <TableCell align="center">Действие</TableCell>
                </TableRow>
              </TableHead>

              <TableBody
                sx={{
                  "& > :nth-last-child(n)": {
                    "& > *": { borderBottom: "none" },
                  },
                }}
              >
                {filterData()?.map((row) => (
                  <Row key={row.id} row={row} />
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
  currentPage: PropTypes.number,
  handlePageChange: PropTypes.func,
  products: PropTypes.array,
};

export default CollapsibleTable;
