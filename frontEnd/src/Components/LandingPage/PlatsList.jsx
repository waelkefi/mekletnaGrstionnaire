import React from 'react'
import SectionHeader from './SectionHeader'
import ClientPlatCard from '../Cards/ClientPlatCard'
import EmptyAnimation from '../animation/EmptyAnimation'

function PlatsList({ plats }) {
    return (
        <div className='container-fluid'>
            <SectionHeader />
            <div className="container mb-5">
                <div className="row">
                    {
                        plats.length > 0 ? plats.map((plat, index) => (
                            <div className="col-md-3 mb-3">
                                <ClientPlatCard key={index} plat={plat} />
                            </div>
                        )) :
                        <div className='d-flex justify-content-center align-items-center'> <EmptyAnimation text="Pas De Plats" /> </div>
                    }
                </div>

            </div>
        </div>
    )
}

export default PlatsList