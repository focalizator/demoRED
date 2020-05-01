import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


export async function getUser() {

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

        const result = await sdk.accounts.me();
        // console.log(JSON.stringify(result));

        return JSON.stringify(result.response.data.full_name);
    } catch (ex) {

    }
}

export async function getData() {

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

        const result = await sdk.assets.getMany();
        var assets = JSON.parse(JSON.stringify(result));
        let assetList = []
        for (let i = 0; i < assets.response.length; i++) {
            assetList[i] = assets.response[i].id;
        }
        var eventList = []
        for await (var item of assetList) {
            eventList.push(await sdk.assets.get(item, { info: true }));
        }
        //  console.log(eventList);
        var eventValues = []
        for (let i = 0; i < eventList.length; i++) {
            eventValues.push(eventList[i].response.info);
        }

        return eventValues;
    } catch (ex) {

    }
}


export default function Dashboard() {

    const [user, setUser] = useState("");
    const [eventList, setEventList] = useState("");

    var eventData = [];

    async function initData() {
        setUser(await getUser());
        setEventList(JSON.stringify(await getData()));
        console.log(JSON.stringify(eventList));
    }
    initData();

    let history = useHistory();
    async function handleClick() {
        history.push('/createoffer');
    }

    return (
        <div className="Dashboard">
            <Row>
                <p>{user}</p>
                <button block bsSize="large" type="submit" onClick={handleClick}>
                    Create new offer
                </button>
            </Row>

            <h2> List of offers</h2>
            <div>
                {eventList}
            </div>
        </div>
    );
}