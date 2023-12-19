"use strict";

import { describe, it } from "node:test";
import { deepStrictEqual, notDeepStrictEqual } from "node:assert";
import { Database } from "./../../src/database/db.main.js";

describe("Database workflows", () => {
    let _test_uid = "";

    describe("DB - Create's", () => {
        let temp_data = {
            name: "Teste name",
            email: "test@email.com",
            age: 123
        }

        it("Basic creation", async () => {
            const action = await Database.create(temp_data);

            notDeepStrictEqual(action.uid, undefined);
            _test_uid = action.uid;
        });

        it("Basic mult creations", async () => {
            let temps = [
                {
                    name: "Teste TEMP 1",
                    email: "test1@email.com",
                    age: 332
                },
                {
                    name: "Teste TEMP 2",
                    email: "test2@email.com",
                    age: 333
                }
            ]
            const action = await Database.create(temps);

            deepStrictEqual(Array.isArray(action.uid), true);
        });

    });

    describe("DB - consult's", () => {
        
        it("Global consult", async () => {
            const action = await Database.consult();

            deepStrictEqual(Array.isArray(action), true);
            notDeepStrictEqual(action[0].uid, undefined);
        });

        it("Unique consult", async () => {
            const action = await Database.consult(_test_uid);

            deepStrictEqual(action.name, "Teste name");
            notDeepStrictEqual(action.uid, undefined);
        });
    });

    describe("DB - Update's", () => {
        it("Update data", async () => {

            const new_data = {
                name: "Teste updated",
                email: "teste.teste2@email.com",
                age: 321
            };

            await Database.update(new_data, _test_uid);
            deepStrictEqual((await Database.consult(_test_uid)).name, "Teste updated");
        });
    });

    describe("DB - Delete's", () => {
        it("Delete data", async () => {
            const action = await Database.delete(_test_uid);
            deepStrictEqual(action.uid, _test_uid);
        });
    });
})