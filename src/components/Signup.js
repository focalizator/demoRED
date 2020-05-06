import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { getData } from "./Login";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


export async function createUser(organization, name, email, password) {


    try {
        
        const sdk = new ZIMTHubSDK({
            api: {
                core: "https://hub.zi.mt",
            },
            privateKey: "0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567",
            apiKey: "0xAd828FA2C2cda69b45221191EE2108222b9D3E06",
        });

        const checkifaccountexists = await sdk.accounts.exists({ address: "0x627969CD9Ef88bA7e61694947020540d7eD0001d", email: email })
        var accountexist = JSON.stringify(checkifaccountexists.response);


        if (accountexist === "false") {
            console.log(organization, name, email, password);
            var create = await sdk.organizations.create({
                "organization": {
                    "name": organization
                },
                "account": {
                    "full_name": name,
                    "email": email,
                    "address": "0xAB1e383FBb525ABFB380e1999B16b6d5cD2BAd58",
                    "security": {
                        "token": password
                    }
                }
            });
            console.log(create);
            return true;
        } else {
            return false;
        }


    } catch (ex) {
        console.log(ex);
    }
}


export default function Signup() {


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [organization, setOrganization] = useState("");
    const [name, setName] = useState("");

    let history = useHistory();

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
    }

    async function handleClick() {
        var orgCreation = await createUser(organization, name, email, password);
        console.log(orgCreation);
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="organization" bsSize="large">
                    <ControlLabel>Organization</ControlLabel>
                    <FormControl
                        autoFocus
                        type="organization"
                        value={organization}
                        onChange={e => setOrganization(e.target.value)}
                    />

                </FormGroup>
                <FormGroup controlId="name" bsSize="large">
                    <ControlLabel>Name</ControlLabel>
                    <FormControl
                        autoFocus
                        type="name"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />

                </FormGroup>
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