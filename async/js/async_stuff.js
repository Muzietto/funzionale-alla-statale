// const batches = [[1,2,3],[4,5,6,7,8],[9,10,11,12,13,14]]
function males_promise(batches, resultSize, result) {
    result = result || [];

    if (batches.length === 0) return Promise.resolve(result);

    return fb_api(head(batches))
        .then(fb_values => genderModule(fb_values, 'M'))
        .then(males => (males.length + result.length > resultSize)
            ? Promise.resolve(result.concat(males).slice(0, resultSize))
            : males_promise(tail(batches), resultSize, result.concat(males)));
}

function fb_api(arra) {
    return Promise.resolve(arra.map(id => {
        let rnd = Math.floor(Math.random() * 8);
        return {
            id: id,
            name: Object.keys(namesAndGenders)[rnd],
        };
    }));
}

function genderModule(arra, gender) {
    return Promise.resolve(arra
        .filter(obj => (namesAndGenders[obj.name] === gender))
        .map(obj => ({
            gender: gender,
            id: obj.id,
            name: obj.name,
        })));
}

const namesAndGenders = {
    'luc': 'M',
    'marco': 'M',
    'miranda': 'F',
    'barbara': 'F',
    'andy': 'M',
    'cassandra': 'F',
    'bob': 'M',
};
