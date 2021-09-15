import React, { Component } from "react";
import axios from "axios";
import { Table, Button } from "react-bootstrap";
import App1 from "./modal.js";
class CRUD extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            id: "",
            name: "",
            avatar: "",
            createdAt: ""
        }
    }

    componentDidMount = () => this.getPosts();

    getPosts = async () => {
        const response = await axios.get("https://60e3ea516c365a0017839417.mockapi.io/users");
        this.setState({
            posts: response.data
        })
        console.log(response.data);
    }


    deletePost = async (eId) => {
        try {
            await axios.delete(`https://60e3ea516c365a0017839417.mockapi.io/users/${eId}`);
            let posts = [...this.state.posts];
            posts = posts.filter((e) => e.id !== eId);
            this.setState({
                posts
            });
        } catch (err) {
            console.log(err);
        }

    }

    createPost = async () => {
              
        const { data } = await axios.post("https://60e3ea516c365a0017839417.mockapi.io/users",
            {
                name: this.state.name,
                avatar: this.state.avatar,
                createdAt: this.state.createdAt,
            });
        const posts = [...this.state.posts];
        posts.push(data);
        this.setState({
            posts: posts,
            name: "",
            avatar: "",
            createdAt: "",
        })

    }

    updatePost = async () => {
        
        try {
          const { id, name, avatar, createdAt, posts } = this.state;
          const { data } = await axios.put(`https://60e3ea516c365a0017839417.mockapi.io/users/${id}`, {
            name,
            avatar,
            createdAt,
          });
          const index = posts.findIndex((e) => e.id === id);
          posts[index] = data;
    
          this.setState({ posts, id: "", name: "", avatar: "", createdAt: "" });
        } catch (err) {
          console.log(err);
        }
      };

      selectPost = (e) => {
        this.setState({
            id:e.id,
            name: e.name,
            avatar: e.avatar,
            createdAt: e.createdAt,
        })
}

    handleChange = ({ target: { name, value } }) => {
        this.setState({ [name]: value });
    }

    handleSubmit = (e) =>{
    e.preventDefault();
    if(this.state.id){
        this.updatePost();
    }else{
    this.createPost();
    }

    }

    render() {
        return (
            <>
            <div className="class">
            
                <h4>To Add a User :</h4>
            
            <form onSubmit={this.handleSubmit}>
                    <div><b> Enter a Name</b> </div>
                    <input type="text" name="name" value={this.state.name}  onChange={this.handleChange}/>
                    <div><b>Enter a Avatar Url</b></div>
                    <input type="url" name="avatar" src={this.state.avatar} onChange={this.handleChange}/>
                    <div><b>Enter a valid Date</b></div>
                   <p> <input type="datetime-local" name="createdAt" value={this.state.createdAt} onChange={this.handleChange} /></p>
                    <p><input type="Submit" /></p>
                </form>
                </div> 
               
                <Table striped bordered hover variant="dark">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Avatar</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((e) => {
                            return (
                                <tr key={e.id}>
                                    <td>{e.id}</td>
                                    <td>{e.name}</td>
                                    <td><img src={e.avatar} style={{ width: "100px", height: "100px" }} ></img></td>
                                    <td>{e.createdAt}</td>
                                   <td><p> <Button  style={{ color:"white"}}   onClick={() => { this.deletePost(e.id) }}>Delete</Button></p>
                                   <p> <Button onClick={() => { this.selectPost(e) }}>Edit User</Button></p></td>
                                </tr>

                            );
                        })}


                    </tbody>
                </Table>
                
            </>
        );
    }
}
export default CRUD;