import {Nullable} from "@/types";
import {WeatherByCityResponse} from "@/client/WeatherClient/weatherClient-types";
import {Reducer} from "react";
import {Location} from "@Components/LocationsList";

export interface LocationByCoordinates {
    lon: number;
    lat: number;
}

export interface WidgetState {
    weatherData: Nullable<WeatherByCityResponse>;
    isFetching: boolean;
    isConfigMode: boolean;
    isVisible: boolean;
    locations: Location[];
    selectedLocation: Nullable<Location>;
    currentLocation: Nullable<LocationByCoordinates>;
    error: unknown;
}

export enum WidgetActions {
    SET_WEATHER_DATA = "SET_WEATHER_DATA",
    SET_FETCHING = "SET_FETCHING",
    SET_CONFIG_MODE = "SET_CONFIG_MODE",
    SET_VISIBLE = "SET_VISIBLE",
    SET_LOCATIONS = "SET_LOCATIONS",
    SET_LOCATION = "SET_LOCATION",
    DELETE_LOCATION = "DELETE_LOCATION",
    SET_SELECTED_LOCATION = "SET_SELECTED_LOCATION",
    SET_CURRENT_LOCATION = "SET_CURRENT_LOCATION",
    CLEANUP = "CLEANUP",
    SET_ERROR = "SET_ERROR",
}

export type WidgetActionCreatorsType =
    | { type: WidgetActions.SET_SELECTED_LOCATION, payload: Location }
    | { type: WidgetActions.SET_CURRENT_LOCATION, payload: LocationByCoordinates }
    | { type: WidgetActions.SET_CONFIG_MODE, payload: boolean }
    | { type: WidgetActions.SET_LOCATIONS, payload: Location[] }
    | { type: WidgetActions.SET_LOCATION, payload: Location }
    | { type: WidgetActions.DELETE_LOCATION, payload: string }
    | { type: WidgetActions.SET_WEATHER_DATA, payload: Nullable<WeatherByCityResponse> }
    | { type: WidgetActions.SET_FETCHING, payload: boolean }
    | { type: WidgetActions.SET_VISIBLE, payload: boolean }
    | { type: WidgetActions.SET_ERROR, payload: string }
    | { type: WidgetActions.CLEANUP }

export const widgetInitialState: Readonly<WidgetState> = {
    weatherData: null,
    isFetching: false,
    isConfigMode: false,
    isVisible: false,
    locations: [],
    selectedLocation: null,
    currentLocation: null,
    error: null,
}

export const widgetReducer: Reducer<WidgetState, WidgetActionCreatorsType> = (state, action) => {
    switch (action.type) {
        case WidgetActions.SET_WEATHER_DATA:
            return {
                ...state,
                weatherData: action.payload,
            }
        case WidgetActions.SET_CONFIG_MODE:
            return {
                ...state,
                isConfigMode: action.payload,
            }
        case WidgetActions.SET_SELECTED_LOCATION:
            return {
                ...state,
                selectedLocation: action.payload,
            }
        case WidgetActions.SET_FETCHING:
            return {
                ...state,
                isFetching: action.payload,
            }
        case WidgetActions.SET_LOCATIONS:
            return {
                ...state,
                locations: action.payload,
            }
        case WidgetActions.SET_LOCATION:
            return {
                ...state,
                locations: !state.locations.find(location => location.name === action.payload.name)
                    ? [action.payload, ...state.locations]
                    : state.locations,
            }
        case WidgetActions.SET_CURRENT_LOCATION:
            return {
                ...state,
                currentLocation: action.payload,
            }
        case WidgetActions.DELETE_LOCATION:
            return {
                ...state,
                locations: state.locations.filter(location => location.id !== action.payload),
            }
        case WidgetActions.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            }
        case WidgetActions.SET_VISIBLE:
            return {
                ...state,
                isVisible: action.payload,
            }
        case WidgetActions.CLEANUP:
            return widgetInitialState;
        default:
            return state;
    }
}