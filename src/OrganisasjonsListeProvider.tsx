import React, { Component } from "react";
import { Organisasjon } from "./organisasjon";
import { hentOrganisasjoner } from "./api/dnaApi";

export interface Context {
  organisasjoner: Array<Organisasjon>;
}

interface State {
  organisasjoner: Array<Organisasjon>;
}

const OrganisasjonsListeContext = React.createContext<Context>({} as Context);
export { OrganisasjonsListeContext };

export class OrganisasjonsListeProvider extends Component<{}, State> {
  state: State = {
    organisasjoner: []
  };

  async componentDidMount() {
    let organisasjoner = await hentOrganisasjoner();
    this.setState({ organisasjoner });
  }

  render() {
    const context: Context = {
      ...this.state
    };

    return (
      <OrganisasjonsListeContext.Provider value={context}>
        {this.props.children}
      </OrganisasjonsListeContext.Provider>
    );
  }
}