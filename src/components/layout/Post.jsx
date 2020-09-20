import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Post = (props) => {

    const handleDelete = async() => {
       const postID = props.id;
        await Axios.delete("https://craig-blog-site.herokuapp.com/posts/"+postID);
    }

    return(
        <div className="post-outer">
            <div className="post-inner">
                <h3 className='post-title'>{props.title}</h3>
                <p className='author'>written by {props.author}</p>
                <p className='post-content'>{props.content.substring(0,250) + " ..."}
                <Link to={"/posts?id="+props.id}>
                <button>Read more</button>
                </Link></p>
                {props.deleteButton ? <div className="delete-btn"><button onClick={handleDelete} className="error-message">Delete</button></div> : null}
            </div>
            
        </div>
    )
}

export default Post;