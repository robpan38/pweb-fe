import { useEffect, useState } from "react";
import EnhancedTable from "./TableComponent";

export const WithDataFetchTable = (props) => {
    const { fetchData, type } = props;
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);

    const setFetchedDataAndHeadCells = (rows) => {
        if (type === "clothing") {
            const headCells = [
                {
                    id: "name",
                    numeric: true,
                    disablePadding: false,
                    label: "Name"
                },
                {
                    id: "materials",
                    numeric: false,
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
                    numeric: false,
                    disablePadding: false,
                    label: "Collection"
                }
            ];
            setHeadCells(headCells);
        }
        setRows(rows);
    };

    useEffect(() => {
        fetchData().then(setFetchedDataAndHeadCells);
    }, [fetchData]);

    return <EnhancedTable {...props} rows={rows} headCells={headCells} />
};