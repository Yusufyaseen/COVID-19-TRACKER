import React from 'react';
import './Table.css';
import CurrencyFormat from 'react-currency-format';
function Table({countries}) {
    return (
        <div className='table'>
            {
                countries.map(({country,cases} ) => (
                    <tr key={Math.random()}>
                        <td>{country}</td>
                        <td><strong><CurrencyFormat value={cases} displayType={'text'} thousandSeparator={true} /></strong> </td>
                        
                    </tr>
                ))
            }            
        </div>
    )
}

export default Table
