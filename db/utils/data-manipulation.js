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
// needs to reference title from articles table...
// ...and belongs_to key from comments table
// update comments.belongs_to with article_id

exports.makeRefObj = (array, desiredKey, desiredValue) => {
    const refObj = {};
    
    array.forEach((itemInArray) => {
        refObj[itemInArray[desiredKey]] = itemInArray[desiredValue];
    });
    console.log(refObj)
    return refObj;
};

//same as saying:
//refObj[itemInArray.title] = itemInArray.article_id

