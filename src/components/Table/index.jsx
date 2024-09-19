import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { SparkLineChart } from "@mui/x-charts";
import PropTypes from "prop-types";
import * as React from "react";

function createData(
  check,
  name,
  profit,
  rating,
  comments,
  sells,
  revenue,
  dynamic
) {
  return {
    check,
    name,
    profit,
    rating,
    comments,
    sells,
    revenue,
    dynamic,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
        <TableCell component="th" scope="row">
          <Checkbox value={row.check}></Checkbox>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="center">{row.profit}</TableCell>
        <TableCell align="center">{row.rating}</TableCell>
        <TableCell align="center">{row.comments}</TableCell>
        <TableCell align="center">{row.sells}</TableCell>
        <TableCell align="center">{row.revenue}</TableCell>

        <TableCell align="center">
          <SparkLineChart
            data={row.dynamic}
            plotType="bar"
            height={40}
            width={150}
          />
        </TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0, border: "none" }}
          colSpan={6}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              1688 goods
              {/* <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.dynamic.map((historyRow) => (
                    <TableRow key={historyRow}>
                      {/* <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align="right">{historyRow.amount}</TableCell>
                      <TableCell align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell> */}
              {/* <div>{historyRow}</div>
                    </TableRow>
                  ))}
                </TableBody>
              </Table> */}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    check: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    profit: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    sells: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    dynamic: PropTypes.array.isRequired,
  }).isRequired,
};

const rows = [
  createData(
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
    false,
    "Валенки",
    346346,
    123,
    55,
    23232323,
    33434,
    [1, 3, 3, 5, 6, 8, 6, 3, 10, 20, 17, 12, 12, 13]
  ),
];

export default function CollapsibleTable() {
  return (
    <TableContainer
      component={Paper}
      elevation={0}
      sx={{ border: "1px solid #ccc" }}
    >
      <Table sx={{ minWidth: 650 }} size="small" aria-label="collapsible table">
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#F9F9FD",
            }}
          >
            <TableCell>
              <Checkbox></Checkbox>
            </TableCell>
            <TableCell>Товар</TableCell>
            <TableCell>Потенциальная прибыль за период</TableCell>
            <TableCell>Рейтинг</TableCell>
            <TableCell>Комментарии</TableCell>
            <TableCell>Продажи</TableCell>
            <TableCell>Выручка</TableCell>
            <TableCell>Динамика продаж</TableCell>
            <TableCell>Действие</TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            "& > :nth-last-child(2)": {
              "& > *": { borderBottom: "none" },
            },
          }}
        >
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
