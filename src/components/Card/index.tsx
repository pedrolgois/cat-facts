// @flow 
import * as React from 'react';
import { fatosData } from '../../App';

type Props = {
    index: number;
    fato: fatosData;
};

export const Card = (props: Props) => {
    // Função que formata o numero da listagem para colocar o "0" do 1-9
    const numeroFato = (i: number) => {
        if(i < 10)return '0' + i
        else return i; 
    }

    // Main return
    return (
        <li>
            <span>{numeroFato(props.index + 1)}</span>
            <p>{props.fato.fact}</p>
        </li>
    );
};
