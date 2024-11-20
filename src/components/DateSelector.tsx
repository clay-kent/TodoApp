import dayjs from 'dayjs';
import React from 'react';

interface Props {
    selectedDate: Date | null;
    setDate: (date: Date | null) => void;
}

const DateSelector: React.FC<Props> = ({ selectedDate, setDate }) => {
    const updateDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const dt = e.target.value;
        setDate(dt === "" ? null : new Date(dt));
    }

    return (
        <input
            type="datetime-local"
            id="deadline"
            //秒まで指定しないとSafariで意図した動作をしない可能性がある
            value={selectedDate ? dayjs(selectedDate).format('YYYY-MM-DDTHH:mm:ss') : ''}
            onChange={e => updateDate(e)}
        />
    );
}
export default DateSelector;