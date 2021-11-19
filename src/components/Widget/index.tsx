import React, {FC, memo, useCallback, useEffect, useLayoutEffect, useState} from "react"
import styles from "./Widget.module.scss"
import {Icon} from "@Components/common/icon/Icon"
import close from "@Assets/images/cancel.png"
import {Weather} from "./Weather"
import {Location, LocationsList} from "@Components/LocationsList"
import {GetWeatherByLocation} from "@/client/WeatherClient/weatherClient-types";
import {weatherClient} from "@/client/WeatherClient/WeatherCLient";
import {localStorageService} from "@/services/localStorageService";
import {WidgetActions} from "@/logic/widgetReducer";
import {useWidgetStore} from "@/logic/store";
import {batch} from "react-redux";
import {nanoid} from "nanoid";

interface Props {
    closeWidget: () => void;
}

export const Widget: FC<Props> = memo(({closeWidget}) => {
    const [isTryingToGetLocation, setTryingToGetLocation] = useState(false)
    const [state, dispatch] = useWidgetStore()
    const {isConfigMode, currentLocation, selectedLocation, locations} = state

    const handleTryToGetLocation = useCallback(() => setTryingToGetLocation(true), [])
    const tryToGetLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const {longitude, latitude} = position.coords
            dispatch({type: WidgetActions.SET_CURRENT_LOCATION, payload: {lon: longitude, lat: latitude}})
        }, error => {
            console.log(error)
        })
    }
    const getWeatherByLocation = async (params: GetWeatherByLocation) => {
        dispatch({type: WidgetActions.SET_FETCHING, payload: true})
        try {
            const response = await weatherClient.getWeatherByCoordinates(params)
            const location: Location = {name: response.name, id: nanoid(12)}
            batch(() => {
                dispatch({type: WidgetActions.SET_SELECTED_LOCATION, payload: location})
                dispatch({type: WidgetActions.SET_WEATHER_DATA, payload: response})
                dispatch({type: WidgetActions.SET_LOCATION, payload: location})
            })
        } catch (error) {
            dispatch({type: WidgetActions.SET_ERROR, payload: error})
        } finally {
            setTryingToGetLocation(false)
            setTimeout(() => dispatch({type: WidgetActions.SET_FETCHING, payload: false}), 500)
        }
    }
    const getWeatherByCity = async (name: string) => {
        dispatch({type: WidgetActions.SET_FETCHING, payload: true})
        try {
            const response = await weatherClient.getWeatherByCity(name);
            dispatch({type: WidgetActions.SET_WEATHER_DATA, payload: response})
        } catch (error) {
            dispatch({type: WidgetActions.SET_ERROR, payload: error})
        } finally {
            setTimeout(() => dispatch({type: WidgetActions.SET_FETCHING, payload: false}), 500)
        }
    }

    useLayoutEffect(() => {
        if (localStorage.length) {
            const locationsList: Location[] | null = JSON.parse(localStorageService.getItem("locations-list"))
            if (locationsList.length) {
                dispatch({type: WidgetActions.SET_LOCATIONS, payload: locationsList})
                dispatch({type: WidgetActions.SET_SELECTED_LOCATION, payload: locationsList[0]})
            } else {
                tryToGetLocation()
            }
        }
        return () => {
            dispatch({type: WidgetActions.CLEANUP})
        }
    }, [])

    useEffect(() => {
        if (currentLocation && isTryingToGetLocation) {
            getWeatherByLocation(currentLocation)
        } else if (isTryingToGetLocation) {
            tryToGetLocation()
        }
    }, [isTryingToGetLocation, currentLocation])

    useLayoutEffect(() => {
        if (selectedLocation && !currentLocation) {
            getWeatherByCity(selectedLocation.name);
        }
    }, [selectedLocation, currentLocation])

    useEffect(() => {
        localStorageService.setItem("locations-list", JSON.stringify(locations))
    }, [locations])

    return (
        <>
            <div className={styles.widget}>
                {isConfigMode
                    ? <LocationsList/>
                    : <Weather handleTryToGetLocation={handleTryToGetLocation}/>}
            </div>
            <Icon onClick={closeWidget} source={close} height={15} style={styles.close}/>
        </>
    )
})
