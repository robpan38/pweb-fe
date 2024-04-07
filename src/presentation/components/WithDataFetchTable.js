import { useEffect, useState } from "react";
import EnhancedTable from "./TableComponent";
import { Alert } from "@mui/material";

export const WithDataFetchTable = (props) => {
    const { addData, fetchData, updateData, deleteData, type } = props;
    const [rows, setRows] = useState([]);
    const [headCells, setHeadCells] = useState([]);
    const [showAlert, setShowAlert] = useState(null);

    const addDataCallback = async (newItem) => {
        await addData(newItem)
            .then(response => {
                fetchData().then(setFetchedDataAndHeadCells);

                setShowAlert({
                    text: "Item was successfully added!",
                    severity: "success"
                });
                setTimeout(() => {
                    setShowAlert(null);
                }, 3000);
            })
            .catch(error => {
                setShowAlert({
                    text: `${error}`,
                    severity: "error"
                });
                setTimeout(() => {
                    setShowAlert(null);
                }, 3000);
            });
    }

    const updateDataCallback = async (updatedItem) => {
        await updateData(updatedItem)
            .then(response => {
                fetchData().then(setFetchedDataAndHeadCells);

                setShowAlert({
                    text: "Item was successfully updated!",
                    severity: "success"
                });
                setTimeout(() => {
                    setShowAlert(null);
                }, 3000);
            })
            .catch(error => {
                setShowAlert({
                    text: `${error}`,
                    severity: "error"
                });
                setTimeout(() => {
                    setShowAlert(null);
                }, 3000);
            });
    }

    const handleFilterCallback = async (filterNameValue) => {
        fetchData(filterNameValue).then(setFetchedDataAndHeadCells);
    }

    const handleDeleteCallback = async (ids) => {
        await deleteData(ids)
            .then(response => {
                fetchData().then(setFetchedDataAndHeadCells);

                setShowAlert({
                    text: "Item(s) successfully deleted!",
                    severity: "success"
                });
                setTimeout(() => {
                    setShowAlert(null);
                }, 3000);
            })
            .catch(error => {
                setShowAlert({
                    text: `${error}`,
                    severity: "error"
                });
                setTimeout(() => {
                    setShowAlert(null);
                }, 3000);
            });
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
                    disablePadding: false,
                    label: "Designer"
                },
                {
                    id: "season",
                    numeric: true,
                    disablePadding: false,
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

    const generateAlert = (text, severity) => {
        return (
            <Alert sx={{ position: "absolute", zIndex: 1101, top: "15%", left: "50%", transform: "translate(-50%, -50%)" }} severity={severity}>
                {text}
            </Alert>
        );
    }

    return (<>
        {
            showAlert === null ? <></>
                : generateAlert(showAlert.text, showAlert.severity)
        }
        <EnhancedTable {...props} rows={rows} headCells={headCells}
            addDataCallback={addDataCallback}
            updateDataCallback={updateDataCallback}
            handleFilterCallback={handleFilterCallback}
            handleDeleteCallback={handleDeleteCallback}
        />
    </>)
};