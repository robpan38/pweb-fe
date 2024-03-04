export class ClothingGarment {
    id;
    name;
    materials;
    price;
    stock;
    year;
    collection;

    constructor(id, name, materials, price, stock, year, collection) {
        this.id = id;
        this.name = name;
        this.materials = materials;
        this.price = price;
        this.stock = stock;
        this.year = year;
        this.collection = collection;
    }
}