import React from "react";
import {
  TableRow,
  TableCell,
  Checkbox,
  IconButton,
  TextField,
  Avatar,
  Collapse,
} from "@mui/material";
import {
  KeyboardArrowDown,
  KeyboardArrowUp,
  DeleteForever,
  Edit,
  Save,
} from "@mui/icons-material";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { SparkLineChart } from "@mui/x-charts";

import AnalogTabble from "./analogTable";
import styles from "./Table.module.scss";

const theme = createTheme({
  palette: {
    red: {
      main: "#e63946",
    },
  },
});

const Row = ({ row, deleteRow, comboChange, saveEdit }) => {
  const [open, setOpen] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [editedRow, setEditedRow] = React.useState(row);

  const [analogProd] = React.useState([
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
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate("/user/prodinfo", { state: { data: row } });
  };

  const handleOpenPanel = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSaveClick = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    saveEdit(editedRow);
  };

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow
          className={styles.anima}
          sx={{ "& > *": { borderBottom: "none" } }}
          onClick={handleRowClick}
        >
          <TableCell align="center">
            <Checkbox
              checked={row.check}
              onClick={(e) => comboChange(e, row.id)}
            ></Checkbox>
          </TableCell>
          <TableCell
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "start",
            }}
          >
            <Avatar alt="Avatar" src="" variant="square" sx={{ mr: 1 }} />

            {isEditing ? (
              <TextField
                name="name"
                value={editedRow.name}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.name
            )}
          </TableCell>
          <TableCell align="center">
            {isEditing ? (
              <TextField
                name="profit"
                value={editedRow.profit}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.profit
            )}
          </TableCell>
          <TableCell align="center">
            {isEditing ? (
              <TextField
                name="rating"
                value={editedRow.rating}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.rating
            )}
          </TableCell>
          <TableCell align="center">
            {isEditing ? (
              <TextField
                name="comments"
                value={editedRow.comments}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.comments
            )}
          </TableCell>
          <TableCell align="center">
            {isEditing ? (
              <TextField
                name="sells"
                value={editedRow.sells}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.sells
            )}
          </TableCell>
          <TableCell align="center">
            {isEditing ? (
              <TextField
                name="revenue"
                value={editedRow.revenue}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.revenue
            )}
          </TableCell>

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
              onClick={(e) => handleOpenPanel(e)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell>
          <TableCell align="center">
            {isEditing ? (
              <IconButton
                aria-label="save"
                size="small"
                onClick={handleSaveClick}
              >
                <Save />
              </IconButton>
            ) : (
              <IconButton
                aria-label="edit"
                size="small"
                onClick={handleEditClick}
              >
                <Edit />
              </IconButton>
            )}
          </TableCell>
          <TableCell align="center">
            <IconButton
              aria-label="delete"
              size="small"
              onClick={(e) => deleteRow(e, row.id)}
            >
              <DeleteForever color="red" />
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
    id: PropTypes.number.isRequired,
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
  saveEdit: PropTypes.func.isRequired,
};

export default Row;
