import { useEffect, useState } from "react";
import * as firestoreService from "../services/firestoreService";
import { collection, query } from "firebase/firestore";
import { db } from "../config/firebase";
import {
  convertToUpdatedAgoTime,
  last24HoursFilter,
  todayErrorFilter,
} from "../utils/dateUtils";
import {
  getPagePath,
  getSource,
  getSeverity,
  getClockTime,
} from "../utils/errorUtils";

export function useErrors(projectId) {
  const [errorData, setErrorData] = useState([]);
  const [errorLoading, setErrorLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const logsRef = collection(db, "errors", projectId, "logs");
    const q = query(logsRef);
    setErrorLoading(true);

    const unsubscribe = firestoreService.subscribeToQuery(q, (snapshot) => {
      const errors = snapshot.docs.map((doc) => doc.data());
      setErrorData(errors);
      setErrorLoading(false);
    });

    return unsubscribe;
  }, [projectId]);

  const sortedErrorData = [...errorData].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
  );
  const totalErrors = sortedErrorData.length;
  const errorsToday = sortedErrorData.filter((errorObj) =>
    todayErrorFilter(errorObj.timestamp),
  ).length;
  const numberOfAffectedPages = new Set(
    sortedErrorData.map((errorObj) => errorObj.url),
  ).size;
  const lastErrorTime =
    sortedErrorData.length > 0
      ? convertToUpdatedAgoTime(sortedErrorData[0].timestamp)
      : "-";

  const twentyFourHoursData = sortedErrorData
    .filter((errorObj) => last24HoursFilter(errorObj.timestamp))
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const errorsFrequencyWithTime = {};

  for (const error of twentyFourHoursData) {
    let timestamp = error.timestamp.split("T");
    let hour = timestamp[1].split(":")[0];
    hour = `${hour} : 00`;

    errorsFrequencyWithTime[hour] = (errorsFrequencyWithTime[hour] || 0) + 1;
  }

  const barChartData = Object.entries(errorsFrequencyWithTime).map((error) => ({
    hour: error[0],
    errorFreq: error[1],
  }));

  const groupedErrors = Object.values(
    errorData.reduce((acc, err) => {
      const key = `${err.message}__${err.source}`;

      if (!acc[key]) {
        acc[key] = {
          message: err.message,
          source: getSource(err.stack),
          pageUrl: getPagePath(err.url),
          severity: getSeverity(err.message),
          stackTrace: err.stack,
          capturedAt: getClockTime(err.timestamp),
          timeAgo: convertToUpdatedAgoTime(err.timestamp),
          count: 0,
          lastSeen: err.timestamp,
        };
      }

      acc[key].count++;

      if (err.timestamp > acc[key].lastSeen) {
        acc[key].lastSeen = err.timestamp;
        acc[key].timeAgo = convertToUpdatedAgoTime(err.timestamp);
        acc[key].capturedAt = getClockTime(err.timestamp);
      }

      return acc;
    }, {}),
  ).sort((a, b) => new Date(b.lastSeen) - new Date(a.lastSeen));

  return {
    errorData,
    errorLoading,
    totalErrors,
    errorsToday,
    numberOfAffectedPages,
    lastErrorTime,
    twentyFourHoursData,
    barChartData,
    groupedErrors,
  };
}
