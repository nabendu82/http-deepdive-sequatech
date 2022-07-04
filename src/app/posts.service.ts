import { HttpClient } from "@angular/common/http";
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class PostsService {
    constructor(private http: HttpClient){}

    createAndStorePost(title: string, content: string) {
        const postData: Post = { title, content}
        this.http.post('https://angular-http-sequatech-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json', postData).subscribe(res => {
            console.log(postData);
        })
    }

    fetchPosts() {
        return this.http.get<{ [key: string]: Post }>('https://angular-http-sequatech-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
            .pipe(map(res => {
                const posts: Post[] = [];
                for (const key in res) {
                    posts.push({ ...res[key], id: key })
                }
                return posts;
            }))
    }

    deletePosts(){
        return this.http.delete('https://angular-http-sequatech-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json')
    }
}