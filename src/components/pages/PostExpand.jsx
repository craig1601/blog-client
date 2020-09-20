import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import Axios from 'axios'

const PostExpand = () => {

    // eslint-disable-next-line
    const [postID, setPostID] = useState("");
    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        const renderPost = async () => {

            const search = queryString.parse(window.location.search);
             const findPost = await Axios.get("https://craig-blog-site.herokuapp.com/posts/"+search.id)
             setPostID(findPost.data.post._id);
             setAuthor(findPost.data.post.author);
             setTitle(findPost.data.post.title);
             setContent(findPost.data.post.content);

        }

        renderPost();
    },[])

    return(
<div>
    <div className="post-expand">
        <h1>{title}</h1>
        <h4>written by {author}</h4>
        <p>{content}</p>
    </div>
</div>
    )
}

export default PostExpand;