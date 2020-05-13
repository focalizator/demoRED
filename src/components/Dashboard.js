import React, { useState, Component, ListItem, Text } from "react";
import "./Dashboard.css";
import ZIMTHubSDK from '@zimt/sdk';
import { Button, FormGroup, FormControl, ControlLabel, Row } from "react-bootstrap";
import { withRouter, Redirect, useHistory } from 'react-router-dom';






export default class Dashboard extends Component {


    constructor(props) {
        super(props);

        this.state = {
            user: "",
            eventList: undefined,
            gotData: false,
        }

        this.handleClick = this.handleClick.bind(this);
        this.renderData = this.renderData.bind(this);
        this.getData = this.getData.bind(this);
        this.getUser = this.getUser.bind(this);
        this.goToEditPage = this.goToEditPage.bind(this);
        this.deteleItem = this.deteleItem.bind(this);
    }
    async getUser() {

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
            console.log(ex);
        }
    }

    async  getData() {

        // var publicKey = 0x66a269912194A15E12fF90b8fD790866b998d2eB;
        // var privateKey = 0xa627c0fa6983c9e09d8694405ade16671951c2f0dcd498071a161787aeea3567;
        // var ApiKey = 0xAd828FA2C2cda69b45221191EE2108222b9D3E06;

    }

    async componentDidMount() {



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
            var zeventValues = []
            for (let i = 0; i < eventList.length; i++) {
                zeventValues.push(eventList[i].response.info);
            }


            var finalEvents = [];

            for (var i = 0; i < zeventValues.length; i++) {
                if (zeventValues[i].receipt !== undefined) {
                    finalEvents.push(zeventValues[i]);
                }
            }

            console.log(finalEvents);

            this.setState({
                user: await this.getUser(),
                eventList: finalEvents,
                gotData: true,
            })
        } catch (ex) {
            console.log(ex);
        }
    }




    renderData() {
        console.log("ASDASDASDSA " + this.state.eventList.length);

        var listItems = [];
        for (var i = 0; i < this.state.eventList.length; i++) {
            if (this.state.eventList[i] !== "") {
                listItems.push(<p> {this.state.eventList[i]}</p>)
            }
        }


        return listItems;
        // return (<div>{listItems}</div>)
    }

    goToEditPage(asset, eventid) {
        this.props.history.push('/updateoffer', { asset, eventid });
    }




    handleClick() {
        this.props.history.push('/createoffer');
    }

    deteleItem() {
        console.log(
            "delete"
        )
    }

    render() {




        return (
            <div className="Dashboard">
                <Row>
                    <p>{this.state.user}</p>
                    <button block bsSize="large" type="submit" onClick={this.handleClick}>
                        Create new offer
                </button>
                </Row>

                <h2> List of offers</h2>
                <div>
                    {this.state.gotData === false ? <p>No Data</p> :

                        this.state.eventList.map(item =>


                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: 20 }}


                            >
                                <div style={{
                                    width: 250,
                                    height: 100,
                                    background: "linear-gradient(6.74deg, #6DB483 0%, #A6CE48 96.52%)",
                                }}>
                                    <p onClick={(e) => {
                                        this.goToEditPage(item.meta.asset_id, item.id);
                                    }}> {item.data.name}</p>

                                    <p style={{ color: 'red', paddingTop: 15 }} onClick={(e) => {
                                        this.deteleItem();
                                    }}> DELETE</p>
                                </div>


                            </div>

                        )
                    }
                </div>
            </div>
        )
    };
}


//