import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext/AuthContextProvider";
import { collection, deleteDoc, doc, query, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { subscribeToQuery } from "../services/firestoreService";

export function useResolvedErrors(projectId) {
  const [resolvedKeys, setResolvedKeys] = useState(new Set());
  const [resolvedDocs, setResolvedDocs] = useState({});
  const { user } = useAuthContext();

  useEffect(() => {
    if (!projectId) return;

    const q = query(collection(db, "resolvedErrors", projectId, "groups"));

    const unsubscribe = subscribeToQuery(q, (snapshot) => {
      const keys = new Set();
      const docs = {};

      snapshot.docs.forEach((d) => {
        keys.add(d.id);
        docs[d.id] = d.data();
      });

      setResolvedKeys(keys);
      setResolvedDocs(docs);
    });

    return unsubscribe;
  }, [projectId]);

  const resolveError = async (message, source) => {
    const key = btoa(`${message}__${source}`);
    try {
      await setDoc(doc(db, "resolvedErrors", projectId, "groups", key), {
        resolvedAt: new Date().toISOString(),
        resolvedBy: user.uid,
      });

      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const unresolveError = async (message, source) => {
    const key = btoa(`${message}__${source}`);
    try {
      await deleteDoc(doc(db, "resolvedErrors", projectId, "groups", key));
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return { resolvedKeys, resolvedDocs, resolveError, unresolveError };
}
