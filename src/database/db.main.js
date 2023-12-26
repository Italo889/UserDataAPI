"use strict";

import { db_consult } from "./controllers/db.controller.consult.js";
import { db_create } from "./controllers/db.controller.create.js";
import { db_update } from "./controllers/db.controller.update.js";
import { db_delete } from "./controllers/db.controller.delete.js";

export const Database = {
    async consult(UID=null){
        if(!UID || UID === null){
            return await db_consult.all();
        } else {
            return await db_consult.get(UID);
        }
    },

    async create(data){
        return await db_create(data);
    },

    async update(data, UID){
        return await db_update(data, UID);
    },

    async delete(UID){
        return await db_delete(UID);
    },
}
