import React, { useCallback, useEffect, useState } from "react";

import check from "@assets/table/check.svg";
import deleteIcon from "@assets/table/delete.svg";

import {
  approveAlibabaProduct,
  rejectAlibabaProduct,
} from "@api/operator/useCollectGoodsAPI";
import { IconButton, TableCell, TableRow, Tooltip } from "@mui/material";
import { Avatar } from "antd";
import PropTypes from "prop-types";
import styles from "./Table.module.scss";

const AnalogRow = ({ item }) => {
  const [rowStatus, setRowStatus] = useState("CREATED");

  const status = {
    CREATED: "Создан",
    APPROVED: "Подтвержден",
    REJECTED: "Удален",
  };

  useEffect(() => {
    setRowStatus(item.status);
  }, []);

  const approveHandler = useCallback((itemId) => {
    setRowStatus("APPROVED");
    approveAlibabaProduct(itemId);
  }, []);

  const hideHandler = useCallback((itemId) => {
    setRowStatus("REJECTED");
    rejectAlibabaProduct(itemId);
  }, []);

  return (
    <React.Fragment>
      <TableRow>
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
              src={item.img}
              variant="square"
              sx={{ mr: 1 }}
              className={styles.avatar}
            />
            {item.title}
          </div>
        </TableCell>
        <TableCell align="center">{item.price}</TableCell>
        <TableCell align="center">{item.weight}</TableCell>
        <TableCell align="center">
          <a href={item.productUrl} target="_blank">
            {item.productUrl}
          </a>
        </TableCell>
        <TableCell className={styles.statusCell}>
          <div
            className={`${styles.statusWrapper} ${
              styles[rowStatus.toLowerCase()]
            }`}
          >
            {status[rowStatus]}
          </div>
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
            <Tooltip title="Подтвердить">
              <IconButton onClick={() => approveHandler(item.id)}>
                <img src={check} width={20} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Не отображать">
              <IconButton
                aria-label="delete"
                size="small"
                onClick={() => hideHandler(item.id)}
              >
                <img src={deleteIcon} width={20} />
              </IconButton>
            </Tooltip>
          </div>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

AnalogRow.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    productUrl: PropTypes.string.isRequired,
    weight: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default AnalogRow;
