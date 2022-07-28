import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { Card } from './components/Card';
import { Tabs, TabList, TabPanels, Tab, TabPanel, Container, Heading, Image } from '@chakra-ui/react'
import { Busca } from './components/Busca';

export type fatosData = {
    fact: string;
    length: number;
}

const App = () => {
    const [fatos, setFatos] = useState<fatosData[]>([]);
    const [fatosFiltrados1, setFatosFiltrados1] = useState<fatosData[]>([]);
    const [fatosFiltrados2, setFatosFiltrados2] = useState<fatosData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    // Função que renderiza os fatos filtrados
    const listagemFatos = (fatosFiltrados: fatosData[]) => {
        return(
            <ul>
                {fatosFiltrados?.map((fato, index) => {
                    return(<Card fato={fato} index={index} key={index}/>)}
                )}
            </ul>
        )
    };

    // Requisição dos fatos para a API publica
    useEffect(() => {
        // Visto que cada página retorna somente 10 fatos, são feitas 10 requisições em 10 paginas diferentes para receber 100 fatos no total
        const _fatos: fatosData[] = fatos;
        for(var x=1; x <= 10; x++){
            axios.get(`https://catfact.ninja/facts?page=${x}`)
                .then((res: any) => {
                    res.data.data.forEach((f: fatosData)=>{
                        !fatos.find((f2) => f2.fact == f.fact) && _fatos.push(f)}
                        )
                });
        }
        _fatos.length > 0 && setFatos(_fatos)
        setLoading(false);
    }, []);

    useEffect(()=>{
        fatos && setFatosFiltrados2(fatos);
    },[fatos])

    // Main return
    return (
        <main>
            <Container maxW='container.lg'>
                <header>
                    <Image src='https://cdn-icons-png.flaticon.com/512/1864/1864514.png' boxSize='140px'/>
                    <Heading className='Website-title'>Cat<br/>Facts</Heading>
                </header>
                <Heading className='Title'>Interesting facts about pet kittens</Heading>
                <Tabs isFitted variant='enclosed' className='content'>
                    <TabList className='tabs'>
                        <Tab>List 01</Tab>
                        <Tab>List 02</Tab>
                    </TabList>
                    {!loading && fatos && (
                    <TabPanels>
                        <TabPanel>
                            <Busca 
                                fatos={fatos}
                                fatosFiltrados={fatosFiltrados1 as fatosData[]}
                                handler={setFatosFiltrados1} 
                                tipo={1}
                            />
                            {listagemFatos(fatosFiltrados1 as fatosData[])}
                        </TabPanel>
                        <TabPanel>
                            <Busca 
                                fatos={fatos} 
                                fatosFiltrados={fatosFiltrados2 as fatosData[]}
                                handler={setFatosFiltrados2} 
                                tipo={2}
                            />
                            {listagemFatos(fatosFiltrados2 as fatosData[])}
                        </TabPanel>
                    </TabPanels>
                    )}
                </Tabs>
            </Container>
        </main>
    );
}

export default App;
