import axios from "axios";
import {CitiesSearchResponse} from "@/client/CitiesSearchClient/citiesSearchClient-types";

export const citiesSearchClient = {
    getCities(name: string) {
        return axios.get<CitiesSearchResponse>("https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions", {
            headers: {
                "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
                "x-rapidapi-key": "f061b5aed2msh845f4a7c5c1c83dp151aebjsn88a52b7640ee"
            },
            params: {
                namePrefix: name
            }
        }).then(response => response.data.data)
    }
}