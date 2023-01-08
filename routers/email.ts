import express from 'express';
import { insertEmails } from '../DBUtils/emails';

const axios = require('axios');
const logger = require('.././logger');

const router = express.Router();
router.use(async(req, res, next) =>{
    try {
        const token = req.headers.authorization;
        if(!token || token!==process.env.API_KEY ){
            logger.info({msg:'unAuthorize key', level:'info' })
            res.status(403).send('unAuthorize key');
        }
        else{
            next();

        }
        
    } catch (error) {
        next(error);
    }
})

router.post('/send', async(req, res, next) => {
    try{
        const {to_recipient, subject, body} = req.body;
        await insertEmails(to_recipient, subject, body);
        let e = process.env.MY_Email || 'default@example.com';
        await axios.post('http://localhost:3000', {from:e, to_recipient:to_recipient, subject:subject, body:body});
        logger.info({msg:`${req.body} successfully added!`, level:'info' })
        res.status(200).send(`${req.body} successfully added!`);
    }
    catch(e){
        next(e);
    }
    

})


export default router;