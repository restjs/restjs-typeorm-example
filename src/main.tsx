import React from 'react';
import {Application} from '@restjs/core';
import {createConnection, Connection} from "typeorm";
import PostEntity from "./entities/PostEntity";
import PostRouter from "./PostRouter";

/**
 * ::: Notice :::
 * This example only show how to work with databases and validation system.
 * In the real world you should specify an authentication middle-ware to handle the user's posts.
 * We will discuss the authentication on the next session.
 */

createConnection({
    /// In this example we used MySQL database, you can use every database that is supported by TypeORM.
    type : "mysql",
    database : "rest", /// Your database's name
    username : "root", /// Your database's username
    password : "",     /// Your database's password
    entities : [PostEntity], /// Load the entities here, that you'll use it into your project.
    synchronize : true, /// This option is used to automatically generate the tables into the database.
}).then((connection : Connection)=>{

    const app : React.ReactElement = (
        <Application
            onListen={()=>{
                console.log('Rest-JS app is running on : http://localhost:3000');
            }}
            database={connection}
        >
            {PostRouter}
        </Application>
    )

    Application.run(app);


}).catch((error=>{
    /// Handle the error on connecting to database.
    throw new Error(error);
}))
