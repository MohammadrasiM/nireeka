import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export const DB_NAME = "comparator";
export const BIKES_OBJ_STORE_NAME = "bikes";

export class ComparatorService {
  constructor() {
    try {
      if (this.isAvailable()) {
        const dbReq = window.indexedDB.open(DB_NAME, 1);

        dbReq.onupgradeneeded = () => {
          const db = dbReq.result;

          db.createObjectStore(BIKES_OBJ_STORE_NAME, { keyPath: "db_id", autoIncrement: true });
        };

        dbReq.onsuccess = () => {
          const db = dbReq.result;

          if (!db?.objectStoreNames.contains(BIKES_OBJ_STORE_NAME))
            db?.createObjectStore(BIKES_OBJ_STORE_NAME, { keyPath: "db_id", autoIncrement: true });

          db.close();
        };

        dbReq.onerror = (event) => {
          console.log("Couldn't initialize database.", event, dbReq.error);
          toast.warn(
              "Couldn't initialize comparison database.",
              dbReq.error.message,
              "(" + dbReq.error.name + ")"
          );

          if (dbReq.result && typeof dbReq.result.close === "function") dbReq.result.close();
        };
      }
    } catch (e) {
      console.error(e)
    }
  }

  isAvailable() {
    return typeof window !== "undefined" && !!window.indexedDB !== "" ? true : false;
  }

  getBikes() {
    if (this.isAvailable()) {
      return new Promise((resolve, reject) => {
        const dbReq = window.indexedDB.open(DB_NAME, 1);

        dbReq.onsuccess = (event) => {
          const db = event.target.result;

          const txn = db.transaction(BIKES_OBJ_STORE_NAME, "readonly");
          const store = txn.objectStore(BIKES_OBJ_STORE_NAME);

          const allBikesQuery = store.getAll();

          allBikesQuery.onsuccess = (event) => {
            resolve(event.target.result);
          };

          allBikesQuery.onerror = (event) => {
            reject(event.target.result);
          };

          txn.oncomplete = () => {
            db.close();
          };
        };

        dbReq.onerror = (event) => {
          toast.error(event.target.result);

          reject(dbReq.error.message, "(" + dbReq.error.name + ")");

          if (dbReq.result && typeof dbReq.result.close === "function") dbReq.result.close();
        };
      });
    } else
      throw new Error(
        "IndexedDB is not supported by your browser. Therefore, Comparison feature is not available."
      );
  }

  addBike(bike) {
    if (this.isAvailable()) {
      return new Promise((resolve, reject) => {
        const dbReq = window.indexedDB.open(DB_NAME, 1);

        dbReq.onsuccess = () => {
          const db = dbReq.result;

          const txn = db.transaction(BIKES_OBJ_STORE_NAME, "readwrite");

          txn.onerror = () => {
            reject(txn.error.result);
          };

          txn.oncomplete = () => {
            db.close();
          };

          const store = txn.objectStore(BIKES_OBJ_STORE_NAME);
          const addReq = store.add(bike);

          addReq.onsuccess = (event) => {
            resolve(event.target.result);
          };
        };

        dbReq.onerror = () => {
          dbReq.result.close();

          reject(dbReq.error.message, "(" + dbReq.error.name + ")");

          if (dbReq.result && typeof dbReq.result.close === "function") dbReq.result.close();
        };
      });
    } else
      throw new Error(
        "IndexedDB is not supported by your browser. Therefore, Comparison feature is not available."
      );
  }

  removeBike(bikeId) {
    if (this.isAvailable()) {
      return new Promise((resolve, reject) => {
        const dbReq = window.indexedDB.open(DB_NAME);

        dbReq.onsuccess = () => {
          const db = dbReq.result;
          const txn = db.transaction(BIKES_OBJ_STORE_NAME, "readwrite");

          const store = txn.objectStore(BIKES_OBJ_STORE_NAME);

          const delQuery = store.delete(bikeId);

          delQuery.onsuccess = (event) => {
            resolve("Bike was removed successfully.");
          };

          delQuery.onerror = () => {
            reject(delQuery.error.result);
          };
        };

        dbReq.onerror = () => {
          dbReq.result.close();

          reject(dbReq.error.message, "(" + dbReq.error.name + ")");

          if (dbReq.result && typeof dbReq.result.close === "function") dbReq.result.close();
        };
      });
    } else {
      throw new Error("IndexedDB is not available.");
    }
  }

  destroy() {
    if (this.isAvailable) {
      const dbReq = window.indexedDB.deleteDatabase(DB_NAME);

      dbReq.onsuccess = (event) => {
        console.log("Database deleted successfully. Result:", event.result); // Result should be undefined
      };
    }
  }
}

// Hook that provides helpers for comparator tasks
export const useComparator = () => {
  const [comparator, setComparator] = useState(null);

  useEffect(() => {
    const newComparator = new ComparatorService();
    setComparator(newComparator);
  }, []);

  return { comparator };
};