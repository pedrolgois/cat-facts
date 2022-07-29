import React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { Card } from './components/Card';
import userEvent from '@testing-library/user-event';

afterEach(() => {
    cleanup();
});

describe("Listagem de fatos", () =>{
    it('should render the header', () => {
        render(<App />);
        const linkElement = screen.getByText("Interesting facts about pet kittens");
        expect(linkElement).toBeInTheDocument();
    });

    it('should render card component', () => {
        const fato = {
            "fact": "Unlike dogs, cats do not have a sweet tooth. Scientists believe this is due to a mutation in a key taste receptor.",
            "length": 114
            }
        render(<Card index={1} fato={fato}/>)
        const factElement = screen.getByTestId('fato_1');
        expect(factElement).toBeInTheDocument();
        expect(factElement).toHaveTextContent(fato.fact);
    });

    it('should filter by the search button', async () => {
        render(<App/>);
        const filterInput = screen.getByTestId("factSize1")
        const filterButton = screen.getByTestId("buscar1")
        userEvent.type(filterInput, '114');
        userEvent.click(filterButton);
        await waitFor(async()=>{ 
            screen.findByText('Unlike dogs, cats do not have a sweet tooth. Scientists believe this is due to a mutation in a key taste receptor.').then((res)=>{
                expect(res).toBeInTheDocument();
            })
        })

        
    });
})

