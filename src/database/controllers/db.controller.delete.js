"use strict";

import { db_consult } from "./db.controller.consult.js";
import { _db_persist, _db_recover } from "./db.controller.internal.js"; 

/**
 * Function to delete a value on DB based on UID
 * @param {string} UID Unique ID from delete on DB
 * @returns {object} Info from this process
 */
async function db_delete(UID){
    const is_valid_uid = true // await validateUID(UID);

    if(!is_valid_uid){ throw new Error("Invalid UID") };
    
    const actual_data = await db_consult.all();

    if(!actual_data.find(item => item.uid === UID)){
        return JSON.stringify({
            info: "This data not exists",
            error: "Not find"
        })
    }

    const new_temporary_db = actual_data.filter(item => item.uid !== UID);

    await _db_persist(new_temporary_db);

    return { info: "Data deleted", uid: UID}
}

export { db_delete };