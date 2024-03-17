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

export const fetchCollection = async () => {
    // real fetching logic when backend is in place
    return Promise.resolve(mockData);
}

export const addCollection = (oldData, newElement) => {
    // real adding logic when backend is in place
    return new Promise((resolve, reject) => setTimeout(() => {
        console.log("log zabalos");
        resolve([...oldData, newElement]);
    }, 3000));

}