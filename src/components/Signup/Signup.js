import React from 'react';

class Signup extends React.Component {
    constructor() {
        super();
        this.state = {
            signUpEmail: '',
            signUpPassword: '',
            signUpName: ''
        }
    }
    onNameChange = (event) => {
            this.setState({signUpName: event.target.value})
        };
    onEmailChange = (event) => {
            this.setState({signUpEmail: event.target.value})
        };
    onPasswordChange = (event) => {
            this.setState({signUpPassword: event.target.value})
        }
    onSubmitSignin = () => {
        fetch('http://localhost:3000/signup',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signUpEmail,
                password: this.state.signUpPassword,
                name: this.state.signUpName,
            })
        })
            .then(res => res.json())
            .then(user => {
                if (user === 'success'){
                    this.props.loadUser(user);
                    this.props.onRouteChange('home');
                }
            })
        }
    render() {
        const {onRouteChange} = this.props
        return(
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
            <main className="pa4 black-80">
                <form className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign Up</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="text" name="name" id="name" onChange={this.onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="email" name="email-address" id="email-address" onChange={this.onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                   type="password" name="password" id="password" onChange={this.onPasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input onClick={this.onSubmitSignin}
                               className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                               type="submit" value="Sign up" />
                    </div>
                </form>
            </main>
        </article>
    )}
};

export default Signup;