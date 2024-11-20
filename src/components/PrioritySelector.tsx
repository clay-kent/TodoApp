import { Priority } from "../types";

type Props = {
    selectedPriority: Priority;
    setPriority: (priority: Priority) => void;
}

const PrioritySelector: React.FC<Props> = ({ selectedPriority, setPriority }) => {
    return (
        <div className="flex gap-5">
            {[Priority.Low, Priority.Medium, Priority.High].map(key => (
                <label key={key}>{/*これ複数PrioritySelectorがあったら一意じゃなくないか?*/}
                    <input
                        id={'priority-' + key}//不要だが作法として
                        type="radio"//不要だが作法として
                        name="priority"
                        value={key}
                        //onChange={(e) => setPriority(e.target.value as unknown as Priority)}  //e.target.valueはstring型なので、Priority型に変換するためにas unknown as Priorityを使う
                        onChange={() => setPriority(key)}
                        checked={selectedPriority === key}
                    />
                    {key}
                </label>
            ))}
        </div>
    );
}
export default PrioritySelector;