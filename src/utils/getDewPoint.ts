export const getDewPoint = (temperature: number, humidity: number) => {
    const gammaT = (17.27 * temperature / (237.7 + temperature)) + Math.log(humidity / 100)
    return Math.floor((237.7 * gammaT) / (17.27 - gammaT))
}