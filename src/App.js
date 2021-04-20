import React, { Component } from "react";
import Axios from "axios";
import * as utils from "./utils";
import config from "./config.json";

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      purchaseOrders: [],
    };
  }

  async componentDidMount() {
    await this.loadPurchaseOrders();
  }

  loadPurchaseOrders = async () => {
    console.log("aşk");
    let purchaseOrders = await this.getPurchaseOrders();
    this.setState(
      {
        purchaseOrders: purchaseOrders,
      },
      () => console.log(this.state)
    );
  };

  getPurchaseOrders = async () => {
    let purchaseOrders;

    try {
      let response = await Axios.request(
        {
          method: utils.Constants.HttpMethods.GET,
          url: config.getPurchaseOrdersUrl,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": true,
            "Content-Type": "application/json",
          },
          proxy: { host: "https://firebasestorage.googleapis.com" },
        }
      );

      console.log(response);

      purchaseOrders =
        utils.checkAxiosResponseIsSuccessful(response) &&
        this.checkApiResponseStatusSuccessful(response)
          ? response.data["mvPurchaseOrders"]
          : [];
    } catch (err) {
      console.error(err);
      purchaseOrders = [];
    }

    return purchaseOrders;
  };

  checkApiResponseStatusSuccessful = (response) => {
    return response.data["ResponseStatus"]["ErrorCode"] === "0";
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="col-8 mx-auto">
            <div class="list-group">
              <a href="#" class="list-group-item list-group-item-action active">
                Purchase Orders
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                Dapibus ac facilisis in
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                Morbi leo risus
              </a>
              <a href="#" class="list-group-item list-group-item-action">
                Porta ac consectetur ac
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
