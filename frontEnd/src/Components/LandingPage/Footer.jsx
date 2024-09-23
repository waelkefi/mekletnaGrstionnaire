import React from 'react'
import "./Landing.css"
import image from "../../images/Groupe 612.png"
function Footer() {
    return (
        <footer>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4">
                        <div>
                            <div className="footer-section">
                                <img className='footer-image' src={image} alt="mekletna" />
                            </div>
                        </div>

                    </div>
                    <div className="col-md-4">
                        <div className="footer-section">
                            <div>
                                <p className='footer-parag mb-3'> <b>Mekletna</b> vous propose une sélection de plats tunisiens authentiques. Savourez la richesse de la cuisine traditionnelle tunisienne, livrée directement chez vous.</p>

                            </div>

                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="footer-section">
                            <div>
                                <p className='footer-parag mb-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20.017" height="20.017" viewBox="0 0 20.017 20.017">
                                        <path id="Icon_awesome-phone-alt" data-name="Icon awesome-phone-alt" d="M19.446,14.145l-4.379-1.877a.938.938,0,0,0-1.095.27l-1.939,2.369A14.491,14.491,0,0,1,5.106,7.98L7.475,6.041a.936.936,0,0,0,.27-1.095L5.868.567A.945.945,0,0,0,4.793.024L.727.962A.938.938,0,0,0,0,1.877,18.139,18.139,0,0,0,18.141,20.018a.938.938,0,0,0,.915-.727l.938-4.066a.95.95,0,0,0-.548-1.079Z" transform="translate(0 0)" fill="#fff" />
                                    </svg>
                                    + 33 - 0751246189
                                </p>
                                <p className='footer-parag mb-3'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="30" viewBox="0 0 21 30">
                                        <path id="Icon_material-place" data-name="Icon material-place" d="M18,3A10.492,10.492,0,0,0,7.5,13.5C7.5,21.375,18,33,18,33S28.5,21.375,28.5,13.5A10.492,10.492,0,0,0,18,3Zm0,14.25a3.75,3.75,0,1,1,3.75-3.75A3.751,3.751,0,0,1,18,17.25Z" transform="translate(-7.5 -3)" fill="#fff" />
                                    </svg>
                                    Paris, France
                                </p>

                                <div className="social-m-footer">
                                    <p className='footer-parag'><b>Follow Us :</b>  </p>
                                    <a href="https://www.instagram.com/mekletna__tn/?fbclid=IwY2xjawFeJrVleHRuA2FlbQIxMAABHesefbi72YmxN0JbI-s2WqpPp4xa2vz3a1iAeEc2M4DXuE0cddSBbhR2NQ_aem_JSrh6e7rZlaLyLxpfFt2bw" target="_blank" rel="noopener noreferrer"> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
                                        <g id="instagram_1_" data-name="instagram(1)" transform="translate(0.245 0.227)">
                                            <path id="Shape" d="M22,32H10A10.011,10.011,0,0,1,0,22V10A10.011,10.011,0,0,1,10,0H22A10.011,10.011,0,0,1,32,10V22A10.012,10.012,0,0,1,22,32ZM10,3a7.007,7.007,0,0,0-7,7V22a7.008,7.008,0,0,0,7,7H22a7.009,7.009,0,0,0,7-7V10a7.008,7.008,0,0,0-7-7Z" transform="translate(-0.245 -0.227)" fill="#fff" />
                                            <path id="Shape-2" data-name="Shape" d="M8,16a8,8,0,1,1,8-8A8.009,8.009,0,0,1,8,16ZM8,3a5,5,0,1,0,5,5A5.006,5.006,0,0,0,8,3Z" transform="translate(7.755 7.773)" fill="#fff" />
                                            <circle id="Oval" cx="1.066" cy="1.066" r="1.066" transform="translate(23.403 6.067)" fill="#fff" />
                                        </g>
                                    </svg></a>
                                    <a href="https://www.facebook.com/Mekletna" target="_blank" rel="noopener noreferrer"><svg id="facebook" xmlns="http://www.w3.org/2000/svg" width="32.003" height="32.003" viewBox="0 0 32.003 32.003">
                                        <path id="Shape" d="M27.315,0H4.688A4.693,4.693,0,0,0,0,4.688V27.315A4.693,4.693,0,0,0,4.688,32h9.438V20.689h-3.75V15.064h3.75V11.251a5.632,5.632,0,0,1,5.625-5.625H25.44v5.625H19.752v3.813H25.44L24.5,20.689h-4.75V32h7.563A4.693,4.693,0,0,0,32,27.315V4.688A4.693,4.693,0,0,0,27.315,0Z" fill="#fff" />
                                    </svg></a>
                                    
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer