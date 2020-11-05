import React from 'react'
import numeral from "numeral";

import { Card, CardContent, Typography } from "@material-ui/core";
import CurrencyFormat from 'react-currency-format';
import './InfoBox.css';
function InfoBox({title,cases,isRed,active,total,onClick}) {
    return (
        <Card onClick = {onClick} className={`infoBox ${active && 'infoBox--selected'} ${isRed && 'infoBox--red'}`}>
            <CardContent>
                <Typography className='infoBox__title' color='textSecondary'>
                    {title}
                </Typography>
                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>{`${numeral(cases).format("+0.0a")}`}</h2>
                <Typography className='infoBox__total' color='textSecondary'>
                    <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} suffix=' Total'/>
                </Typography>
            </CardContent>
        </Card>
    )
}

export default InfoBox
