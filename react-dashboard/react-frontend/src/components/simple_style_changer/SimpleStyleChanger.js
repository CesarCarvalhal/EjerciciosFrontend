import React from "react";
import { useState } from "react";
import './SimpleStyleChanger.css';


const SimpleStyleChanger = () => {
    const [style, setStyle] = useState(1);
    let Change = () => {
       switch (style) {
           case 1:
               var num = Math.random() < 0.5 ? 2:3
               setStyle(style => num);
               break;
           case 2:
                var num = Math.random() < 0.5 ? 1:3
                setStyle(style => num);
               break; 
           case 3:
                var num = Math.random() < 0.5 ? 1:2
                setStyle(style => num);
               break;
       }
   };
    
    return (
        
        <div>
            <p data-cy='issue5text' className={'weight'+ style}>Los arácnidos son parte del reino animal</p>
            <button data-cy='issue5button' onClick={Change}>Otro estilo</button>
        </div>
        
    );
    }

export default SimpleStyleChanger;