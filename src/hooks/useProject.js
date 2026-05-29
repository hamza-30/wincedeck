import React, { useEffect, useState } from "react";
import * as firestoreService from "../services/firestoreService";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

export function useProject(projectId) {
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nameChangeLoading, setNameChangeLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

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

  const deleteProject = async () => {
    setDeleteLoading(true);
    try {
      const logsRef = collection(db, "errors", projectId, "logs");
      const logsSnapshot = await getDocs(logsRef);

      await Promise.all(
        logsSnapshot.docs.map((document) =>
          deleteDoc(doc(db, "errors", projectId, "logs", document.id)),
        ),
      );

      await firestoreService.deleteDocument("errors", projectId);

      await firestoreService.deleteDocument("projects", projectId);

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setDeleteLoading(false);
    }
  };

  return {
    projectData,
    loading,
    updateProjectName,
    nameChangeLoading,
    deleteProject,
    deleteLoading,
  };
}
