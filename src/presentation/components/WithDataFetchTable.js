import { useEffect, useState } from "react";
import EnhancedTable from "./TableComponent";
import { mockData } from "../../services/ClothingGarmentService";

export const WithDataFetchTable = (props) => {
    const { addData, fetchData, type } = props;
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const addDataCallback = async (newItem) => {
        // console.log("am primit", newItem);
        const randomObject = mockData[Math.floor((Math.random() * mockData.length))];
        // we don't use the new Item
        const result = await addData(rows, randomObject);
        setFetchedDataAndHeadCells(result);
    }

    const updateDataCallback = async (updatedItem) => {
        console.log(updatedItem);
    }

    const setFetchedDataAndHeadCells = (rows) => {
        if (type === "clothing") {
            const headCells = [
                {
                    id: "name",
                    numeric: false,
                    disablePadding: false,
                    label: "Name"
                },
                {
                    id: "materials",
                    numeric: true,
                    disablePadding: false,
                    label: "Materials"
                },
                {
                    id: "price",
                    numeric: true,
                    disablePadding: false,
                    label: "Price"
                },
                {
                    id: "stock",
                    numeric: true,
                    disablePadding: false,
                    label: "Stock"
                },
                {
                    id: "year",
                    numeric: true,
                    disablePadding: false,
                    label: "Year"
                },
                {
                    id: "collection",
                    numeric: true,
                    disablePadding: false,
                    label: "Collection"
                }
            ];
            setHeadCells(headCells);
        } else if (type === "collection") {
            const headCells = [
                {
                    id: "name",
                    numeric: false,
                    disablePadding: false,
                    label: "Name"
                },
                {
                    id: "designer",
                    numeric: true,
                    disablePadding: true,
                    label: "Designer"
                },
                {
                    id: "season",
                    numeric: true,
                    disablePadding: true,
                    label: "Season"
                },
                {
                    id: "year",
                    numeric: true,
                    disablePadding: false,
                    label: "Year"
                }
            ];
            setHeadCells(headCells);
        }
        setRows(rows);
    };

    useEffect(() => {
        fetchData().then(setFetchedDataAndHeadCells);
    }, [fetchData]);

    return <EnhancedTable {...props} rows={rows} headCells={headCells}
        addDataCallback={addDataCallback}
        updateDataCallback={updateDataCallback}
    />
};