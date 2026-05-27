import { useEffect, useState } from "react";
import * as firestoreService from "../services/firestoreService";
import { collection, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { convertToUpdatedAgoTime, todayErrorFilter } from "../utils/dateUtils";

export function useProjectStats(projectId) {
  const [errorsToday, setErrorsToday] = useState(0);
  const [lastErrorTime, setLastErrorTime] = useState("-");
  const [errorStatsLoading, setErrorStatsLoading] = useState(false);

  useEffect(() => {
    if (!projectId) return;

    const logsRef = collection(db, "errors", projectId, "logs");
    const q = query(logsRef);
    setErrorStatsLoading(true);

    const unsubscribe = firestoreService.subscribeToQuery(q, (snapshot) => {
      const errors = snapshot.docs.map((doc) => doc.data());

      const today = errors.filter((err) => todayErrorFilter(err.timestamp));
      setErrorsToday(today.length);

      const sorted = [...errors].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
      );

      setLastErrorTime(
        sorted.length > 0 ? convertToUpdatedAgoTime(sorted[0].timestamp) : "-",
      );

      setErrorStatsLoading(false);
    });

    return unsubscribe;
  }, [projectId]);

  return { errorsToday, lastErrorTime, errorStatsLoading };
}
