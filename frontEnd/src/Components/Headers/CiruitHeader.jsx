import React from 'react'
import "./Header.css"
function CiruitHeader() {
    return (
        <div className="row mt-3 mb-3">
            <div className="col-md-3">
                <h4 className='livraison-section-title'>Nouveau Circuit</h4>
            </div>
            <div className="col-md-3">
                <h4 className='livraison-section-title'>Circuit Généré</h4>
            </div>
            <div className="col-md-6">
                <div className='skipBtnCont'>
                    <button className='skipProssBtn'><svg xmlns="http://www.w3.org/2000/svg" width="13.003" height="13" viewBox="0 0 13.003 13">
                        <path id="Icon_ionic-ios-close" data-name="Icon ionic-ios-close" d="M19.328,17.789l4.644-4.644a1.088,1.088,0,0,0-1.539-1.539L17.789,16.25l-4.644-4.644a1.088,1.088,0,1,0-1.539,1.539l4.644,4.644-4.644,4.644a1.088,1.088,0,1,0,1.539,1.539l4.644-4.644,4.644,4.644a1.088,1.088,0,1,0,1.539-1.539Z" transform="translate(-11.285 -11.289)" fill="#aa0102" />
                    </svg>
                      <span> Annuler La Process</span> </button>
                </div>

            </div>
        </div>
    )
}

export default CiruitHeader