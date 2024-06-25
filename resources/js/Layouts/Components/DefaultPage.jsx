import React from 'react';
import Aside from './Aside';
import "../../../css/style.css";
import {Grid} from "@mui/material";

const DefaultPage = ({children, actions = [], actionsProps}) => {
    return (
        <div>
            <section className="main-page sec-cadastro">
                <div className="grid">
                    <Aside/>

                    {children}

                </div>
            </section>
            <Grid item md={6} xs={12} container spacing={2} {...actionsProps}>
                {actions.length > 0 && actions.map((action, index) => (
                    <Grid item key={index}>{action}</Grid>
                ))}
            </Grid>
        </div>
    );
}

export default DefaultPage;
