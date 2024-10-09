import React, { useCallback, useState } from "react";

import PropTypes from "prop-types";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { Avatar, Collapse, TableCell, TableRow, Tooltip } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useSnackbar } from "notistack";

import { setWeightProduct } from "@api/operator/useCollectGoodsAPI";
import AnalogTable from "./AnalogTable";
import saveIcon from "@assets/collecting/save.png";
import styles from "./Table.module.scss";

const theme = createTheme({
  palette: {
    red: {
      main: "#e63946",
    },
  },
});

const TableRowItem = ({ item, sessionId }) => {
  const [open, setOpen] = useState(false);
  const [weightOpen, setWeightOpen] = useState(false);
  const [weightChange, setWeightChange] = useState();
  const [analogTableWeight, setAnalogTableWeight] = useState();

  const { enqueueSnackbar } = useSnackbar();

  const handleOpenPanel = useCallback(
    (e) => {
      e.stopPropagation();
      setOpen(!open);
    },
    [open]
  );

  const openWeight = (e) => {
    e.stopPropagation();
    setWeightOpen(true);
  };

  const changeWeight = async (e) => {
    e.stopPropagation();
    setWeightOpen(false);

    if (weightChange !== null) {
      setAnalogTableWeight(weightChange);
      const response = await setWeightProduct(sessionId, item.id, weightChange);

      if (response.message !== "Success") {
        enqueueSnackbar("Ошибка изменения веса!", {
          variant: "error",
          anchorOrigin: { vertical: "top", horizontal: "right" },
        });
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <TableRow className={`${styles.anima}`}>
          <TableCell align="center">{item.id}</TableCell>
          <TableCell>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "start",
                cursor: "pointer",
              }}
            >
              <Avatar
                alt="Avatar"
                src={item.photoPath}
                variant="square"
                sx={{ mr: 1 }}
                className={styles.avatar}
              />
              {item.name}
            </div>
          </TableCell>
          <TableCell align="center">
            <a href={item.productUrl} target="_blank">
              {item.productUrl}
            </a>
          </TableCell>
          <TableCell align="center">
            {weightOpen ? (
              <div className={styles.weightContainer}>
                <input
                  type="number"
                  value={weightChange}
                  onChange={(e) => setWeightChange(e.target.value)}
                />
                <Tooltip title="Сохранить вес">
                  <button
                    className={styles.saveWeightIcon}
                    onClick={changeWeight}
                  >
                    <img src={saveIcon} alt="saveWeight" />
                  </button>
                </Tooltip>
              </div>
            ) : (
              <button
                className={styles.expandButton}
                onClick={(e) => openWeight(e)}
              >
                Изменить вес
              </button>
            )}
          </TableCell>
          <TableCell align="center" sx={{ width: "max-content" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <button
                className={styles.expandButton}
                onClick={(e) => handleOpenPanel(e)}
              >
                Товары с 1688
                {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              </button>
            </div>
          </TableCell>
        </TableRow>
        <TableRow sx={{ "& > *": { borderBottom: "none" } }}>
          <TableCell
            style={{
              paddingBottom: 0,
              paddingTop: 0,
              padding: 0,
              border: "none",
            }}
            colSpan={7}
          >
            <Collapse in={open} timeout="auto" unmountOnExit>
              <AnalogTable itemId={item.id} weight={analogTableWeight} />
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    </ThemeProvider>
  );
};

TableRowItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    photoPath: PropTypes.string.isRequired,
    productUrl: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
  sessionId: PropTypes.string.isRequired,
};

export default TableRowItem;
