import React from 'react'
import "./Header.css"
import { useNavigate } from 'react-router-dom';
import logoMekletna from "../../images/logoi..png"
function SimpleHeader({ title, back }) {
    const navigate = useNavigate();

    return (
        <div className="header-gest-pages">
            <div className="header-gest-pages-left">
                <div className="text-and-back">


                    {/* <button onClick={() => navigate(-1)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.094" height="17.068" viewBox="0 0 18.094 17.068">
                            <path id="Icon_ionic-md-arrow-round-back" data-name="Icon ionic-md-arrow-round-back" d="M22.15,13.218h-11l4.268-4.082a1.7,1.7,0,0,0,0-2.324,1.52,1.52,0,0,0-2.221,0L6.088,13.7a1.566,1.566,0,0,0-.463,1.152v.021a1.566,1.566,0,0,0,.463,1.152l7.1,6.89a1.52,1.52,0,0,0,2.221,0,1.7,1.7,0,0,0,0-2.324l-4.268-4.082h11a1.61,1.61,0,0,0,1.573-1.645A1.593,1.593,0,0,0,22.15,13.218Z" transform="translate(-5.625 -6.33)" fill="#0f1637" />
                        </svg>
                    </button> */}
                    <h3>  {title} </h3>
                </div>
            </div>
            <div className="header-gest-pages-right">
                <img src={logoMekletna} alt={logoMekletna} />
                </div>
        </div>
    )
}

export default SimpleHeader