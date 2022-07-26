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
    const [fatos, setFatos] = useState<fatosData[]>();
    const [fatosFiltrados, setFatosFiltrados] = useState<fatosData[]>();

    const listagemFatos = () =>{
        return(
            <ul>
                {fatosFiltrados?.map((fato, index) => {
                    return(<Card fato={fato} index={index} key={index}/>)}
                )}
            </ul>
        )
    };

    useEffect(()=>{
        const _fatos:fatosData[] = [];
        for(var x=1; x <= 10; x++){
            axios.get(`https://catfact.ninja/facts?page=${x}`)
                .then((res: any) => {
                    const _nFatos:fatosData[] = res.data.data;
                    _nFatos.forEach((f)=>{_fatos?.push(f);})
                    fatos?.forEach((f)=>{_fatos.push(f);})
                    setFatos(_fatos);
                });
        }
    }, []);

    
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
                <TabPanels>
                    <TabPanel>
                        <Busca fatos={fatos as fatosData[]} handler={setFatosFiltrados} tipo={1}/>
                        {listagemFatos()}
                    </TabPanel>
                    <TabPanel>
                        <Busca fatos={fatos as fatosData[]} handler={setFatosFiltrados} tipo={2}/>
                        {listagemFatos()}
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Container>
    </main>
  );
}

export default App;
