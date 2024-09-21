import React from "react";
import { TableRow, TableCell, Rating, Stack, Avatar } from "@mui/material";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import styles from "./Table.module.scss";

const AnalogRow = ({ item }) => {
  const navigate = useNavigate();
  const statusClasses = {
    0: styles.status0,
    1: styles.status1,
    2: styles.status2,
  };

  const handleClickRow = () => {
    navigate("/user/prodinfo", { state: { data: item } });
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{ "& > *": { borderBottom: "none" } }}
        onClick={() => handleClickRow()}
      >
        <TableCell
          sx={{
            display: "flex",
            // flexDirection: "row",
            alignItems: "center",
            justifyContent: "start",
          }}
        >
          {/* <Stack
            alignItems="center"
            sx={{ display: "flex", flexDirection: "row" }}
          > */}
          <Avatar alt="Remy Sharp" src="" variant="square" sx={{ mr: 1 }} />
          {/* </Stack> */}
          {item.name}
        </TableCell>
        <TableCell align="center">{item.price}</TableCell>
        <TableCell align="center">
          <span
            className={`${styles.status} ${statusClasses[item.status.code]}`}
          >
            {item.status.text}
          </span>
        </TableCell>
        <TableCell align="center">{item.count}</TableCell>
        <TableCell align="center">
          <Stack alignItems="center">
            <Rating
              name="half-rating-read"
              defaultValue={item.rating}
              precision={0.5}
              readOnly
            />
          </Stack>
        </TableCell>
        <TableCell align="center">{item.market}</TableCell>
        <TableCell align="center">{item.sales}</TableCell>
        <TableCell align="center">{item.revenue}</TableCell>
      </TableRow>
    </React.Fragment>
  );
};

AnalogRow.propTypes = {
  item: PropTypes.shape({
    avatar: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    market: PropTypes.string.isRequired,
    sales: PropTypes.number.isRequired,
    revenue: PropTypes.number.isRequired,
  }).isRequired,
};

export default AnalogRow;
