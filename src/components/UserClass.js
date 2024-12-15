import React from "react"

class UserClass extends React.Component{
    constructor(props){
        super(props); 
        this.state = {
          userInfo: {
            name:"Default" ,
            bio:"Default",
            avatar_url:"https://dummy.photo.com ",
          },
        };
    }
    async componentDidMount() {
        const data = await fetch("https://api.github.com/users/yashu3624");
        const json = await data.json();
        
        this.setState({
            userInfo: json ,
        });
        console.log(json);

    }
    render() {
       
        const {name,bio,avatar_url} = this.state.userInfo ;
        
        return (
            
            <div className="user-card m-4  bg-gray-50">
                <img src={avatar_url}/>
            <h2>Name:{name}</h2>
            <h3>BIO :{bio}</h3>
            
            <h4>Contact:@Yaswini_vali</h4>
        </div>
        );
    };
};
export default UserClass ; 
