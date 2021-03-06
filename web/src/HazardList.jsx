import React from "react";
import { Link } from "react-router";
import { checkResponse, fetchAuthd } from "./lib";

export default class HazardList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hazards: []
    };
  }

  componentDidMount() {
    fetchAuthd(API_HOST + "/admin/hazards")
      .then(checkResponse)
      .then(response => response.json())
      .then(data => this.setState({ hazards: data.data }))
      .catch(error => console.error("request failed: %o", error));
  }

  render() {
    let hazardList = this.state.hazards.map((hazard) => {
      return (
        <tr key={`hazard-${hazard.id}`}>
          <td>
            <Link to={`/admin/hazards/${hazard.id}`}>
              {hazard.title}
            </Link>
          </td>
          <td>{hazard.created_at}</td>
        </tr>
      );
    });
    return (
      <section className="usa-grid usa-section">

        <div className="usa-width-one-whole">
          <h2>Alerts</h2>
          <div>
            <Link to="/admin/hazards/new" className="usa-button">
              Create an alert
            </Link>
          </div>
          <table className="usa-table-borderless">
            <tbody>
              {hazardList}
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
