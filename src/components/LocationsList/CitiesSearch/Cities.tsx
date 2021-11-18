import React, {FC, memo} from "react";
import {City} from "@/client/CitiesSearchClient/citiesSearchClient-types";
import styles from "./CitiesSearch.module.scss"

interface Props {
    cities: City[];
    onCityClick: (cityName: string) => void;
}

export const Cities: FC<Props> = memo(({cities, onCityClick}) => {
    return (
        <div className={styles.cities}>
            {cities.map(city => <span className={styles.city} onClick={() => onCityClick(city.name)}
                                      key={city.id}>{city.name}, {city.countryCode}</span>)}
        </div>
    );
});