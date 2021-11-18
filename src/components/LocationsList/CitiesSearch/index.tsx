import React, {FC, memo, useEffect, useState} from "react";
import {Input, Space} from "antd";
import {EnterOutlined} from "@ant-design/icons";
import {citiesSearchClient} from "@/client/CitiesSearchClient/CitiesSearchClient";
import {City} from "@/client/CitiesSearchClient/citiesSearchClient-types";
import {Cities} from "@Components/LocationsList/CitiesSearch/Cities";
import styles from "./CitiesSearch.module.scss"

interface Props {
    setLocation: (name: string) => void;
}

export const CitiesSearch: FC<Props> = memo(({setLocation}) => {
    const [inputValue, setInputValue] = useState("")
    const [cities, setCities] = useState<City[]>(null)

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => setInputValue(event.currentTarget.value)
    const onEnter = () => {
        setLocation(inputValue);
        setInputValue("");
    }
    const onCityClick = (locationName: string) => {
        setInputValue('');
        setCities(null);
        setLocation(locationName);
    }
    const getCities = async (locationName: string) => {
        const cities = await citiesSearchClient.getCities(locationName)
        setCities(cities)
    }

    useEffect(() => {
        if (inputValue.length) {
            const timeout = setTimeout(() => getCities(inputValue), 500);
            return () => {
                clearTimeout(timeout)
            }
        }
        if (!inputValue.length && cities) {
            setCities(null)
        }
    }, [inputValue])

    return (
        <div className={styles.input_container}>
            <Space className={styles.input}>
                <Input value={inputValue} onChange={onInputChange}
                       onPressEnter={onEnter} placeholder="new location"/>
                <EnterOutlined/>
            </Space>
            {cities && !!cities.length && <Cities cities={cities} onCityClick={onCityClick}/>}
        </div>
    );
});