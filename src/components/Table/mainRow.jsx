import {
  DeleteForever,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import {
  Avatar,
  Collapse,
  IconButton,
  TableCell,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { SparkLineChart } from "@mui/x-charts";
import PropTypes from "prop-types";
import React from "react";
import { useNavigate } from "react-router-dom";

import useGoodsAPI from "@api/operator/useGoodsAPI";
import AnalogTabble from "./analogTable";
import styles from "./Table.module.scss";

const theme = createTheme({
  palette: {
    red: {
      main: "#e63946",
    },
  },
});

const Row = ({ row }) => {
  const navigate = useNavigate();
  const { hideProductById, approvedProductById } = useGoodsAPI();

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

  const handleRowClick = () => {
    navigate("/user/prodinfo", { state: { data: row } });
  };

  const handleOpenPanel = (e) => {
    e.stopPropagation();
    setOpen(!open);
  };

  // const handleEditClick = (e) => {
  //   e.stopPropagation();
  //   setIsEditing(true);
  // };

  // const handleSaveClick = (e) => {
  //   e.stopPropagation();
  //   setIsEditing(false);
  //   saveEdit(editedRow);
  // };

  const handleChange = (e) => {
    e.stopPropagation();
    const { name, value } = e.target;
    setEditedRow((prev) => ({ ...prev, [name]: value }));
  };

  const approveHandler = (itemId) => {
    row.status = "APPROVED";
    approvedProductById(itemId);
  };

  const hideHandler = (itemId) => {
    row.status = "DELETED";
    hideProductById(itemId);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow
          className={`${styles.anima} ${row.status.toLowerCase()}`}
          sx={{ "& > *": { borderBottom: "none" } }}
        >
          {/* <TableCell align="center">
            <Checkbox
              checked={row.check}
              onClick={(e) => comboChange(e, row.id)}
            ></Checkbox>
          </TableCell> */}
          <Tooltip title="Посмотреть товар" placement="left-start">
            <TableCell
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "start",
                cursor: "pointer",
              }}
              onClick={handleRowClick}
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
          </Tooltip>

          <TableCell
            align="center"
            // sx={{ display: "flex", justifyContent: "center" }}
          >
            {isEditing ? (
              <TextField
                name="profit"
                value={editedRow.revenue}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div
                  style={{
                    color: "#147129",
                    backgroundColor: "#EAFDEE",
                    padding: "4px 10px",
                    borderRadius: "20px",
                  }}
                >
                  {row.revenueAverage} р
                </div>
              </div>
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
                value={editedRow.sales}
                onChange={handleChange}
                onClick={(e) => e.stopPropagation()}
              />
            ) : (
              row.sales
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
              // row.revenue
              12345
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
          {/* <TableCell align="center">
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e) => handleOpenPanel(e)}
            >
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </IconButton>
          </TableCell> */}
          {/* <TableCell align="center">
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
          </TableCell> */}
          <TableCell>Подвтержден</TableCell>
          <TableCell align="center">
            <Tooltip title="Товары с 1688">
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={(e) => handleOpenPanel(e)}
              >
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </IconButton>
            </Tooltip>

            <Tooltip title="Подтвердить">
              <IconButton>
                <CheckCircleIcon
                  onClick={() => approveHandler(row.id)}
                  color="success"
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Не отображать">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => hideHandler(row.id)}
              >
                <DeleteForever color="red" />
              </IconButton>
            </Tooltip>
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
    rating: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired,
    revenueAverage: PropTypes.number.isRequired,
    dynamic: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  deleteRow: PropTypes.func.isRequired,
  comboChange: PropTypes.func.isRequired,
  saveEdit: PropTypes.func.isRequired,
};

export default Row;
