// @flow 
import { Box, Button, Flex, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, useToast  } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fatosData } from '../../App';

type Props = {
    fatos: fatosData[];
    fatosFiltrados: fatosData[];
    handler: any;
    tipo: number;
};

type buscaProps = {
    factSize: number;
    factsNumber: number;
}

export const Busca = (props: Props) => {
    const toast = useToast();
	const [busca, setBusca] = useState<buscaProps>();

    // Handler que irá armazenar os valores dos inputs
    const handleSearch = (event: any) => {
        const { name, value } = event.target;
        setBusca((prevState: any) => ({ ...prevState, [name]: value }));
    };

    // Função que irá filtrar os fatos por tamanho e quantidade
    const filtrarFatos = (_fatos: fatosData[]) =>{
        const fatosFiltrados1: fatosData[] = [];
        const fatosFiltrados2: fatosData[] = [];

        if(_fatos && props.fatosFiltrados){
            console.log(props.fatosFiltrados != _fatos);
            if(props.fatosFiltrados != _fatos){
                props.fatosFiltrados.forEach((f)=>{
                    fatosFiltrados1.push(f);
                })
            }
        }

        if(props.tipo == 1){
            if(busca?.factSize != undefined && busca?.factSize > 0  ){
                const f = _fatos.find((f) => f.length == busca?.factSize && !fatosFiltrados1.find((f2) => f2.fact == f.fact));
                if(f){
                    fatosFiltrados1.unshift(f);
                    return fatosFiltrados1;
                }else{
                    toast({
                        title: 'Não existem mais fatos com esse tamanho, tente outro valor',
                        status: 'error',
                        isClosable: true
                    })
                    return fatosFiltrados1;
                }
            } else{
                toast({
                    title: 'Digite algum valor valido',
                    status: 'error',
                    isClosable: true
                })
                return fatosFiltrados1;
            }
        }else if(props.tipo == 2){
            if(busca?.factSize){
                _fatos.filter((f)=> f.length == busca?.factSize).forEach((fato)=>{
                    fatosFiltrados2.unshift(fato);
                })
                if(busca?.factsNumber != undefined && busca?.factsNumber > 0){
                    return fatosFiltrados2.slice(0, busca.factsNumber);
                }else{
                    return fatosFiltrados2;
                }
            }
            // Caso não tenha tamanho do fato mas tenha quantidade de fatos definida
            if(busca?.factsNumber){
                _fatos.forEach((fato)=>{fatosFiltrados2.push(fato)})
                return fatosFiltrados2.slice(0,busca.factsNumber)
            }
            // Caso não tenha nenhum dos 2
            return _fatos;
        }
        return [];
    }

    // Função que define os fatos filtradas no momento que a aplicação é carregada como todas os fatos possiveis
    useEffect(() => {
        props.handler(filtrarFatos(props.fatos))
    },[])
    
    // Main return
    return (
        <Flex className='busca'>
            <Box>
                <NumberInput>
                    <NumberInputField 
                        placeholder={'Fact size'} 
                        name='factSize' 
                        onChange={(e) => handleSearch(e)}
                    />
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
                </NumberInput>
            </Box>
            )}
            <Button onClick={()=>{props.handler(filtrarFatos(props.fatos))}}>Buscar</Button>
        </Flex>
    );
};