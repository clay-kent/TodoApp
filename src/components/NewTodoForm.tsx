import { useState } from "react";
import { Todo, Priority } from "../types";
import { v4 as uuid } from "uuid";
import { faExclamationTriangle, faPlus } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import PrioritySelector from './PrioritySelector';
import DateSelector from './DateSelector';
import { twMerge } from "tailwind-merge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface NewTodoFormProps {
    addTodo: (newTodo: Todo) => void;
}

const NewTodoForm: React.FC<NewTodoFormProps> = ({ addTodo }) => {
    const [newTodoName, setNewTodoName] = useState<string>("");
    const [priority, setPriority] = useState<Priority>(Priority.Medium);
    const [deadline, setDeadline] = useState<Date | null>(null);
    const [newTodoNameError, setNewTodoNameError] = useState<boolean>(false);

    const updateNewTodoName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoName(e.target.value);
    };

    const addNewTodoButtonHandler = () => {
        if (newTodoName === "") {//バリデーション
            setNewTodoNameError(true);
            return;
        }
        setNewTodoNameError(false);
        addNewTodo();
        setNewTodoName("");
        setPriority(Priority.Medium);
        setDeadline(null);
    }

    const addNewTodo = () => {
        const newTodo: Todo = {
            id: uuid(),
            name: newTodoName,
            isDone: false,
            priority: priority,
            deadline: deadline || null,
        };
        addTodo(newTodo);
    };

    return (
        <div className="mt-4">
            <input
                id="newTodoName"
                type="text"
                value={newTodoName}
                onChange={updateNewTodoName}
                placeholder="タスク名"
                className={twMerge(
                    "w-full rounded-md border border-gray-300 px-2 py-1",
                    newTodoNameError && "border-red-500 outline-red-500"
                )}
            />
            {newTodoNameError && (
                <div className="mt-1 text-sm text-red-500">
                    <FontAwesomeIcon icon={faExclamationTriangle} className="mr-1" />
                    {newTodoNameError}
                </div>)}
            <div className="mt-2 flex items-center">
                <PrioritySelector selectedPriority={priority} setPriority={setPriority} />
                <DateSelector selectedDate={deadline} setDate={setDeadline} />
                <IconButton onClick={addNewTodoButtonHandler} icon={faPlus} />
            </div>
        </div>
    );
};

export default NewTodoForm;