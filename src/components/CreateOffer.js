import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { getData } from "./Login";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


export async function createAssetAndEvent() {

    // var publicKey = 0x66a269912194A15E12fF90b8fD790866b998d2eB;
    // var privateKey = 0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567;
    // var ApiKey = 0xAd828FA2C2cda69b45221191EE2108222b9D3E06;

    const sdk = new ZIMTHubSDK({
        api: {
            core: "https://hub.zi.mt",
        },
        privateKey: "0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567",
        apiKey: "0xAd828FA2C2cda69b45221191EE2108222b9D3E06",
    });


    const result = await sdk.assets.create(sdk.assets.generateAsset());
    console.log(`${result.response.id}`);
    const event = await sdk.events.generateEvent(`${result.response.id}`,
        {
            "type": "info",
            "name": "Info event",
        }
    );
    console.log("EVENT  " + JSON.stringify(event));
    const created = await sdk.events.createEvent(`${event.meta.asset_id}`, JSON.stringify(event));
    console.log(created);
}


export default function Dashboard() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleClick() {

    }

    return (
        <div className="Dashboard">
            <Row>
                <p>Create new offer</p>
            </Row>
            <FormGroup  bsSize="large">
                    <ControlLabel>Pret energia active, fara alte componente (taxe)</ControlLabel>
                    <FormControl
                    />

                </FormGroup>
                <FormGroup>
                    <ControlLabel>Categorie consumator</ControlLabel>
                    <FormControl
                        
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Valabilite</ControlLabel>
                    <FormControl
                        
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Comision in lei/MW </ControlLabel>
                    <FormControl
                        
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Overprice</ControlLabel>
                    <FormControl
                        
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Termen de plata</ControlLabel>
                    <FormControl
                        
                    />
                </FormGroup>
            <button block bsSize="large" type="submit" onClick={handleClick}>
                Create offer
            </button>
        </div>
    );
}


/*

Pretz energia active, fara alte componente (taxe), poate sa fie:
Categorie de consumator
Valabilite in timp
Comisoane de signup si continuitate, one off & lei / mwh
Overprice, 50% 50% la agent
Termen de plata
Mai multe variante (avans, monthly)
Portal online, etc. clientu poate sa
Description & name
Preview offering
Publish offering

*/