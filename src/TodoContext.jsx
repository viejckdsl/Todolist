import React, { useReducer, createContext, useRef } from 'react';

const initialTodos = [
    { id: 1, text: '�ｺ�� ����', done: true },
    { id: 2, text: '������ ����', done: true },
    { id: 3, text: '���� ����', done: false },
    { id: 4, text: '��ȭ ����', done: false },
];
function todoReducer(state, action) {
    switch (action.type) {
        case 'CREATE':
            return [...state, action.todo];
        case 'TOGGLE':
            return state.map((todo) =>
                todo.id === action.id ? { ...todo, done: !todo.done } : todo
            );
        case 'REMOVE':
            return state.filter((todo) => todo.id !== action.id);
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();
export const TodoNextIdContext = createContext();
export function TodoProvider({ children }) {
    const [state, dispatch] = useReducer(todoReducer, initialTodos);
    const nextId = useRef(5);
    return (
        <TodoStateContext.Provider value={state}>
            <TodoDispatchContext.Provider value={dispatch}>
                <TodoNextIdContext.Provider value={nextId}>
                    {children}
                </TodoNextIdContext.Provider>
            </TodoDispatchContext.Provider>
        </TodoStateContext.Provider>
    );
}