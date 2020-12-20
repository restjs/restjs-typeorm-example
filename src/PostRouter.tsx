import React from "react";
import {Get, Patch, Put, Router} from "@restjs/core";
import PostController from "./controllers/PostController";
import CreatePostDto from "./dto/CreatePostDto";
import UpdatePostDto from "./dto/UpdatePostDto";
import PostService from "./services/PostService";

export default (
    <Router
        path="post"
        controller={PostController}
        services={[PostService]}
    >

        <Get handle="allPosts"/>

        <Get path="published" handle="publishedPosts"/>

        <Put
            handle="create"
            validate={{
                /// Setting CreatePostDto for body property of every request object.
                body : CreatePostDto,

                /**
                 * `whitelist` and `forbidNonWhitelisted` are the `class-validator` options .
                 * More information at :
                 * https://github.com/typestack/class-validator
                 */
                whitelist : true,
                forbidNonWhitelisted : true,

                /**
                 * the transform property is used to transform strings to its dto type.
                 * Such as id property, id should be an integer.
                 * `class-transformer` package will transform plain simple object data to a class.
                 * Refer to class transformer documentation for more information :
                 * https://github.com/typestack/class-transformer
                 */
                transform : { enableImplicitConversion : true }
            }}
        />

        <Patch
            handle="update"
            validate={{
                body : UpdatePostDto,
                whitelist : true,
                forbidNonWhitelisted : true,
                transform : { enableImplicitConversion : true }
            }}
        />
    </Router>
)
