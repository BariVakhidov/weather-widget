import React, {FC, memo, useCallback, useEffect, useState} from "react"
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

interface Props {
    closeWidget: () => void;
}

export const Widget: FC<Props> = memo(({closeWidget}) => {
    const [isTryingToGetLocation, setTryingToGetLocation] = useState(false)
    const [state, dispatch] = useWidgetStore()
    const {isConfigMode, currentLocation, locations} = state

    const handleTryToGetLocation = useCallback(() => setTryingToGetLocation(true), [])
    const tryToGetLocation = (locations: Location[]) => {
        dispatch({type: WidgetActions.SET_CURRENT_LOCATION, payload: null})
        navigator.geolocation.getCurrentPosition(position => {
            batch(() => {
                dispatch({type: WidgetActions.SET_SELECTED_LOCATION, payload: null})
                dispatch({
                    type: WidgetActions.SET_CURRENT_LOCATION, payload: {
                        lon: position.coords.longitude,
                        lat: position.coords.latitude
                    }
                })
            })
        }, error => {
            console.log(error)
            if (locations.length) {
                dispatch({type: WidgetActions.SET_SELECTED_LOCATION, payload: locations[0]})
            }
        })
        setTryingToGetLocation(false)
    }
    const getWeatherByLocation = async (params: GetWeatherByLocation) => {
        dispatch({type: WidgetActions.SET_FETCHING, payload: true})
        try {
            const response = await weatherClient.getWeatherByCoordinates(params)
            dispatch({type: WidgetActions.SET_WEATHER_DATA, payload: response})
        } catch (error) {
            dispatch({type: WidgetActions.SET_ERROR, payload: error})
        } finally {
            setTimeout(() => dispatch({type: WidgetActions.SET_FETCHING, payload: false}), 500)
        }
    }

    useEffect(() => {
        if (localStorage.length) {
            const locationsList: Location[] | null = JSON.parse(localStorageService.getItem("locations-list"))
            if (locationsList.length) {
                dispatch({type: WidgetActions.SET_LOCATIONS, payload: locationsList})
            }
        }
        setTryingToGetLocation(true)
        return () => {
            dispatch({type: WidgetActions.CLEANUP})
        }
    }, [])

    useEffect(() => {
        if (currentLocation) {
            getWeatherByLocation(currentLocation)
        }
    }, [currentLocation])

    useEffect(() => {
        if (isTryingToGetLocation) {
            tryToGetLocation(locations)
        }
    }, [isTryingToGetLocation,locations])

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
