// extract any functions you are using to manipulate your data, into this file

exports.timestampConverter = (dataArray) => {
    let updatedData = [];
     
//newArray[i] is each object

    for (let i = 0; i < dataArray.length; i++) {
        let newDataObj = { ...dataArray[i] };
        let newDate = new Date(newDataObj.created_at);
        let dateString = newDate.toGMTString();
        newDataObj.created_at = dateString;

        updatedData.push(newDataObj);
    }
    return updatedData;
}