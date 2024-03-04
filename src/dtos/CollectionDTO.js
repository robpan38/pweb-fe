export class CollectionDTO {
    id;
    name;
    designer;
    season;
    year;

    constructor(id, name, designer, season, year) {
        this.id = id;
        this.name = name;
        this.designer = designer;
        this.season = season;
        this.year = year;
    }
}