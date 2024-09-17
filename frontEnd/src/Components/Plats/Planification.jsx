import React, { useState } from 'react';
import { format, addDays } from 'date-fns';
import './Plats.css';
import PlatsPlaningCard from '../Cards/PlatsPlaningCard';
import fr from 'date-fns/locale/fr';
function Planification() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const days = Array.from({ length: 7 }, (_, index) => {
        const currentDate = addDays(selectedDate, index);
        return {
            id: index + 1,
            name: format(currentDate, 'EEEE', { locale: fr }),
            value: currentDate.toISOString().slice(0, 10),
        };
    });

    const handleDayClick = (date) => {
        setSelectedDate(new Date(date));
    };
    return (
        <div className="PlanificationContainer">
            <div className="PlanDaysContainer mb-3">
                {days.map((day) => (
                    <button
                        key={day.id}
                        className={`daysPlanBtn ${day.value === selectedDate.toISOString().slice(0, 10) ? 'active' : ''}`}
                        onClick={() => handleDayClick(day.value)}
                    >
                        {day.name}
                    </button>
                ))}
            </div>
            <div className="PlanPlatsContainer">
                <PlatsPlaningCard />
            </div>
        </div>
    );
}

export default Planification;
