import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useGetUserInfo } from './useGetUserInfo';

export const useAddTask = () => {
  const todoCollectionRef = collection(db, 'todos');
  const { userId } = useGetUserInfo();

  const addTask = async ({ task, pending }) => {
    // console.log(userId, task, status);
    await addDoc(todoCollectionRef, {
      userId,
      task,
      pending,
      createdAt: serverTimestamp(),
    });
  };

  return { addTask };
};
