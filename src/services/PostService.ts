import {InjectRepository} from "@restjs/core";
import {Repository, UpdateResult} from "typeorm";
import PostEntity from "../entities/PostEntity";
import UpdatePostDto from "../dto/UpdatePostDto";
import CreatePostDto from "../dto/CreatePostDto";

export default class PostService {
    @InjectRepository(PostEntity)
    postRepository : Repository<PostEntity>;

    async create(post : CreatePostDto) : Promise<PostEntity>{
        const createdPost : PostEntity = this.postRepository.create(post);
        await createdPost.save(); /// Saving the created post into the database.
        return createdPost;
    }

    update(postId : number, post : UpdatePostDto) : Promise<UpdateResult>{
        return this.postRepository.update(postId, post);
    }

    getAll() : Promise<PostEntity[]>{
        return this.postRepository.find();
    }

    publishedPosts() : Promise<PostEntity[]>{
        return this.postRepository.find({where : {isPublished : true}});
    }
}
