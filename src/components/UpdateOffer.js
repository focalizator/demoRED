import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { getData } from "./Login";
import { withRouter, Redirect, useHistory } from 'react-router-dom';



export default class UpdateOffer extends Component {



    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            priceActive: "",
            category: "",
            valability: "",
            commision: "",
            overprice: "",
            paymentDate: "",


            gotData: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.createAssetAndEvent = this.createAssetAndEvent.bind(this);
    }


    async createAssetAndEvent() {

        // var publicKey = 0x66a269912194A15E12fF90b8fD790866b998d2eB;
        // var privateKey = 0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567;
        // var ApiKey = 0xAd828FA2C2cda69b45221191EE2108222b9D3E06;

        try {


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
                    "name": `${this.state.name}`,
                    "properties": {
                        "description": `${this.state.description}`,
                        "priceActive": `${this.state.priceActive}`,
                        "category": `${this.state.category}`,
                        "valability": `${this.state.valability}`,
                        "commision": `${this.state.commision}`,
                        "overprice": `${this.state.overprice}`,
                        "paymentDate": `${this.state.paymentDate}`
                    },
                }
            );
            console.log("EVENT  " + JSON.stringify(event));
            const created = await sdk.events.createEvent(`${event.meta.asset_id}`, JSON.stringify(event));
            console.log(created);
        } catch (ex) {
            console.log(ex);
        }
    }

    async  handleClick() {
        await this.createAssetAndEvent(this.state.name, this.state.description, this.state.priceActive, this.state.category, this.state.valability,
            this.state.commision, this.state.overprice, this.state.paymentDate);
        this.props.history.push('/dashboard');
    }


    render() {


        return (
            <div className="Dashboard">
                <Row>
                    <p>Update oferta</p>
                </Row>

                <FormGroup bsSize="large">
                    <FormGroup controlId="name">
                        <ControlLabel>Nume oferta </ControlLabel>
                        <FormControl
                            value={this.state.name}
                            onChange={e => this.setState({
                                name: e
                            })}
                        />
                    </FormGroup>
                    <FormGroup controlId="description">
                        <ControlLabel>Descriere </ControlLabel>
                        <FormControl
                            value={this.state.description}
                            onChange={e => this.setState({
                                description: e
                            })}
                        />
                    </FormGroup>
                    <ControlLabel controlId="priceActive">Pret energia active, fara alte componente (taxe) lei/mw</ControlLabel>
                    <FormControl
                        value={this.state.priceActive}
                        onChange={e => this.setState({
                            priceActive: e
                        })}
                    />

                </FormGroup>
                <FormGroup>
                    <ControlLabel>Categorie consumator</ControlLabel>
                    <FormControl
                        value={this.state.category}
                        onChange={e => this.setState({
                            category: e
                        })}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Valabilite (luni)</ControlLabel>
                    <FormControl
                        value={this.state.valability}
                        onChange={e => this.setState({
                            valability: e
                        })}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Comision in lei/MW </ControlLabel>
                    <FormControl
                        value={this.state.commision}
                        onChange={e => this.setState({
                            commision: e
                        })}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Overprice</ControlLabel>
                    <FormControl
                        value={this.state.overprice}
                        onChange={e => this.setState({
                            overprice: e
                        })}
                    />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Termen de plata</ControlLabel>
                    <FormControl
                        value={this.state.paymentDate}
                        onChange={e => this.setState({
                            paymentDate: e
                        })}
                    />
                </FormGroup>
                <button block bsSize="large" type="submit" onClick={this.handleClick}>
                    Create offer
            </button>
            </div>
        );
    }
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