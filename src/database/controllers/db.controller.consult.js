"use strict";

import { _db_recover } from "./db.controller.internal.js";

const temporary_db = await _db_recover();

const db_consult = {

    /**
     * Consult specific UID on database
     * @param {string} UID Unique ID from consult
     * @returns {object} Data from this ID
     */
    async get(UID){
        return JSON.parse(temporary_db).filter(item => item.uid === UID)
    },

    /**
     * Consult all data on database
     * @returns {object[]} General data from DB
     */
    async all(){
        return JSON.parse(temporary_db);
    }
}

export { db_consult };