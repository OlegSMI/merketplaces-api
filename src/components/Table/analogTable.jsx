import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import PropTypes from "prop-types";

import AnalogRow from "./analogRow";
import styles from "./Table.module.scss";

const AnalogTabble = ({ data }) => {
  return (
    <Table sx={{ minWidth: 650 }} size="small" aria-label="collapsible table">
      <TableHead>
        <TableRow className={styles.tableHead}>
          <TableCell align="center">Фото</TableCell>
          <TableCell align="center">Наименование товара</TableCell>
          <TableCell align="center">Цена</TableCell>
          <TableCell align="center">Статус</TableCell>
          <TableCell align="center">Количество</TableCell>
          <TableCell align="center">Рейтинг</TableCell>
          <TableCell align="center">Маркетплейс</TableCell>
          <TableCell align="center">Число продаж</TableCell>
        </TableRow>
      </TableHead>

      <TableBody
        sx={{
          "& > :nth-last-child(n)": {
            "& > *": { border: "none" },
          },
        }}
      >
        {/* <TableCell align="center"> */}
        {data.map((item, index) => (
          <AnalogRow item={item} key={index} />
        ))}
        {/* </TableCell> */}
      </TableBody>
    </Table>
  );
};

AnalogTabble.propTypes = {
  data: PropTypes.array.isRequired,
};

export default AnalogTabble;
