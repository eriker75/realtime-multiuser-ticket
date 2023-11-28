import { useCallback, useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  getDocs,
  Timestamp,
  setDoc,
} from "firebase/firestore";
import { useFirestore } from "./useFirestore";

export interface EntityModel {
  id: string;
  user_id: string;
  product_id: string;
  status: 'AVAILABLE' | 'SOLD';
  timestamp: Timestamp;
}

export function useEntities(table: string) {
  const [entities, setEntities] = useState<EntityModel[]>();
  const [entity, setEntity] = useState<EntityModel | null>(null);

  const db = useFirestore();

  const getEntities = useCallback(() => {
    return onSnapshot(collection(db, table), (snapshot) => {
      const dbEntities = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as EntityModel[];
      setEntities(dbEntities);
    });
  }, [db, table]);

  const getEntitiesOnce = useCallback(async () => {
    const snapshot = await getDocs(collection(db, table));
    const entitysData = snapshot.docs.map((doc) =>
      doc.data()
    ) as EntityModel[];
    setEntities(entitysData);
    window.localStorage.setItem(table, JSON.stringify(entitysData));
  }, [db, table]);

  useEffect(() => {
    const unsubscribe = getEntities();
    return unsubscribe;
  }, [getEntities]);

  const addEntity = useCallback(
    async (user_id: string) => {
      await addDoc(collection(db, table), {
        user_id,
        status: 'AVAILABLE',
        timestamp: Timestamp.now(),
      });
    },
    [db, table]
  );

  const createIfNotExists = useCallback(
    async (data: EntityModel) => {
      const ref = doc(db, table, data?.id);
      const docSnap = await getDoc(ref);

      if (!docSnap.exists()) {
        await setDoc(ref, data);
      }
      return data;
    },
    [db, table]
  );

  const toggleEntity = useCallback(
    async (id: string, status: string) => {
      const entityRef = doc(db, table, id);
      const entitySnap = await getDoc(entityRef);
      const entityData = entitySnap.data() as EntityModel;
      if (!entityData.timestamp) {
        entityData.timestamp = Timestamp.now();
      }
      const toggled = { ...entityData, status };
      await updateDoc(entityRef, toggled);
    },
    [db, table]
  );

  const getEntityById = useCallback(
    async (id: string) => {
      const entityRef = doc(db, table, id);
      const entitySnap = await getDoc(entityRef);

      if (entitySnap.exists()) {
        return entitySnap.data() as EntityModel;
      }

      return null;
    },
    [db, table]
  );

  const listenEntityById = useCallback(
    (id: string) => {
      const entityRef = doc(db, table, id);
      return onSnapshot(entityRef, (snapshot) => {
        if (snapshot.exists()) {
          setEntity(snapshot.data() as EntityModel);
        } else {
          setEntity(null);
        }
      });
    },
    [db,table]
  );

  const deleteEntity = useCallback(
    async (id: string) => {
      await deleteDoc(doc(db, table, id));
    },
    [db, table]
  );

  return {
    entity,
    entities,
    createIfNotExists,
    addEntity,
    getEntitiesOnce,
    toggleEntity,
    getEntityById,
    listenEntityById,
    deleteEntity,
  };
}
