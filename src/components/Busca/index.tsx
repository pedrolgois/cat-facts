// @flow 
import { Box, Button, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fatosData } from '../../App';

type Props = {
    fatos: fatosData[];
    handler: any;
    tipo: number;
};

type buscaProps = {
    factSize: number;
    factsNumber: number;
}
export const Busca = (props: Props) => {
	const [busca, setBusca] = useState<buscaProps>();

    const handleSearch = (event: any) => {
        const { name, value } = event.target;
        setBusca((prevState: any) => ({ ...prevState, [name]: value }));
    };

    const filtrarFatos = (_fatos: fatosData[]) =>{
        const fatosFiltrados: any[] = [];
        // Caso tenha o tamanho do fato definido
        if(busca?.factSize){
            _fatos.filter((f)=> f.length == busca?.factSize).forEach((fato)=>{
                fatosFiltrados.push(fato);
            })
            // const ft = (_fatos.find((f)=> f.length == busca?.factSize));
            // ft && fatosFiltrados.push(ft);
            if(busca?.factsNumber != undefined && busca?.factsNumber > 0){
                return fatosFiltrados.slice(0, busca.factsNumber);
            }else{
                return fatosFiltrados;
            }
        }
        // Caso não tenha tamanho do fato mas tenha quantidade
        if(busca?.factsNumber){
            _fatos.forEach((fato)=>{fatosFiltrados.push(fato)})
            return fatosFiltrados.slice(0,busca.factsNumber)
        }
        // Caso não tenha nenhum dos 2
        return _fatos;
    }

    useEffect(() => {
        props.handler(filtrarFatos(props.fatos))
    },[props.fatos, props.tipo])
    

    return (
        <Flex className='busca'>
            <Box>
                <NumberInput max={255}>
                    <NumberInputField 
                        placeholder={'Fact size'} 
                        name='factSize' 
                        onChange={(e) => handleSearch(e)}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>
            {props.tipo == 2 && (
            <Box>
                <NumberInput max={255}>
                    <NumberInputField 
                        placeholder={'Number of facts'} 
                        name='factsNumber' 
                        onChange={(e) => handleSearch(e)}
                    />
                    <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                    </NumberInputStepper>
                </NumberInput>
            </Box>
            )}
            <Button onClick={()=>{props.handler(filtrarFatos(props.fatos))}}>Buscar</Button>
        </Flex>
    );
};