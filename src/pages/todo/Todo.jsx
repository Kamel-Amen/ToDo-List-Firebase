/* eslint-disable no-unused-vars */
// import React from 'react'
import './todo.css';
import Navbar from './Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useAddTask } from '../../hooks/useAddTask';
import { toast } from 'react-toastify';
import { useGetTodos } from '../../hooks/useGetTodos';

const Todo = () => {
  const { addTask } = useAddTask();

  const [task, setTask] = useState('');
  const [status, setStatus] = useState('');

  const { todos } = useGetTodos();

  const handleAddTask = async (e) => {
    e.preventDefault();
    await addTask({ task, status: 'pending' });

    toast.success('Added todo successfully !');
    setTask('');
    setStatus('pending');
  };

  return (
    <div className='todo d-flex justify-content-center align-items-center'>
      <Navbar />
      <section className='todo-section w-75 h-auto rounded-3 text-center py-5'>
        <h1 className='w-25 mx-auto todo-header'>Todo-List</h1>
        <form
          className='todo-form w-75 mx-auto pt-3 pb-5'
          onSubmit={handleAddTask}
        >
          <div className='input-group'>
            <input
              type='text'
              name='task'
              id='task'
              placeholder='Add new task...'
              className='w-75 p-2 border-0'
              onChange={(e) => setTask(e.target.value)}
              required
            />
            <button type='submit' className='w-25 btn btn-primary'>
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </form>
        <section className='todos'>
          <table className='table table-striped'>
            <thead>
              <tr>
                <th scope='col'>Index</th>
                <th scope='col'>Task</th>
                <th scope='col'>Completed</th>
                <th scope='col'>Delete</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => {
                const { task, status } = todo;

                return (
                  <tr key={task}>
                    <th scope='row'>0</th>
                    <td>{task}</td>
                    <td>{status}</td>
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
