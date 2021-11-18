import {Location} from "@Components/LocationsList";

export const reorder = (list: Location[], startIndex: number, endIndex: number): Location[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};