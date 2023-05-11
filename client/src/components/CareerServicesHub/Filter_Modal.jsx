import React from 'react';
import ReactDOM from 'react-dom';

import './filter.css';

function Filter_Modal({ children, filterOpen, onClose }) {
  
    if(!filterOpen) return null;
  
    return ReactDOM.createPortal (
        <>
            <div className='filter-modal-overlay-container'>
                <div 
                    className='filt_overlay' 
                    onClick={onClose}
                />
                <div className='filt_modal'>
                    <button
                        id='closeBtn'
                        onClick={onClose}
                    >
                        X
                    </button>
                    {children}
                </div>
            </div>            
        </>,
        document.getElementById('portal')
    )
}

export default Filter_Modal;
