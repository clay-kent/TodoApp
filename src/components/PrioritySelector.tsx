import React from "react";
import { UseFormRegister } from "react-hook-form";
import { Priority } from "../types";

interface PrioritySelectorProps {
    register: UseFormRegister<{ name: string; priority: keyof typeof Priority; deadline?: string | undefined }>;
    defaultPriority: keyof typeof Priority;
}

const toPriorityKey = (priority: Priority): keyof typeof Priority => Priority[priority] as keyof typeof Priority;

const PrioritySelector: React.FC<PrioritySelectorProps> = ({ register, defaultPriority }) => {
    return (
        <div className="flex gap-5">
            {[Priority.Low, Priority.Medium, Priority.High].map(toPriorityKey)
                .map(key => (
                    <label key={key}>
                        <input
                            type="radio"
                            value={key}
                            defaultChecked={defaultPriority === key}
                            {...register("priority")}
                        />
                        {key}
                    </label>
                ))}
        </div>
    );
};

export default PrioritySelector;