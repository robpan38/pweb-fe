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

export const fetchClothingGarment = async () => {
    return axios.get(BASE_URL)
        .then(response => response.data)
        .catch(console.log);
}

export const addClothingGarment = (oldData, newElement) => {
    // real adding logic when backend is in place
    return new Promise((resolve, reject) => setTimeout(() => {
        console.log("log zabalos");
        resolve([...oldData, newElement]);
    }, 3000));

}
