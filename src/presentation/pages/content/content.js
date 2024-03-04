import { Paper } from "@mui/material";
import { NavBar } from "../../components/NavBar";
import { WithDataFetchTable } from "../../components/WithDataFetchTable";
import { clothingGarmentFormConfig, fetchClothingGarment } from "../../../services/ClothingGarmentService";
import { useEffect } from "react";

export function Content() {
    // useEffect(() => {
    //     const designer = new DesignerDTO(1, "Helmut Lang");
    //     const material = new MaterialDto(1, "nylon", "producer1");
    //     const collection = new CollectionDTO(1, "AW 2007", designer, "AW", 2007);
    //     const clothingGarment = new ClothingGarment(1, "1997 Washed Nylon Twill Tailored Jacket", [material], 285.0, 1, 1997, collection);
    //     console.log(clothingGarment);
    // }, [])

    return (
        <>
            <NavBar></NavBar>
            <Paper sx={{ width: 0.7, "margin-left": "auto", "margin-right": "auto", "margin-top": "5%" }}>
                <WithDataFetchTable fetchData={fetchClothingGarment} formConfig={clothingGarmentFormConfig} type="clothing" />
            </Paper>
        </>
    );
}