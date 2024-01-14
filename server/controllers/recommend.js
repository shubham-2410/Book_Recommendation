const recommendation = require('../config/openAI');

const getRecommendation = async (req , res) =>{
    try {
        const {genre , author} = req.body;

        if(!genre && !author){
            return res.status(400).json({
                success:false,
                message:"For Recommendation please set preferences"
            })
        }

        var prompt = "";
        if(!genre){
            prompt= ` Please give me book recommendation , books written by ${author}.  Please give at least 5 to 6 recommendations .
            return response in the following parsable json format
            [            
                {
                    "id": "unique number in order",
                    "title" : "title of book",
                    "genre" : "genre of book",
                    "author" : "author of book"                    
                }
            ]` ;
        }
        else if(!author){
            prompt= ` Please give me book recommendation , books with genre ${genre}.  Please give at least 5 to 6 recommendations .
            return response in the following parsable json format
            [
                {
                    "id": "unique number in order",
                    "title" : "title of book",
                    "genre" : "genre of book",
                    "author" : "author of book"                    
                }
            ]` ;
        }
        else{
            prompt= ` Please give me book recommendation , books with genre ${genre} , written by author ${author}. Please give at least 5 to 6 recommendations and genre and author must be same
            return response in the following parsable json format
            [
                {
                    "id": "unique number in order",
                    "title" : "title of book",
                    "genre" : "genre of book",
                    "author" : "author of book"                    
                }
            ]` ;
        }

        const books =await recommendation(prompt);

        console.log(books)
        const contentData = JSON.parse(books.choices[0].message.content);
        return res.status(200).json({
            success:true,
            message:"Book recommendation successfull",
            prompt : prompt ,
            response : books,
            recommendedBooks : contentData,
        })
    } 
    catch (error) {
        // console.log('Environment Variables:', process.env);

        return res.status(500).json({
            success:false,
            message:"Error while recommending books",
            error : error,
            msg : error.message
        })
    }
}

module.exports = {getRecommendation};