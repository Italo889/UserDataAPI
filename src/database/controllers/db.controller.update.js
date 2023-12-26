"use strict";

import { db_consult } from "./db.controller.consult.js";
import { _db_persist } from "./db.controller.internal.js";

/**
 * Function to update a value on DB
 * @param {object} new_data Data on standart model
 * @param {string} UID Unique ID from update
 */
async function db_update(new_data, UID){

    const is_valid_data = true // await validateData(new_data);
    const is_valid_uid = true // await validateUID(UID);

    if(!is_valid_data){ throw new Error("Invalid data") }
    if(!is_valid_uid){ throw new Error("Invalid UID") }

    const configured_data = {...new_data, uid:UID} // await configureData(new_data);
    const temporary_db = await db_consult.all();
    const new_temporary_db = [];

    for(const item of temporary_db){
        let temp_item = item;
        if(item.uid === UID){
            temp_item = configured_data;
        }
        new_temporary_db.push(temp_item);
    }

    await _db_persist(new_temporary_db);

    return { info: "Your data is updated", uid: UID }
}

export { db_update }
