import React, {Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SeeFood from './components/SeeFood/SeeFood';
import Signin from "./components/Signin/Signin";
import Signup from "./components/Signup/Signup";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
    apiKey: 'ebe32db18a2844cfab3d790a8f8c8746'
});

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            imageUrl: '',
            route: 'signin',
            isSignedIn: false,
            user: {
                id: '',
                name: '',
                email: '',
                entries: 0,
                joined: ''
            }
        }
    }

    loadUser = (data) => {
        this.setState({data: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
    }

    displayFoodList = (apiOutput) => {
        const FoodList = apiOutput
        document.getElementById('foodList').innerText
            = `Food     Probability\n
               ${FoodList[0].name}  ${FoodList[0].value}\n
               ${FoodList[1].name}  ${FoodList[1].value}\n
               ${FoodList[2].name}  ${FoodList[2].value}\n
               ${FoodList[3].name}  ${FoodList[3].value}\n
               ${FoodList[4].name}  ${FoodList[4].value}`
}

    onRouteChange = (route) => {
        if (route === 'signout'){
            this.setState({isSignedIn: false})
        } else if (route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }

    onInputChange = (event) =>{
        this.setState({input:event.target.value});
    }

    onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FOOD_MODEL,
        this.state.input
      )
      .then(response => {
          if (response){
              fetch('http://localhost:3000/image', {
                  method: 'put',
                  headers: {'Content-Type': 'application/json'},
                  body: JSON.stringify({
                      id: this.state.user.id
                  })
              })    .then(res => res.json())
                    .then(count =>{
                      this.setState(Object.assign(this.state.user, {entries: count}))
                  })
              }
          })
          this.displayFoodList(response.outputs[0].data.concepts)
        console.log(
          response.outputs[0].data.concepts
        );
      })
      .catch((err) => {
        console.log(err);
      })
    }

    render(){
        return (
            <div className="App">
                <Particles className='particles'
                params={{particles:{number:50,density:{enable:true,value_area:800}}}} />

                <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
                {this.state.route === 'home'
                    ? <div>
                        <Logo />
                        <Rank />
                        <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
                        <SeeFood imageUrl={this.state.imageUrl}/>
                     </div>
                    : (
                        this.state.route === 'signin'
                            ? <div>
                                <Logo />
                                <Signin onRouteChange={this.onRouteChange}/>
                              </div>
                            : <div>
                                <Logo />
                                <Signup loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                              </div>
                    )
                }
            </div>
  );}

}

export default App;
