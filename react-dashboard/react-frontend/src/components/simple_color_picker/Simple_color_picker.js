import React from "react";


const SimpleColorPicker = () => {
    return (
    <div>

        <div className="issue4color" data-cy='issue4color' style={{width: '120px', height: '131px'}}></div>
        <button className="firstButton" data-cy='firstButton' onClick={() => {document.querySelector('.issue4color').style.backgroundColor = 'rgb(224, 0, 0)'}}>Primer color</button>
        <button className="secondButton" data-cy='secondButton' onClick={() => {document.querySelector('.issue4color').style.backgroundColor = 'rgb(0, 225, 0)'}}>Segundo color</button>
        <button className="thirdButton" data-cy='thirdButton' onClick={() => {document.querySelector('.issue4color').style.backgroundColor = 'rgb(0, 0, 163)'}}>Tercer color</button>
        
     </div>
        );
    }

export default SimpleColorPicker;