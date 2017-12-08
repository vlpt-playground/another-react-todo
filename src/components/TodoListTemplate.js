import React from 'react';
import './TodoListTemplate.css';

const TodoListTemplate = ({form, palette, children}) => {
  return (
    <main className="todo-list-template">
      <div className="title">
        오늘 할 일
      </div>
      <section className="palette-wrapper">
        {palette}
      </section>
      <section className="form-wrapper">
        {form}
      </section>
      <section className="todos-wrapper">
        { children }
      </section>
    </main>
  );
};

export default TodoListTemplate;