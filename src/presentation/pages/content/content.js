import { Paper } from "@mui/material";
import { NavBar } from "../../components/NavBar";
import { WithDataFetchTable } from "../../components/WithDataFetchTable";
import { addClothingGarment, clothingGarmentFormConfig, deleteClothingGarment, fetchClothingGarment, updateClothingGarment } from "../../../services/ClothingGarmentService";
import { useEffect, useState } from "react";
import { addCollection, collectionsFormConfig, deleteCollection, fetchCollection, updateCollection } from "../../../services/CollectionsService";
import { Post } from "../../components/Post";
import { useOutletContext } from "react-router-dom";

export function Content() {
    const [page, setPage] = useState("Clothing garments");
    const [role, logInCallback, logOutCallback] = useOutletContext();

    return (
        <>
            <NavBar setPageCallback={setPage} logOutCallback={logOutCallback} ></NavBar>
            <Paper sx={{ width: 0.7, "margin-left": "auto", "margin-right": "auto", "margin-top": "5%", "margin-bottom": "5%" }}>
                {
                    page === "Clothing garments" ? (
                        <WithDataFetchTable addData={addClothingGarment}
                            fetchData={fetchClothingGarment}
                            updateData={updateClothingGarment}
                            deleteData={deleteClothingGarment}
                            formConfig={clothingGarmentFormConfig}
                            role={role}
                            title="Clothing garments" type="clothing"
                            addDataTitle="Add clothing garment"
                            updateDataTitle="Update clothing garment" />
                    ) : (
                        page === "Collections" ? (
                            <WithDataFetchTable addData={addCollection}
                                fetchData={fetchCollection}
                                updateData={updateCollection}
                                deleteData={deleteCollection}
                                formConfig={collectionsFormConfig}
                                role={role}
                                title="Collections" type="collection"
                                addDataTitle="Add collection"
                                updateDataTitle="Update collection" />
                        ) : (
                            <Post></Post>
                        )
                    )
                }
            </Paper>
        </>
    );
}