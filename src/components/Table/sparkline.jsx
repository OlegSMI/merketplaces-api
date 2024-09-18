import { SparkLineChart } from "@mui/x-charts/SparkLineChart";

export function renderSparkline(params) {
  console.log(params);
  if (params.value == null) {
    return "";
  }

  return (
    <>
      {params}
      <SparkLineChart
        data={params.value}
        width={params.colDef.computedWidth}
        plotType="bar"
      />
    </>
  );
}
