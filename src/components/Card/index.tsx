// @flow 
import * as React from 'react';
import { fatosData } from '../../App';

type Props = {
    index: number;
    fato: fatosData;
};
export const Card = (props: Props) => {
    const numeroFato = (i: number) => {
        if(i < 10)return '0' + i
        else return i; 
    }
    return (
        <li>
            <span>{numeroFato(props.index + 1)}</span>
            <p>{props.fato.fact}</p>
        </li>
    );
};
