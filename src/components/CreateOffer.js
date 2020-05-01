import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { getData } from "./Login";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


export async function createAssetAndEvent(name, description, priceActive, category, valability, commision, overprice, paymentDate) {

    // var publicKey = 0x66a269912194A15E12fF90b8fD790866b998d2eB;
    // var privateKey = 0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567;
    // var ApiKey = 0xAd828FA2C2cda69b45221191EE2108222b9D3E06;

    try{

    
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
        "name": `${name}`,
        "properties": {
            "description": `${description}`,
            "priceActive": `${priceActive}`,
            "category": `${category}`,
            "valability": `${valability}`,
            "commision": `${commision}`,
            "overprice": `${overprice}`,
            "paymentDate": `${paymentDate}`
        },
    }
    );
    console.log("EVENT  " + JSON.stringify(event));
    const created = await sdk.events.createEvent(`${event.meta.asset_id}`, JSON.stringify(event));
    console.log(created);
    }catch(ex){
        console.log(ex);
    }
}


export default function Dashboard() {

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [priceActive, setPriceActive] = useState("");
    const [category, setCategory] = useState("");
    const [valability, setValability] = useState("");
    const [commision, setCommision] = useState("");
    const [overprice, setOverprice] = useState("");
    const [paymentDate, setPaymentDate] = useState("");




    let history = useHistory();

    async function handleClick() {
        await createAssetAndEvent(name, description, priceActive, category, valability, commision, overprice, paymentDate);
        history.push('/dashboard');
    }

    return (
        <div className="Dashboard">
            <Row>
                <p>Oferta noua</p>
            </Row>
            <FormGroup bsSize="large">
                <FormGroup controlId="name">
                    <ControlLabel>Nume oferta </ControlLabel>
                    <FormControl
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                </FormGroup>
                <FormGroup controlId="description">
                    <ControlLabel>Descriere </ControlLabel>
                    <FormControl
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                </FormGroup>
                <ControlLabel controlId="priceActive">Pret energia active, fara alte componente (taxe) lei/mw</ControlLabel>
                <FormControl
                    value={priceActive}
                    onChange={e => setPriceActive(e.target.value)}
                />

            </FormGroup>
            <FormGroup>
                <ControlLabel>Categorie consumator</ControlLabel>
                <FormControl
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Valabilite (luni)</ControlLabel>
                <FormControl
                    value={valability}
                    onChange={e => setValability(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Comision in lei/MW </ControlLabel>
                <FormControl
                    value={commision}
                    onChange={e => setCommision(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Overprice</ControlLabel>
                <FormControl
                    value={overprice}
                    onChange={e => setOverprice(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Termen de plata</ControlLabel>
                <FormControl
                    value={paymentDate}
                    onChange={e => setPaymentDate(e.target.value)}
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