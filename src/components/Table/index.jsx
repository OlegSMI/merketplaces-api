// import * as React from "react";
import {
  randomColor,
  randomEmail,
  randomInt,
  randomName,
  randomArrayItem,
  random,
} from "@mui/x-data-grid-generator";
import {
  DataGrid,
  gridStringOrNumberComparator,
  GridToolbar,
} from "@mui/x-data-grid";
import { renderAvatar } from "./avatar";
import { renderEmail } from "./email";
import { renderEditRating, renderRating } from "./rating";
import {
  COUNTRY_ISO_OPTIONS,
  renderCountry,
  renderEditCountry,
} from "./country";
import { renderSparkline } from "./sparkline";
import { renderEditProgress, renderProgress } from "./progress";
import { renderEditStatus, renderStatus, STATUS_OPTIONS } from "./status";
import {
  INCOTERM_OPTIONS,
  renderEditIncoterm,
  renderIncoterm,
} from "./incoterm";

import { ButtonTable } from "./button";
import { deleteButton } from "./deleteButton";
import { editButton } from "./editButton";

import { useState } from "react";

const columns = [
  {
    field: "name",
    headerName: "Продавец",
    width: 120,
    editable: true,
  },
  {
    field: "avatar",
    headerName: "",
    display: "flex",
    renderCell: renderAvatar,
    valueGetter: (value, row) =>
      row.name == null || row.avatar == null
        ? null
        : { name: row.name, color: row.avatar },
    sortable: false,
    filterable: false,
  },
  {
    field: "email",
    headerName: "Почта",
    renderCell: renderEmail,
    width: 150,
    editable: true,
  },
  {
    field: "salary",
    headerName: "Прибыль за период",
    type: "number",
    width: 150,
    valueFormatter: (value) => {
      if (!value || typeof value !== "number") {
        return value;
      }
      return `$${value.toLocaleString()}`;
    },
    editable: true,
  },
  {
    field: "rating",
    headerName: "Рейтинг",
    display: "flex",
    renderCell: renderRating,
    renderEditCell: renderEditRating,
    width: 150,
    type: "number",
    editable: true,
    availableAggregationFunctions: ["avg", "min", "max", "size"],
  },
  {
    field: "comments",
    headerName: "Комментарии",
    type: "number",
    width: 150,
    valueFormatter: (value) => {
      if (!value || typeof value !== "number") {
        return value;
      }
      return `${value.toLocaleString()}`;
    },
    editable: true,
  },
  {
    field: "sales",
    headerName: "Продажи",
    type: "number",
    width: 150,
    valueFormatter: (value) => {
      if (!value || typeof value !== "number") {
        return value;
      }
      return `${value.toLocaleString()}`;
    },
    editable: true,
  },
  {
    field: "revenue",
    headerName: "Выручка",
    type: "number",
    width: 150,
    valueFormatter: (value) => {
      if (!value || typeof value !== "number") {
        return value;
      }
      return `${value.toLocaleString()}`;
    },
    editable: false,
    disableClickEventBubbling: true,
  },
  //   {
  //     field: "country",
  //     headerName: "Country",
  //     type: "singleSelect",
  //     valueOptions: COUNTRY_ISO_OPTIONS,
  //     valueFormatter: (value) => value?.label,
  //     renderCell: renderCountry,
  //     renderEditCell: renderEditCountry,
  //     sortComparator: (v1, v2, param1, param2) =>
  //       gridStringOrNumberComparator(v1.label, v2.label, param1, param2),
  //     width: 150,
  //     editable: true,
  //   },

  {
    field: "monthlyActivity",
    headerName: "Динамика продаж",
    type: "custom",
    resizable: false,
    filterable: false,
    sortable: false,
    editable: false,
    groupable: false,
    display: "flex",
    renderCell: renderSparkline,
    width: 150,
    valueGetter: (value, row) => row.monthlyActivity,
  },
  // {
  //   field: "button",
  //   headerName: "",
  //   type: "button",
  //   renderCell: ButtonTable,
  // },
  {
    field: "delete",
    headerName: "",
    type: "button",
    width: 50,
    renderCell: deleteButton,
    editable: false,
  },
  {
    field: "edit",
    headerName: "",
    type: "button",
    width: 50,
    renderCell: editButton,
    editable: false,
  },
  //   {
  //     field: "budget",
  //     headerName: "Budget left",
  //     renderCell: renderProgress,
  //     renderEditCell: renderEditProgress,
  //     availableAggregationFunctions: ["min", "max", "avg", "size"],
  //     type: "number",
  //     width: 120,
  //     editable: true,
  //   },
  //   {
  //     field: "status",
  //     headerName: "Status",
  //     renderCell: renderStatus,
  //     renderEditCell: renderEditStatus,
  //     type: "singleSelect",
  //     valueOptions: STATUS_OPTIONS,
  //     width: 150,
  //     editable: true,
  //   },
  //   {
  //     field: "incoTerm",
  //     headerName: "Incoterm",
  //     renderCell: renderIncoterm,
  //     renderEditCell: renderEditIncoterm,
  //     type: "singleSelect",
  //     valueOptions: INCOTERM_OPTIONS,
  //     editable: true,
  //   },
];

const rows = Array.from({ length: 100 }, (_, index) => ({
  id: index,
  name: randomName({}, {}),
  avatar: randomColor(),
  email: randomEmail(),
  rating: randomInt(1, 5),
  comments: randomInt(1, 1000),
  sales: randomInt(1, 10000),
  revenue: randomInt(1, 100000),
  //   country: randomArrayItem(COUNTRY_ISO_OPTIONS),
  salary: randomInt(35000, 80000),
  monthlyActivity: Array.from({ length: 30 }, () => randomInt(1, 25)),
  //   budget: random(0, 1).toPrecision(),
  //   status: randomArrayItem(STATUS_OPTIONS),
  //   incoTerm: randomArrayItem(INCOTERM_OPTIONS),
}));

export default function CustomColumnFullExample() {
  const [expandedRowId, setExpandedRowId] = useState(null);

  const handleRowClick = (params) => {
    setExpandedRowId(expandedRowId === params.id ? null : params.id);
  };

  return (
    <div style={{ height: 400, width: "99%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableRowSelectionOnClick
        // pagination
        onRowClick={handleRowClick}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      {expandedRowId !== null && (
        <div style={{ marginTop: 10 }}>
          <h3>Дополнительная информация:</h3>
          <p>Имя: {rows[expandedRowId].name}</p>
          <p>Почта: {rows[expandedRowId].email}</p>
          <p>
            Прибыль за период: ${rows[expandedRowId].salary.toLocaleString()}
          </p>
          {/* Вы можете добавить больше информации здесь */}
        </div>
      )}
    </div>
  );
}
