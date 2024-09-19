import React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { SparkLineChart } from "@mui/x-charts";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Checkbox } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import AnalogTabble from "./analogTable";

const theme = createTheme({
  palette: {
    red: {
      main: "#e63946",
    },
  },
});

const Row = ({ row, deleteRow, comboChange }) => {
  const [open, setOpen] = React.useState(false);
  const [analogProd, setanalogProd] = React.useState([
    {
      avatar: 1,
      name: "Нижнее белье",
      price: 15000,
      status: {
        code: 0,
        text: "На хранении",
      },
      count: 10,
      rating: 3.0,
      market: "Alibaba",
      sales: 123,
    },
    {
      avatar: 1,
      name: "Нижнее белье",
      price: 15000,
      status: {
        code: 1,
        text: "Списан",
      },
      count: 10,
      rating: 4.5,
      market: "Alibaba",
      sales: 123,
    },
    {
      avatar: 1,
      name: "Нижнее белье",
      price: 15000,
      status: {
        code: 2,
        text: "Выдан",
      },
      count: 10,
      rating: 1.5,
      market: "Alibaba",
      sales: 123,
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell>
            <Checkbox
              checked={row.check}
              onClick={() => comboChange(row.name)}
            ></Checkbox>
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
          <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="center">
            <IconButton aria-label="edit" size="small">
              <EditIcon />
            </IconButton>
          </TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={() => deleteRow(row.name)}
            >
              <DeleteForeverIcon color="red" />
            </IconButton>
          </TableCell>
        </TableRow>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              border: "none",
            }}
            colSpan={12}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <AnalogTabble data={analogProd} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
};

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
  deleteRow: PropTypes.func.isRequired,
  comboChange: PropTypes.func.isRequired,
};

export default Row;
