// extract any functions you are using to manipulate your data, into this file

exports.timestampConverter = (dataArray) => {
    let updatedData = [];
     
//newArray[i] is each object

    for (let i = 0; i < dataArray.length; i++) {
        let newDataObj = { ...dataArray[i] };
        let newDate = new Date(newDataObj.created_at);
        let dateString = newDate.toUTCString();
        newDataObj.created_at = dateString;

        updatedData.push(newDataObj);
    }
    return updatedData;
}

exports.renameKey = (newKey, oldKey, dataArray) => {
    //console.log('datarray is', dataArray)
    let newArray = [];   

    for (let i = 0; i < dataArray.length; i++) {
        let newData = { ...dataArray[i] };
        newData[newKey] = newData[oldKey];
        newArray.push(newData);
        delete newData[oldKey];
    }
    return newArray;
}

// make a lookup function for article_id
// needs to reference article table with - article name
// and belongs_to key from comments table



// exports.makeLookupObj = (array, desiredKey, desiredValue) => {
//     return array.reduce((lookupObject, currentArrayObject) => {
//         lookupObject[currentArrayObject[desiredKey]] =
//             currentArrayObject[desiredValue];
//         return lookupObject;
//     }, {});
// };

// exports.makeShopData = (lookupObject, array) => {
//     return array.map(currentArrayItem => {
//         const newObj = { ...currentArrayItem };
//         newObj.owner_id = lookupObject[currentArrayItem.owner];
//         delete newObj.owner;
//         return newObj;
//     });
// };

// exports.makeTreasureData = (lookup, array) => {
//     return array.map(currentArrayItem => {
//         const newObj = { ...currentArrayItem };
//         newObj.shop_id = lookup[currentArrayItem.shop];
//         delete newObj.shop;
//         return newObj;
//     });
