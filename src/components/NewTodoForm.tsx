import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Todo, Priority } from "../types";
import { v4 as uuid } from "uuid";
import { faExclamationTriangle, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { twMerge } from "tailwind-merge";
import PrioritySelector from "./PrioritySelector";

interface NewTodoFormProps {
    addTodo: (newTodo: Todo) => void;
}

const keys = Object.keys(Priority) as [keyof typeof Priority]
const toPriorityKey = (priority: Priority): keyof typeof Priority => Priority[priority] as keyof typeof Priority;
const schema = z.object({
    name: z.string().min(1, "名前は必須です"),//TODO: 入力フォームを赤く
    priority: z.enum(keys),
    deadline: z.string().optional().refine((val) => !val || !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
});

type FormValues = z.infer<typeof schema>;

const NewTodoForm: React.FC<NewTodoFormProps> = ({ addTodo }) => {
    const defaultValues = {
        name: "",
        priority: toPriorityKey(Priority.Medium),
        deadline: undefined,
    }

    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues
    })

    const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
        addTodo({
            id: uuid(),
            name: data.name,
            priority: Priority[data.priority],
            deadline: data.deadline ? new Date(data.deadline) : null,
            isDone: false
        });
        reset()
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("name", { required: true })} />
            <button type="submit" className={twMerge(`mr-2 rounded-md px-4 py-2 text-white`, 'bg-blue-500')}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
            {errors.name && <span><FontAwesomeIcon icon={faExclamationTriangle} />{errors.name.message}</span>}
            <div className="mt-2 flex items-center">
                <PrioritySelector register={register} defaultPriority={defaultValues.priority} />
                <input type="datetime-local"
                    {...register("deadline")}
                    id="deadline"
                    className="rounded-md border border-gray-400 px-2 py-0.5"
                />
            </div>
        </form>
    );
};

export default NewTodoForm;