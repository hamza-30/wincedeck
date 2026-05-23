import React, { useEffect, useState } from "react";
import * as firestoreService from "../services/firestoreService";

export function useProject(projectId) {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!projectId) return;

    const fetchProject = async () => {
      try {
        const doc = await firestoreService.getDocument("projects", projectId);

        if (doc.exists()) {
          setProjectData({ id: doc.id, ...doc.data() });
        }

        return { success: true };
      } catch (err) {
        return { success: false, error: err.message };
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  return { projectData, loading };
}
