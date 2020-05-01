import React, { useState, Component } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row, Text } from "react-bootstrap";
import { getData } from "./Login";
import { withRouter, Redirect, useHistory } from 'react-router-dom';


export async function getUser() {

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

    const result = await sdk.accounts.me();
    // console.log(JSON.stringify(result));

    return JSON.stringify(result.response.data.full_name);
}


export default function Dashboard() {


    //console.log(getUser());

    var user = getUser();
    console.log(user);

    let history = useHistory();


    async function handleClick() {
        history.push('/createoffer');
    }

    return (
        <div className="Dashboard">
            <Row>
                <p>Usernae</p>
                <button block bsSize="large" type="submit" onClick={handleClick}>
                    Add offer
                </button>
            </Row>

            <p> List of offers</p>

        </div>
    );
}



  //     //go to createNewOffer
    //     const sdk = new ZIMTHubSDK({
    //         api: {
    //             core: "https://hub.zi.mt",
    //         },
    //         privateKey: "0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567",
    //         apiKey: "0xAd828FA2C2cda69b45221191EE2108222b9D3E06",
    //     });

    //     try {








    //         const asd = sdk.accounts.generateObjectWithMeta(true);
    //         console.log(asd);

    //         const result = await sdk.organizations.createOrganizationAccount(
    //             '0x648d028283e36c058d0619f8592ddc271156b1f3efd80e04ee37c4b431b94349',
    //             {
    //                 "object": {
    //                     "meta": {
    //                         "created_by": "0x66a269912194A15E12fF90b8fD790866b998d2eB"
    //                     },
    //                     "signature": ""
    //                 },
    //                 "data": {
    //                     "full_name": "John Doe",
    //                     "email": "john@gmail.com",
    //                     "address": "0xb1088dc9f597F56dA34DF3a13B9db00393A7583c",
    //                     "security": {
    //                         "token": "a4123asuiasy4uay3iaisyu3oiasu3iaous34"
    //                     }
    //                 }
    //             }
    //         );

    //         console.log(result);
    //     } catch (ex) {
    //         console.log(ex);
    //     }


    //     // return JSON.stringify(result.response.data.full_name);
    //     // history.push('/createoffer');