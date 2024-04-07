import axios from "axios";

const BASE_URL = "http://localhost:8080/api/v1/clothingGarment";
export const mockData = [
    {
        "id": 1,
        "name": "1997 Washed Nylon Twill Tailored Jacket",
        "materials": [
            {
                "id": 1,
                "name": "nylon",
                "producer": "producer1"
            },
            {
                "id": 2,
                "name": "denim",
                "producer": "producer1"
            }
        ],
        "price": 285.0,
        "stock": 1,
        "year": 1997,
        "collection": null
    },
    {
        "id": 2,
        "name": "2000 Brown Heavy Raw Denim Simple 2 Pocket Jacket",
        "materials": [
            {
                "id": 1,
                "name": "raw denim",
                "producer": "producer1"
            }
        ],
        "price": 240.0,
        "stock": 1,
        "year": 2000,
        "collection": null
    }
];

const getClothingGarmentSimpleProperty = (property) => (clothingGarment) => clothingGarment[property];
const getClothingGarmentMaterials = (clothingGarment) => clothingGarment.materials.reduce((acc, curr) => {
    if (acc === "") {
        return curr.name;
    } else {
        return acc + ";" + curr.name;
    }
}, "");
const getClothingGarmentCollection = (clothingGarment) => {
    if (clothingGarment.collection !== null) {
        return clothingGarment.collection.name;
    }
};

export const clothingGarmentFormConfig = {
    fields: [
        {
            "fieldName": "name",
            "type": "string",
            "get": getClothingGarmentSimpleProperty("name")
        },
        {
            "fieldName": "materials",
            "type": "string",
            "help": "eg: mat1;mat2;mat3",
            "get": getClothingGarmentMaterials
        },
        {
            "fieldName": "price",
            "type": "number",
            "get": getClothingGarmentSimpleProperty("price")
        },
        {
            "fieldName": "stock",
            "type": "number",
            "get": getClothingGarmentSimpleProperty("stock")
        },
        {
            "fieldName": "year",
            "type": "number",
            "get": getClothingGarmentSimpleProperty("year")
        },
        {
            "fieldName": "collection",
            "type": "string",
            "get": getClothingGarmentCollection
        }
    ]
};

export const fetchClothingGarment = async (name) => {
    return axios.get(
        name !== undefined ? BASE_URL + `?name=${name}` : BASE_URL
    )
        .then(response => response.data)
        .catch(console.log);
}

const convertToDto = (item) => {
    return {
        id: item?.id,
        name: item?.name,
        materialsNames: typeof item?.materials === "string"
            ? item?.materials.split(";").map(material => material.trim())
            : item?.materials.map(material => material.name),
        price: item?.price,
        stock: item?.stock,
        year: item?.year,
        collectionName: typeof item?.collection === "string"
            ? item?.collection
            : item?.collection?.name
    }
}

export const addClothingGarment = async (newItem) => {
    return axios.post(BASE_URL, convertToDto(newItem));
}

export const updateClothingGarment = async (updatedItem) => {
    return axios.post(BASE_URL + "/update", convertToDto(updatedItem));
}

export const deleteClothingGarment = async (ids) => {
    return axios.delete(BASE_URL, { data: ids });
}
