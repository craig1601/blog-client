import React, { useContext, useState } from 'react';
import UserContext from '../../context/UserContext'
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

const Create = () => {

    const history = useHistory();

    const {userData} = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    // eslint-disable-next-line
    const [author, setAuthor] = useState(userData.user.userName);

    const createPost = async (event) => {
        event.preventDefault();
        // eslint-disable-next-line
        try{const postRes = await Axios.post("https://craig-blog-site.herokuapp.com/posts", {
            title,
            content,
            author
        });

        history.push('/');
    }
        catch(err){
            //err.response.data.msg && setError(err.response.data.msg)
        }
    }

    return(
        <div  className="create">
        <form onSubmit={createPost}>
        <div>
           <input type="text" placeholder="Title" onChange={e=>setTitle(e.target.value)} />
           </div> 
            <div>
            <textarea placeholder="Write what's on your mind..." onChange={e=>setContent(e.target.value)} />
            </div>
            <button type="submit">Submit</button>
        </form>
        
        </div>
    )
}

export default Create;