const mockData = [
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
const getClothingGarmentCollection = (clothingGarment) => clothingGarment.collection.name;

export const clothingGarmentFormConfig = {
    fields: [
        {
            "fieldName": "name",
            "type": "string",
            "get": getClothingGarmentSimpleProperty
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
            "get": getClothingGarmentSimpleProperty
        },
        {
            "fieldName": "stock",
            "type": "number",
            "get": getClothingGarmentSimpleProperty
        },
        {
            "fieldName": "year",
            "type": "number",
            "get": getClothingGarmentSimpleProperty
        },
        {
            "fieldName": "collection",
            "type": "string",
            "get": getClothingGarmentCollection
        }
    ]
};

export const fetchClothingGarment = async () => {
    // real fetching logic when backend is in place
    return Promise.resolve(mockData);
}
