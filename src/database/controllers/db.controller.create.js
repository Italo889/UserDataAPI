"use strict";

import { db_consult } from "./db.controller.consult.js";
import { _db_persist } from "./db.controller.internal.js";

/**
 * Function to create new data on DB
 * @param {object|object[]} data Data on standart model
 * @returns {object} Info for created data
 */
async function db_create(data){
    const data_to_persist = [];
    let UID = "";

    const temporary_db = await db_consult.all();
   
    if(temporary_db !== null && temporary_db !== "[{}]"){
        temporary_db.map(item => data_to_persist.push(item))
    }

    if(Array.isArray(data)){
        UID = [];
        data.forEach(item => {
            const uid = _create_uid();
            data_to_persist.push(_insert(item, uid));
            UID.push(uid);
        });
    } else {
        const uid = _create_uid();
        data_to_persist.push(_insert(data, uid));
        UID = uid;
    }

    await _db_persist(data_to_persist);
    
    return {info: "New data created", uid: UID};
};

function _insert(data, uid){
    const is_valid_data = true // await validateData(data);
    if(!is_valid_data){ throw new Error("Invalid data") };

    const configured_data =  {...data, uid: uid} // await configureData(data, uid);

    return configured_data;
}

function _create_uid(){
    return crypto.randomUUID();
}


export { db_create };