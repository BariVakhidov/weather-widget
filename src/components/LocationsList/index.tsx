import React, {FC, memo, useCallback, useEffect} from "react";
import {DragDropContext, Droppable, DropResult} from "react-beautiful-dnd";
import {Space} from "antd";
import {LeftOutlined} from "@ant-design/icons";
import styles from "./Locations.module.scss"
import {DroppableList} from "@Components/LocationsList/DroppableList";
import {CitiesSearch} from "@Components/LocationsList/CitiesSearch";
import {useWidgetStore} from "@/logic/store";
import {WidgetActions} from "@/logic/widgetReducer";
import {reorder} from "@/utils/reorder";
import {nanoid} from "nanoid";
import {localStorageService} from "@/services/localStorageService";
import {batch} from "react-redux";

export interface Location {
    id: string;
    name: string;
}

export const LocationsList: FC = memo(() => {

    const [state, dispatch] = useWidgetStore()
    const {locations, selectedLocation} = state

    const setCurrentLocation = useCallback((location: Location) => {
        batch(() => {
            dispatch({
                type: WidgetActions.SET_SELECTED_LOCATION,
                payload: location
            })
            dispatch({
                type: WidgetActions.SET_CONFIG_MODE,
                payload: false
            })
        })
    }, [])
    const disableConfigMode = () => dispatch({type: WidgetActions.SET_CONFIG_MODE, payload: false})
    const onDragEnd = useCallback((result: DropResult) => {
        // dropped outside the list
        if (!result.destination) {
            return;
        }

        const items: Location[] = reorder(
            locations,
            result.source.index,
            result.destination.index
        );

        dispatch({type: WidgetActions.SET_LOCATIONS, payload: items})
    }, [reorder, locations]);
    const setLocation = (name: string) => dispatch({type: WidgetActions.SET_LOCATION, payload: {name, id: nanoid(12)}})
    const deleteLocation = useCallback((id: string) => dispatch({
        type: WidgetActions.DELETE_LOCATION,
        payload: id
    }), [dispatch])

    useEffect(() => {
        localStorageService.setItem("locations-list", JSON.stringify(locations))
    }, [locations])

    return (
        <div>
            <Space>
                <LeftOutlined className={styles.back} onClick={disableConfigMode}/>
                <b>Settings</b>
            </Space>
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="droppable" isCombineEnabled>
                    {(provided, snapshot) => <DroppableList selectedLocation={selectedLocation}
                                                            setCurrentLocation={setCurrentLocation}
                                                            deleteLocation={deleteLocation} provided={provided}
                                                            snapshot={snapshot}
                                                            locations={locations}/>}
                </Droppable>
            </DragDropContext>
            <b>Add location:</b>
            <CitiesSearch setLocation={setLocation}/>
        </div>
    );
});