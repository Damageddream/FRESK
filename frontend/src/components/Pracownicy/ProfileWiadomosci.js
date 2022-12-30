import { useState, useEffect } from "react";
import Accordion from 'react-bootstrap/Accordion';
import axios from "axios";
import AccordionItem from "react-bootstrap/esm/AccordionItem";
import AccordionHeader from "react-bootstrap/esm/AccordionHeader";

const ProfilWiadomosci = () => {

    // states for storing files to download and loading state and errors
    const [file, setFile] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState();

    // when render use function to get messeges
    useEffect(() => {
        getWiadomosci();
    }, []);

    // function fetching messages from backend
    const getWiadomosci = () => {
        setIsLoading(true);
        axios({
            method: 'GET',
            url: "/api/contact/",
        })
            .then((response) => {
                const data = response.data;
                setFile(data);
                setIsLoading(false);
                file.map(wiadomosc => {
                    console.log(wiadomosc.name)
                })
                console.log(file.length > 0)
                console.log(!errors)
            })
            .catch((error) => {
                setErrors(error);
            });
    }
    return (
        <>
            {isLoading && <p>Trwa pobieranie wiadomości</p>}

            {!isLoading && file.length === 0 && !errors && (
                <p>Brak Wiadomości</p>
            )}
            {!errors && file.length > 0 &&
                <Accordion>
                    {file.map((wiadomosc) => (
                        <AccordionItem className='mb-5' eventKey={wiadomosc.id}>
                            <AccordionHeader>
                                Wiadomość od {wiadomosc.name}
                            </AccordionHeader>
                            <Accordion.Body>
                                <p>mail kontaktowy: {wiadomosc.email}</p>
                                <p>Treść: {wiadomosc.conForm}</p>
                            </Accordion.Body>
                        </AccordionItem>
                    ))}
                </Accordion>}


        </>
    )
}

export default ProfilWiadomosci;