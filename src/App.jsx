import React, { useState } from "react";
import "./styles.css";
import { InputTodo } from "./components/InputTodo";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { CompleteTodos } from "./components/CompleteTodos";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [inCompleteTodos, setInCompleteTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const [errMsg, setErrMsg] = useState("");

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    setErrMsg("");

    if (todoText === "") {
      alert("テキストに何か入力してください。");
    } else if (inCompleteTodos.length >= 5) {
      setErrMsg("5つ以上は登録できません。");
    } else {
      const newTodos = [...inCompleteTodos, todoText];
      setInCompleteTodos(newTodos);
      setTodoText("");
    }
  };

  const onClickFin = (index) => {
    const newTodos = [...inCompleteTodos];
    const newTodosComplete = [...completeTodos, newTodos[index]];

    setErrMsg("");
    newTodos.splice(index, 1);

    setInCompleteTodos(newTodos);
    setCompleteTodos(newTodosComplete);
  };

  const onClickDel = (index) => {
    //console.log(`${index}番目のボタンが押されたよ`);
    const newTodos = [...inCompleteTodos];

    setErrMsg("");
    newTodos.splice(index, 1);
    setInCompleteTodos(newTodos);
  };

  const onClickBack = (index) => {
    const newTodosComplete = [...completeTodos];
    const newTodos = [...inCompleteTodos, newTodosComplete[index]];

    setErrMsg("");
    newTodosComplete.splice(index, 1);

    setInCompleteTodos(newTodos);
    setCompleteTodos(newTodosComplete);
  };

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />

      {errMsg === "" || <p className="add-alert">{errMsg}</p>}

      <IncompleteTodos
        todos={inCompleteTodos}
        onClickFin={onClickFin}
        onClickDel={onClickDel}
      />

      <CompleteTodos todos={completeTodos} onClick={onClickBack} />
    </>
  );
};
