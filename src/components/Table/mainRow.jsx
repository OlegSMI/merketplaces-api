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
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  hideProductById,
  approvedProductById,
} from "@api/operator/useGoodsAPI";
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

const Row = ({ row }) => {
  const navigate = useNavigate();
  const [rowStatus, setRowStatus] = useState(row.status);

  const [open, setOpen] = React.useState(false);
  const [isEditing] = React.useState(false);
  const [editedRow, setEditedRow] = React.useState(row);

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
    setRowStatus("APPROVED");
    approvedProductById(itemId);
  };

  const hideHandler = (itemId) => {
    setRowStatus("DELETED");
    hideProductById(itemId);
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow
          className={`${styles.anima} ${styles[rowStatus.toLowerCase()]}`}
          sx={{
            "& > *": {
              borderBottom: "none",
            },
          }}
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
              <Avatar
                alt="Avatar"
                src={row.thumb}
                variant="square"
                sx={{ mr: 1 }}
              />

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
                  {row.revenue}
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
              row.revenue
            )}
          </TableCell>

          <TableCell align="center">
            <SparkLineChart
              data={[
                30, 50, 60, 70, 90, 120.15, 180, 160, 190, 150, 120, 100, 70,
                40,
              ]}
              plotType="bar"
              height={40}
              width={150}
              colors={["#4d4aea"]}
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
          <TableCell>
            <div
              style={{
                color:
                  rowStatus === "DELETED"
                    ? "red"
                    : rowStatus === "APPROVED"
                    ? "green"
                    : "black",
                backgroundColor: "#c4c4c4",
                borderRadius: "8px",
                padding: "5px 10px",
                textAlign: "center",
              }}
            >
              {rowStatus}
            </div>
          </TableCell>
          <TableCell align="center" sx={{ display: "flex" }}>
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
              <IconButton onClick={() => approveHandler(row.id)}>
                <CheckCircleIcon color="success" />
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
              <AnalogTabble product={row.id} />
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
    // check: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    thumb: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    comments: PropTypes.number.isRequired,
    sales: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
    // dynamic: PropTypes.array.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  // deleteRow: PropTypes.func.isRequired,
  // comboChange: PropTypes.func.isRequired,
  // saveEdit: PropTypes.func.isRequired,
};

export default Row;
