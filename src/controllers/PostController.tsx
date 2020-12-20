import {Inject} from "@restjs/core";
import PostService from "../services/PostService";
import PostEntity from "../entities/PostEntity";
import {UpdateResult} from "typeorm";

export default class PostController{
    @Inject()
    postService : PostService;

    /**
     * REST-JS supports promises.
     * So every method can return a promise and REST-JS will resolve it and then responds.
     */
    create(req) : Promise<PostEntity>{
        /**
         * req.body is validated by class-validator and also transformed by class-transformer.
         * So we can use req.body without worrying about that because it's validated by the DTO (Data transfer object).
         */
        return this.postService.create(req.body);
    }

    /// When we update some entity, TypeORM will return an instance of UpdateResult.
    update(req) : Promise<UpdateResult>{

        /// First we extract the id of the dto and the other Post's data properties.
        const {id, ...postData} = req.body;

        return this.postService.update(id, postData);
    }

    /// You can also use async/await syntax.
    async allPosts() : Promise<PostEntity[]>{
        return await this.postService.getAll();
    }

    publishedPosts() : Promise<PostEntity[]>{
        return this.postService.publishedPosts();
    }

}
