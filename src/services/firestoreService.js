import { db } from "../config/firebase";
import {
  doc,
  collection,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";

const getCol = (name) => collection(db, name);

export const getDocument = (col, id) => getDoc(doc(db, col, id));
export const getAllDocuments = (col) => getDocs(getCol(col));
export const createDocument = (col, id, data) => setDoc(doc(db, col, id), data);
export const updateDocument = (col, id, data) =>
  updateDoc(doc(db, col, id), data);
export const deleteDocument = (col, id) => deleteDoc(doc(db, col, id));
export const queryDocuments = (col, field, operator, value) =>
  getDocs(query(getCol(col), where(field, operator, value)));
export const subscribeToCollection = (col, callback) =>
  onSnapshot(getCol(col), callback);
