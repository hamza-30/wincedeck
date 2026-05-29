import React, { useEffect, useState } from "react";
import * as firestoreService from "../services/firestoreService";

export function useProject(projectId) {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nameChangeLoading, setNameChangeLoading] = useState(false);

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

  const updateProjectName = async (projectName) => {
    setNameChangeLoading(true);
    try {
      await firestoreService.updateDocument("projects", projectId, {
        name: projectName,
      });
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setNameChangeLoading(false);
    }
  };

  return { projectData, loading, updateProjectName, nameChangeLoading };
}
