import React, { useState, Text } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


import ZIMTHubSDK from '@zimt/sdk';

//0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567 private key

export async function getUser(text) {

    var publicKey = 0x66a269912194A15E12fF90b8fD790866b998d2eB;
    var privateKey = 0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567;
    var ZIMT_API_KEY = 0xAd828FA2C2cda69b45221191EE2108222b9D3E06;
    try {

        const sdk = new ZIMTHubSDK({
            api: {
                core: "https://hub.zi.mt",
            },
            privateKey: text,
            apiKey: "0xAd828FA2C2cda69b45221191EE2108222b9D3E06",
        });
        const result = sdk.accounts.me();
        console.log("Account" + result);
        return true;
    }
    catch (ex) {
        console.log(ex);
        return false;
    }
}


export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [privatekey, setPrivatekey] = useState("");

    let history = useHistory();


    function handleSubmit(event) {
        event.preventDefault();
    }

    async function handleClick() {
        var resp = await getUser(privatekey);
        if (resp === false) {
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

                <p> Or insert private key</p>
                <FormGroup >
                    <ControlLabel>Private key</ControlLabel>
                    <FormControl
                        value={privatekey}
                        onChange={e => setPrivatekey(e.target.value)}
                        type="privatekey"
                    />
                </FormGroup>
                <button block bsSize="large" type="submit" onClick={handleClick}>
                    Login
        </button>
                <button block bsSize="large" type="submit" onClick={goToSignup} >
                    Sign Up
        </button>
            </form>
        </div>
    );
}