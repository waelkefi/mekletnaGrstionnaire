import React, { useState } from 'react';
import "./EnviClient.css";
import ModalAddEnvie from '../Modals/ModalAddEnvie';
import Select from 'react-select';

function EnvieClient({ envies, plats }) {
    const [openModalEnvie, setOpenModalEnvie] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [searchInput, setSearchInput] = useState('');

    const openModalEnvieClient = () => {
        setOpenModalEnvie(true);
    };

    const closeModalEnvieClient = () => {
        setOpenModalEnvie(false);
    };

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const customStyles = {
        control: (styles, { isFocused }) => ({
            ...styles,
            width: '300px',
            border: isFocused ? '1px solid #5E8214' : '1px solid #ccc',
            '&:hover': {
                borderColor: '#5E8214',
            },
            boxShadow: isFocused ? '0 0 0 1px #5E8214' : 'none',
        }),
        option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            backgroundColor: isSelected ? '#5E8214' : isFocused ? '#5e8214b8' : null,
            color: isSelected ? 'white' : 'black',
        }),
    };

    console.log('hh', envies, selectedOption)
    const filteredEnvies = selectedOption && selectedOption.plat !== 'Tous'
        ? envies.filter(e => e.plat === selectedOption.plat)
        : envies;

    // const allOptions = [, ...plats.map(plat => ({ "_id": plat, "plat": plat }))];
    const allOption = { plat: 'Tous' };
    const allOptions = [allOption, ...plats];
    return (
        <div className="enviClientContainer">
            {
                openModalEnvie &&
                <ModalAddEnvie isOpen={openModalEnvie} onClose={closeModalEnvieClient} />
            }
            <div className="enviClientHeader">
                <h2>
                    Envies Clients
                </h2>
                <div className="selectContainer">
                    {
                        <Select
                            value={selectedOption}
                            onChange={handleChange}
                            options={allOptions}
                            isSearchable
                            onInputChange={(inputValue) => setSearchInput(inputValue)}
                            placeholder="Sélectionnez un plat"
                            className='gestionContainerHeaderSelect'
                            styles={customStyles}
                            getOptionLabel={(option) => `${option.plat}`}
                            getOptionValue={(option) => option.plat}
                        />
                    }

                </div>
                <button onClick={() => openModalEnvieClient()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15.093" height="15.093" viewBox="0 0 15.093 15.093">
                        <path id="Tracé_64" data-name="Tracé 64" d="M16.093,10.053h-6.04v6.04H8.04v-6.04H2V8.04H8.04V2h2.014V8.04h6.04Z" transform="translate(-1.5 -1.5)" fill="#fff" stroke="#fff" strokeWidth="1" />
                    </svg>

                </button>
            </div>
            <div className="enviClientBody">
                {filteredEnvies?.map((e, index) => (
                    <div key={index} className="enviClientBodyColumn">
                        <p>{e.plat}</p>
                        <p>{e.client.firstName} {e.client.lastName}</p>
                        <p>{e.client.phone}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default EnvieClient