export const dtoToColumnNames = (dto) => {
    const result = [];
    Object.keys(dto).forEach(key => result.push(key));
    return result;
}

