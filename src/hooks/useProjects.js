import { useEffect, useState } from "react";
import * as firestoreService from "../services/firestoreService";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import { query, collection, where } from "firebase/firestore";
import { db } from "../config/firebase";

export function useProjects() {
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) return;

    let q = query(collection(db, "projects"), where("userId", "==", user.uid));
    setLoading(true);

    const unsubscribe = firestoreService.subscribeToQuery(q, (snapshot) => {
      setProjects(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return unsubscribe;
  }, []);

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

  return { loading, createProject, projects };
}
