import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'

const NotFound = () => {
    return (
        <div data-cy='pageBody'>
        <h1 data-cy='pageHeader'>Uh!</h1>
        <p data-cy='simpleMessage'>Parece que estás perdido</p>
        <Link className='homeLink' data-cy='homeLink' to='/'>Página principal</Link>
        <img className='img-monkey-face' src='/images/monkey-face.png'></img>
        </div>
    );
    }

export default NotFound;
