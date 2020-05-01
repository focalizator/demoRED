import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { getData } from "./Login";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


export async function createUser(email, password) {


    try {

        const sdk = new ZIMTHubSDK({
            api: {
                core: "https://hub.zi.mt",
            },
            privateKey: "0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567",
            apiKey: "0xAd828FA2C2cda69b45221191EE2108222b9D3E06",
        });

        const organization_id = await sdk.organizations.me();
        console.log(JSON.stringify(organization_id));


        const signMeta = sdk.accounts.generateObjectWithMeta(true);
        var signature = await sdk.hub.sign({ prop: 12312312 });


        var CryptoJS = require("crypto-js");
        var ciphertext = CryptoJS.AES.encrypt("0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567", "asdasdasd");

        const newaddress = sdk.accounts.generateObjectWithMeta(true);
        console.log(newaddress.signature);

        console.log(ciphertext.toString());
        const userRequest = await sdk.organizations.createOrganizationAccount(`${organization_id.response.id}`,

            {
                "object": {
                    "meta": {
                        "created_by": `0x66a269912194A15E12fF90b8fD790866b998d2eB`
                    },
                    "signature": `${newaddress.signature}`
                },
                "data": {
                    "full_name": "asd",
                    "email": "asd@gmail.com",
                    "address": `${newaddress}`,
                    "security": {
                        "token": `${ciphertext}`
                    }
                }
            }

        );

        console.log(userRequest);

    } catch (ex) {
        console.log(ex);
    }
}


export default function Signup() {


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
        createUser("email", "");
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

                <button block bsSize="large pl-2" type="submit" onClick={handleClick} >
                    Create account
        </button>
            </form>
        </div>
    );
}