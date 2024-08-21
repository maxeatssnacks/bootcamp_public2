import { useState, useEffect } from "react";
import { v1 as uuid } from "uuid";
import axios from "axios";


function useFlipCard(initialVal = true) {

    const [value, setValue] = useState(initialVal);
    const flipCard = () => {
        setValue(previous => !previous);
    }

    return [value, flipCard]
}

function useAxios(baseUrl) {
    const [responses, setResponses] = useState([]);

    const addResponseData = async (restOfUrl = "") => {
        try {
            const response = await axios.get(`${baseUrl}${restOfUrl}`);
            setResponses(data => [...data, { ...response.data, id: uuid() }]);
        } catch (err) {
            console.error("Error fetching data:", err);
        }
    };

    return [responses, addResponseData];
}

export { useFlipCard, useAxios };