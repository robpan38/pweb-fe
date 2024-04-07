import axios from "axios";

export const mockData = [
    {
        "id": 1,
        "name": "AW 2007",
        "designer": {
            "id": 1,
            "name": "Helmut Lang"
        },
        "season": "Autumn Winter",
        "year": 2007
    },
    {
        "id": 2,
        "name": "SS 2008",
        "designer": {
            "id": 1,
            "name": "Helmut Lang"
        },
        "season": "Spring Summer",
        "year": 2008
    },
];

const getCollectionSimpleProperty = (property) => (collection) => collection[property];
const getCollectionDesignerName = (collection) => {
    if (collection.desginer !== null) {
        return collection.designer.name;
    } else {
        return "";
    }
}

export const collectionsFormConfig = {
    fields: [
        {
            "fieldName": "name",
            "type": "string",
            "get": getCollectionSimpleProperty("name")
        },
        {
            "fieldName": "designer",
            "type": "string",
            "get": getCollectionDesignerName
        },
        {
            "fieldName": "season",
            "type": "string",
            "get": getCollectionSimpleProperty("season")
        },
        {
            "fieldName": "year",
            "type": "number",
            "get": getCollectionSimpleProperty("year")
        }
    ]
};

const BASE_URL = "http://localhost:8080/api/v1/collection";

export const fetchCollection = async (name) => {
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
        designerName:
            typeof item?.designer === "string"
                ? item?.designer
                : item?.designer?.name,
        season: item?.season,
        year: item?.year
    };
}

export const addCollection = (newItem) => {
    return axios.post(BASE_URL, convertToDto(newItem));
}

export const updateCollection = async (updatedItem) => {
    return axios.post(BASE_URL + "/update", convertToDto(updatedItem));
}

export const deleteCollection = async (ids) => {
    return axios.delete(BASE_URL, { data: ids });
}
