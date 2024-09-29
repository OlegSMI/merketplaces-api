import { TableBody } from "@mui/material";

const TableContent = () => {
  return (
    <TableBody
      sx={{
        "& > :nth-last-child(n)": {
          "& > *": { borderBottom: "none" },
        },
      }}
    >
      {sortedData.map((row) => (
        <Row key={row.id} row={row} />
      ))}
    </TableBody>
  );
};

export default TableContent;
