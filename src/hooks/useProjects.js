import { useState } from "react";
import * as firestoreService from "../services/firestoreService";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";

export function useProjects() {
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  const createProject = async (projectName) => {
    let customId = `px_${1000 + Math.floor(Math.random() * 2000)}`;

    setLoading(true);
    try {
      await firestoreService.createDocument("projects", customId, {
        name: projectName,
        userId: user.uid,
        createdAt: new Date().toISOString(),
      });
      return { success: true, projectId: customId };
    } catch (err) {
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return { loading, createProject };
}
