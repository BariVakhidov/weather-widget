import {Draggable, DroppableProvided, DroppableStateSnapshot} from "react-beautiful-dnd";
import React, {FC, memo} from "react";
import styles from "@Components/LocationsList/Locations.module.scss";
import {DeleteOutlined} from "@ant-design/icons";
import {Location} from "@Components/LocationsList/index";
import cn from "classnames";
import {Nullable} from "@/types";

interface Props {
    provided: DroppableProvided;
    snapshot: DroppableStateSnapshot;
    locations: Location[];
    deleteLocation: (id: string) => void;
    setCurrentLocation: (location: Location) => void;
    selectedLocation: Nullable<Location>;
}

export const DroppableList: FC<Props> = memo(({
                                                  selectedLocation,
                                                  provided,
                                                  snapshot,
                                                  locations,
                                                  deleteLocation,
                                                  setCurrentLocation
                                              }) => {
    return (
        <div {...provided.droppableProps} ref={provided.innerRef} className={styles.locations}>
            {locations.map((location, index) => <Draggable key={location.id} draggableId={location.id}
                                                           index={index}>
                {(provided1, snapshot1) => <div onClick={() => setCurrentLocation(location)}
                                                className={cn(styles.location, {[styles.selected]: selectedLocation?.name === location.name})} {...provided1.draggableProps}
                                                {...provided1.dragHandleProps}
                                                ref={provided1.innerRef}>{location.name} <DeleteOutlined
                    onClick={(e) => {
                        e.stopPropagation();
                        deleteLocation(location.id)
                    }
                    }
                    className={styles.delete}/></div>}
            </Draggable>)}
            {provided.placeholder}
        </div>
    )
})