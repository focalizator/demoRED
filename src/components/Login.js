import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel, Row } from "react-bootstrap";
import "./Login.css";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


import ZIMTHubSDK from '@zimt/sdk';

export async function getUser(text) {

    var publicKey = 0x66a269912194A15E12fF90b8fD790866b998d2eB;
    var privateKey = 0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567;
    var ZIMT_API_KEY = 0xAd828FA2C2cda69b45221191EE2108222b9D3E06;
    try {
        
        const sdk = new ZIMTHubSDK({
            api: {
                core: "https://hub.zi.mt",
            },
            privateKey: "0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567",
            apiKey: "0xAd828FA2C2cda69b45221191EE2108222b9D3E06",
        });

        

    }
    catch (ex) {
        console.log(ex);
    }
}


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    let history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    async function handleClick() {
        await getUser(password);
        if (localStorage.getItem('Authentication') === "") {
            console.log("Error login")
        } else {
            console.log("Success login");
            history.push('/dashboard');
        }
    }

    async function goToSignup() {
        history.push('/signup');
    }


    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />

                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                    />
                </FormGroup>
                <button block bsSize="large" disabled={!validateForm()} type="submit" onClick={handleClick}>
                    Login
        </button>
                <button block bsSize="large pl-2" type="submit" onClick={goToSignup} >
                    Sign Up
        </button>
            </form>
        </div>
    );
}