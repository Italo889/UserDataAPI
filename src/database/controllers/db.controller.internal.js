"use strict";

import { readFileSync, writeFileSync } from "node:fs";

const db_main_path = new URL("../storage/db.json", import.meta.url);

/**
 * Function to rewrite the entire database
 * @param {object[]} data Array of objects in the standart model 
 * @param {string} db_path Path to database file
 */
function _db_persist(data, db_path=null){
    if(!db_path || db_path === null){
        writeFileSync(db_main_path, JSON.stringify(data), "utf8");
    } else {
        writeFileSync(db_path, JSON.stringify(data), "utf8");
    }
};

/**
 * Function to read the entire database.
 * @param {string} db_path Path to database file
 * @returns {object[]} Object containing db data
 */
function _db_recover(db_path=null){
    if(!db_path || db_path === null){
        return readFileSync(db_main_path, "utf8");
    } else {
        return readFileSync(db_path, "utf8");
    }
}

export { _db_persist, _db_recover };