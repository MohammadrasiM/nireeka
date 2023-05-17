import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { WEEK_DAYS } from "../../../app/constants/time";
import { UNITS } from "../../../app/constants/units";
import { convertMetricToImperial } from "../../../functions/convertors";
import { useSelector } from "react-redux";
import { cleanNumberForUI } from "../../../functions/numbers";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const modeNameMap = new Map([
  ["eco", "Eco"],
  ["comfort", "Comfort"],
  ["sport", "Sport"],
  ["manual", "Manual"],
  ["drive", "Drive"],
  ["hb", "Heart Beat"],
  ["gyro", "Gyro"],
  ["walk", "Walk"],
]);

const TripRecordChart = (props) => {
  const userUnitSystem = useSelector(state => state.auth.userData?.unit);

  const lastWeekOdo = props.lastWeekData
    ? props.lastWeekData.map((dayData) =>
        dayData
          ? userUnitSystem === 0
            ? cleanNumberForUI(dayData.records.distance.distance_drived)
            : cleanNumberForUI(
                convertMetricToImperial.km2mile(
                  dayData.records.distance.distance_drived
                )
              )
          : 0
      )
    : null;
  const thisWeekOdo = props.thisWeekData
    ? props.thisWeekData.map((dayData) =>
        dayData
          ? userUnitSystem === 0
            ? cleanNumberForUI(dayData.records.distance.distance_drived)
            : cleanNumberForUI(
                convertMetricToImperial.km2mile(
                  dayData.records.distance.distance_drived
                )
              )
          : 0
      )
    : null;

  const lastWeekChartDataset = {
    label: "Last week",
    data: lastWeekOdo,
    backgroundColor: ["rgba(169, 169, 169, 0.5)"],
    borderColor: ["rgba(169, 169, 169, 0.5)"],
    borderWidth: 1,
  };
  const thisWeekChartDataset = {
    label: "This week",
    data: thisWeekOdo,
    backgroundColor: ["rgba(67, 26, 202, 0.8)"],
    borderColor: ["rgba(67, 26, 202, 0.8)"],
    borderWidth: 1,
  };

  const chartData = {
    labels: WEEK_DAYS,
    datasets: [lastWeekChartDataset, thisWeekChartDataset],
  };

  return (
    <Bar
      style={{ minHeight: "400px" }}
      data={chartData}
      options={{
        plugins: {
          title: {
            display: true,
            text: `Trip records (${UNITS[userUnitSystem].distance})`,
            font: {
              size: 16,
              weight: 300,
            },
          },
          legend: {
            display: true,
            position: "top",
          },
          tooltip: {
            callbacks: {
              afterBody: function (item) {
                const index = item[0].dataIndex;
                const label = item[0].dataset.label;
                const afterBodyText = [];
                const partialDriveModeBodyText = [];
                const partialPasModeBodyText = [];
                let weekDistance;
                if (label === lastWeekChartDataset.label) {
                  // It's LAST week data
                  weekDistance = props.lastWeekData[index].records.distance;
                } else if (label === thisWeekChartDataset.label) {
                  // It's THIS week data
                  weekDistance = props.thisWeekData[index].records.distance;
                }

                let obj = weekDistance.partial_drive_mode;
                for (let property in obj) {
                  if (obj[property]) {
                    if (partialDriveModeBodyText.length === 0) {
                      partialDriveModeBodyText.push("", "Drive mode:");
                    }

                    const convertedValue =
                      userUnitSystem === 0
                        ? cleanNumberForUI(obj[property])
                        : cleanNumberForUI(
                            convertMetricToImperial.km2mile(obj[property])
                          );

                    partialDriveModeBodyText.push(
                      `${modeNameMap.get(property)}: ${convertedValue}`
                    );
                  }
                }
                obj = weekDistance.partial_pas_mode;
                for (let property in obj) {
                  if (obj[property]) {
                    if (partialPasModeBodyText.length === 0) {
                      partialPasModeBodyText.push("", "Pedal assist mode:");
                    }

                    const convertedValue =
                      userUnitSystem === 0
                        ? cleanNumberForUI(obj[property])
                        : cleanNumberForUI(
                            convertMetricToImperial.km2mile(obj[property])
                          );

                    partialPasModeBodyText.push(
                      `${modeNameMap.get(property)}: ${convertedValue}`
                    );
                  }
                }
                afterBodyText.push(
                  ...partialDriveModeBodyText,
                  ...partialPasModeBodyText
                );
                return afterBodyText;
              },
            },
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
};

export default TripRecordChart;
