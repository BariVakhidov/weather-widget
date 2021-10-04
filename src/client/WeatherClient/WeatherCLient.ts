import { appid } from "@/constants/appid"
import { instance } from "../ApiClient"
import { WeatherByCityResponse } from "./weatherClient-types"

export const weatherClient = {
    getWeatherByCity(cityName: string) {
        return instance.get<WeatherByCityResponse>('', {
            params: {
                q: cityName,
                units: 'metric',
                appid
            }
        }).then(response => response.data)
    }
}