import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import Axios from 'axios'
import Post from '../layout/Post'

const User = () => {

    const [posts,setPosts] = useState([]);

    useEffect(() => {
        const findPosts = async () => {

            const search = queryString.parse(window.location.search);
             const postRes = await Axios.get("https://craig-blog-site.herokuapp.com/posts/user/"+search.id)
             setPosts(postRes.data.posts);

        }

        findPosts();
    },[posts])

    return(
        <div className="user-posts">
            {posts.length === 0 ? <h1 className="welcome">You have no posts yet!</h1> : null}
            {posts.map((post) => <Post key={post._id} author={post.author} content={post.content} title={post.title} id={post._id} deleteButton={true} />)}
        </div>
    )
}

export default User;