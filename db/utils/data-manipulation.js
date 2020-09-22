// extract any functions you are using to manipulate your data, into this file

exports.timestampConverter = (dataArray) => {
    let newArray = [...dataArray];
    let updatedData = [];
     
//newArray[i] is each object

    for (let i = 0; i < newArray.length; i++) {
        let newData = { ...newArray[i] };
        let newDate = new Date(newData.created_at);
        let dateString = newDate.toGMTString();
        newData.created_at = dateString;

        updatedData.push(newData);
    }
    return updatedData;
}