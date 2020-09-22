// extract any functions you are using to manipulate your data, into this file

exports.timestampConverter = (data) => {
    
    let newData = {...data};
    let newDate = new Date(newData.created_at);
    let dateString = newDate.toGMTString();
    newData.created_at = dateString;
    return newData;
}