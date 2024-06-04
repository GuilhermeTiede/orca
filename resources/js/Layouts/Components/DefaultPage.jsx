import React from 'react';
import Header from './Header';
import Aside from './Aside';
import "../../../css/style.css";
const DefaultPage = ({ children }) => {
    return (
        <div>
            <section className="main-page sec-cadastro">
                <div className="grid">
                <Aside />
            
                {children}
            
                </div>
            </section>
        </div>
    );
}

export default DefaultPage;
