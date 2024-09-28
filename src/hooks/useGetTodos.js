/* eslint-disable react-hooks/exhaustive-deps */
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { useGetUserInfo } from './useGetUserInfo';
// import { toast } from 'react-toastify';

export const useGetTodos = () => {
  const [todos, setTodos] = useState([]);
  const todosCollectionRef = collection(db, 'todos');
  const { userId } = useGetUserInfo();

  const getTodos = async () => {
    let unsubscribe;
    try {
      const queryTodos = query(
        todosCollectionRef,
        where('userId', '==', userId),
        orderBy('createdAt')
      );
      //   console.log(queryTodos);

      unsubscribe = onSnapshot(queryTodos, (snapshot) => {
        // console.log(snapshot);
        let docs = [];

        snapshot.forEach((doc) => {
          const data = doc.data();
          //   console.log(data);
          const id = doc.id;

          docs.push({ ...data, id });
        });

        setTodos(docs);
      });
    } catch (err) {
      //   toast.error(err);
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTodos();
  }, []);

  return { todos };
};
