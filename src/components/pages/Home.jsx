import React, { useContext, useState, useEffect } from 'react';
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import Post from '../layout/Post';

const Home = () => {

    
    const {userData} = useContext(UserContext);
    const history = useHistory();

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        

        const getPosts = async () => {
        
            const postRes = await Axios.get("https://craig-blog-site.herokuapp.com/posts");
            setPosts(postRes.data.posts);
            console.log(userData);
        }       
        getPosts();
        
    },[userData]);

    const newPost = () => {
        if(userData.token)
        {
            history.push('/create')
        }
        else{
            history.push('/login')
        }
        
    }


    return(
        <div>
            { userData.user ? <div  className="welcome"><h1>Welcome {userData.user.userName}</h1>
                                <h2>Anything on your mind today?</h2>
                                <button onClick={newPost}>+</button>
                                </div> 
                     : <div className="welcome">
                        <h1>Write what's on your mind.</h1>
                        <button onClick={newPost}>+</button>
                        </div>}

            {posts.map((post) => <Post key={post._id} author={post.author} content={post.content} title={post.title} id={post._id} deleteButton={false} />)}

        </div>
    )
}

export default Home;