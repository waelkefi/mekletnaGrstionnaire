import React, { useEffect, useState } from 'react';
import Layout from '../../Components/Layouts/Layout';
import SimpleHeader from '../../Components/Headers/Header';
import Gestion from '../../Components/Plats/Gestion';
import PlatsPlaningCard from '../../Components/Cards/PlatsPlaningCard';
import { format, addDays } from 'date-fns';
import fr from 'date-fns/locale/fr';
import './Plats.css';
import { fetchPlanificationsByDate } from '../../redux/actions/PlanificationAction';
import { useDispatch, useSelector } from 'react-redux';
import EventPlats from '../Menu/EventPlats';

function Plats() {
  const dispatch = useDispatch()
  const PlanPlats = useSelector(state => state.planification.planifications)
  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  const daysToMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  const [startDate, setStartDate] = useState(new Date(currentDate.setDate(currentDate.getDate() - daysToMonday)));
  const [endDate, setEndDate] = useState(new Date(currentDate));
  new Date(endDate.setDate(startDate.getDate() + 6));

  const [selectedDate, setSelectedDate] = useState(new Date());
  const days = Array.from({ length: 7 }, (_, index) => {
    const currentDate = addDays(startDate, index);
    return {
      id: index + 1,
      name: format(currentDate, 'EEEE', { locale: fr }),
      value: currentDate.toISOString().slice(0, 10),
    };
  });

  useEffect(() => {
    dispatch(fetchPlanificationsByDate(selectedDate.toISOString().slice(0, 10)))
      .then((result) => {
        if (result) {
          console.log('Planifications récupérées avec succès pour la date sélectionnée!');
        } else {
          console.log('Aucune planification disponible pour la date sélectionnée.');
        }
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des planifications pour la date sélectionnée:', error);
      });
  }, [selectedDate, dispatch]);


  const handleDayClick = (date) => {
    setSelectedDate(new Date(date));
  };

  const decrementDateRange = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // if (startDate > today) {
    //   const newStartDate = new Date(startDate);
    //   const daysToSubtract = (newStartDate.getDay() - 7) ; 
    //   console.log('daysto',daysToSubtract)
    //   // Nombre de jours à soustraire pour atteindre le lundi
    //   newStartDate.setDate(newStartDate.getDate() + daysToSubtract);

    //   setStartDate(newStartDate);

    //   setEndDate((prevEndDate) => {
    //     const newEndDate = new Date(prevEndDate);
    //     newEndDate.setDate(newEndDate.getDate() - 7);
    //     return newEndDate;
    //   });

    //   setSelectedDate(newStartDate);
    // }

    if (startDate > today) {
      setStartDate((prevStartDate) => {
        const newStartDate = new Date(prevStartDate);
        newStartDate.setDate(newStartDate.getDate() - 7);
        setSelectedDate(newStartDate);
        return newStartDate;
      });

      setEndDate((prevEndDate) => {
        const newEndDate = new Date(prevEndDate);
        newEndDate.setDate(newEndDate.getDate() - 7);
        return newEndDate;
      });
    }
  };

  const incrementDateRange = () => {
    let newStartDate = new Date(startDate);
    newStartDate.setDate(newStartDate.getDate() + 7);

    while (newStartDate.getDay() !== 1) {
      newStartDate.setDate(newStartDate.getDate() + 1);
    }

    setStartDate(newStartDate);

    setEndDate((prevEndDate) => {
      const newEndDate = new Date(prevEndDate);
      newEndDate.setDate(newEndDate.getDate() + 7);
      return newEndDate;
    });

    setSelectedDate(newStartDate);
  };
  const [activeCommande, setActiveCommande] = useState(false)
  return (
    <Layout>
      <SimpleHeader title={`Plats`} />
      <div className="container-Body-section">
        <div className='d-flex flex-row justify-content-between mt-4 mb-4' style={{ width: "400px", margin: "auto" }}>
          <button className={activeCommande ? "filter-btn-active " : "filter-btn"} onClick={() => setActiveCommande(true)}>Gestion Plats</button>
          <button className={!activeCommande ? "filter-btn-active " : "filter-btn"} onClick={() => setActiveCommande(false)}>Gestion Plats Events</button>
        </div>
        {activeCommande ?
          <div className="container-fluid mt-3">

            <div className='PlatPlanTitleContainer'>
              <h2 className='PlatPlanTitle'>Planification</h2>
              <button onClick={() => decrementDateRange()} disabled={startDate <= currentDate}><svg xmlns="http://www.w3.org/2000/svg" width="8.81" height="14.267" viewBox="0 0 8.81 14.267">
                <g id="Groupe_903" data-name="Groupe 903" transform="translate(-8.935 -7.946)">
                  <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M20.019,9l1.676,1.676L16.25,16.134l5.445,5.457-1.676,1.676-7.134-7.134Z" transform="translate(-3.95 -1.054)" fill="#343434" />
                </g>
              </svg>
              </button>
              <h2 className='PlatPlanTitle'>{startDate.toISOString().slice(0, 10)} - {endDate.toISOString().slice(0, 10)} </h2>
              <button onClick={() => incrementDateRange()}><svg xmlns="http://www.w3.org/2000/svg" width="8.81" height="14.267" viewBox="0 0 8.81 14.267">
                <path id="Icon_material-navigate-next" data-name="Icon material-navigate-next" d="M14.561,9l-1.676,1.676,5.445,5.457-5.445,5.457,1.676,1.676,7.134-7.134Z" transform="translate(-12.885 -9)" fill="#343434" />
              </svg>
              </button>
            </div>

            <div className="row mt-4">
              <div className="col-md-7">
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
                    {
                      PlanPlats.length > 0 && PlanPlats.map(
                        plat => (<PlatsPlaningCard key={plat._id} plat={plat} />)
                      )
                    }

                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <Gestion selectedDate={selectedDate} PlanPlats={PlanPlats} />
              </div>
            </div>
          </div> : <EventPlats />}
      </div>
    </Layout>
  );
}

export default Plats;