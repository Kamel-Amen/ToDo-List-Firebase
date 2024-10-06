/* eslint-disable no-unused-vars */
// import React from 'react'
import './todo.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faListCheck, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import { useAddTask } from '../../hooks/useAddTask';
import { toast } from 'react-toastify';
import { useGetTodos } from '../../hooks/useGetTodos';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import verified from '../../assets/verified.gif';

const Todo = () => {
  const { addTask } = useAddTask();

  const [task, setTask] = useState('');
  const [pending, setPending] = useState(true);
  const [updatedTodo, setUpdatedTodo] = useState('');

  const { todos } = useGetTodos();
  const inputRef = useRef();

  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      for (let i = 0; i < todos.length; i++) {
        if (task === todos[i].task) {
          toast.error('Todo already there! Try different todo...');
          return;
        }
      }

      await addTask({ task, pending: true });
      toast.success('Added todo successfully !');

      setTask('');
      inputRef.current?.focus();
      // window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateTodo = async (taskId) => {
    const taskDoc = doc(db, 'todos', taskId);
    try {
      await updateDoc(taskDoc, { task: updatedTodo });
    } catch (err) {
      toast.error('Something wend wrong!');
      console.error(err);
    }
    // console.log('Updated !');
  };

  const handleDone = async (taskId) => {
    const taskDoc = doc(db, 'todos', taskId);
    try {
      await deleteDoc(taskDoc);
      toast.success('Todo completed successfully !');
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <div className='todo d-flex justify-content-center'>
      <Navbar />
      <section className='todo-section w-75 rounded-3 text-center py-5'>
        <h1 className='mx-auto todo-header border-0'>
          Todos{' '}
          <FontAwesomeIcon icon={faListCheck} className='ms-1 text-primary' />
        </h1>
        <form
          className='todo-form w-75 mx-auto pt-3 pb-5'
          onSubmit={handleAddTask}
        >
          <div className='input-group'>
            <input
              type='text'
              name='task'
              id='task'
              placeholder='Add new todo, maximum 50 letter for todo...'
              className='w-75 p-2 border-0'
              onChange={(e) => setTask(e.target.value)}
              ref={inputRef}
              maxLength='50'
              required
            />
            <button type='submit' className='w-25 btn btn-primary addTodo-icon'>
              <FontAwesomeIcon icon={faPlus} className='icon' />
            </button>
          </div>
        </form>
        <section className='todos scrollable'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Index</th>
                <th scope='col'>Task</th>
                <th scope='col'>Update</th>
                <th scope='col'>Done</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => {
                // console.log(new Date(todo.createdAt.seconds * 1000));
                const { task, id } = todo;

                return (
                  <tr key={id}>
                    <th scope='row'>{todos.indexOf(todo) + 1}</th>
                    <td>{task}</td>
                    <td>
                      <button
                        type='button'
                        className='btn cursor-pointer'
                        data-bs-toggle='modal'
                        data-bs-target={'#' + id}
                      >
                        <FontAwesomeIcon
                          icon={faEdit}
                          className='text-primary'
                        />
                      </button>

                      <div
                        className='modal fade'
                        id={id}
                        tabIndex='-1'
                        aria-labelledby={id + 'Label'}
                        aria-hidden='true'
                      >
                        <div className='modal-dialog'>
                          <div className='modal-content'>
                            <div className='modal-header'>
                              <h1
                                className='modal-title fs-5'
                                id={id + 'Label'}
                              >
                                Update Todo Window !
                              </h1>
                              <button
                                type='button'
                                className='btn-close'
                                data-bs-dismiss='modal'
                                aria-label='Close'
                              ></button>
                            </div>
                            <div className='modal-body'>
                              <input
                                type='text'
                                maxLength={50}
                                placeholder={task}
                                className='w-100 rounded-3 border border-secondary p-2'
                                onChange={(e) => setUpdatedTodo(e.target.value)}
                              />
                            </div>
                            <div className='modal-footer'>
                              <button
                                type='button'
                                className='btn btn-danger'
                                data-bs-dismiss='modal'
                              >
                                Close
                              </button>
                              <button
                                type='button'
                                className='btn btn-primary'
                                onClick={() => handleUpdateTodo(id)}
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <img
                        src={verified}
                        alt='verified'
                        width={25}
                        height={25}
                        className='rounded-circle cursor-pointer'
                        onClick={() => handleDone(id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </section>
    </div>
  );
};

export default Todo;
