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




// the lookup object is to help us more easily find the article_id by referencing the article name

// the array being passed in will be the array of article objects 

// each comment object has a key of belongs_to, of which the value is the article title

exports.makeRefObj = (array, desiredKey, desiredValue) => {
    const refObj = {};
    
    array.forEach((itemInArray) => {
        refObj[itemInArray[desiredKey]] = itemInArray[desiredValue];
    });
    return refObj;
};

// same as saying: this key = this value:
// refObj[itemInArray.title] = itemInArray.article_id
// result  { 'funny article name': 1 }

// FORMAT COMMENTS - we can write another function now to check the article title by checking the value of belongs_to in the comment object...then we can replace this which article_id


exports.formatComments = (commentsArr, refObj) => {

    //loop through comments with map
    const formattedComments = commentsArr.map((comment) => {

        //copy in the contents of each comment and add our desired keys of author and article_id to create a formatted comment
        const formattedComment = {
            ...comment,
            author: comment.created_by,
            article_id: refObj[comment.belongs_to]
        }
        //delete old keys that we don't want any more
        delete formattedComment.belongs_to;
        delete formattedComment.created_by;
    return formattedComment;
    })
    return formattedComments;
}