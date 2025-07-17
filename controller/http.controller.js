import HttpMsgAndCode from "../models/HttpMsgAndCode.model.js";
// import 

export const searchHttpByCode = async( req, res ) => {
    try {
        let { code } = req.params;
        code = parseInt(code);
        if(!code){
            return    res.status.json({error : 'id must be integer'});
        }

        const httpDetails = await HttpMsgAndCode.findOne({
            where : {
                status : code
            }
        });

        if(!httpDetails){
            return res.status(201).json({"message": `Status code '${id}' is not supported`});
        }
        return res.status(201).json({httpDetails});

    }catch(error){
        res.status(500).json({message: 'Internet server error', error})
    }
};
export const customHttpResponse = async( req, res ) => {
    try{
        const { code, messageValue} = req.params;
        
        if(!code){
            return    res.status.json({error : 'id must be integer'});
        }

        const httpDetails = await HttpMsgAndCode.findOne({
            where : {
                status : code
            }
        });

        if(!httpDetails){
            return res.status(201).json({"message": `Status code '${id}' is not supported`});
        }
        return res.status(201).json({status: httpDetails.status , message: `${messageValue}`});
    }catch(error){
        res.status(500).json({message: 'Internet server error', error})
    }
};