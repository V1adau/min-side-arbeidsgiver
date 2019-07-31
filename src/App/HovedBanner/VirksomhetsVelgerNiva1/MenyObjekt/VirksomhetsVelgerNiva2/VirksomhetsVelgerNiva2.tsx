import React, { FunctionComponent, useState } from "react";
import "./VirksomhetsVelgerNiva2.less";
import { Collapse } from "react-collapse";
import { withRouter, RouteComponentProps } from "react-router";
import { NedChevron, OppChevron } from "nav-frontend-chevron";
import { WrapperState } from "react-aria-menubutton";
import MenyObjektNiva2 from "./MenyObjektNiva2/MenyObjektNiva2";
import {
  Organisasjon,
  OverenhetOrganisasjon
} from "../../../../../Objekter/organisasjon";

const AriaMenuButton = require("react-aria-menubutton");

interface Props {
  className?: string;
  hovedOrganisasjon: OverenhetOrganisasjon;
}

const AndreNivaDropDown: FunctionComponent<
  Props & RouteComponentProps<{ className: string }>
> = props => {
  const settUrl = (orgnr: string) => {
    props.history.push("/" + orgnr);
  };

  const [erApen, setErApen] = useState(false);

  const OrganisasjonsMenyKomponenter = props.hovedOrganisasjon.UnderOrganisasjoner.map(
    function(organisasjon: Organisasjon) {
      return <MenyObjektNiva2 UnderEnhet={organisasjon} />;
    }
  );

  return (
    <div className="virksomhets-velger-niva-2">
      <AriaMenuButton.Wrapper
        className="virksomhets-velger-niva-2__wrapper"
        onSelection={(value: string) => settUrl(value)}
        closeOnSelection={false}
        onMenuToggle={(erApen: WrapperState) => {
          setErApen(erApen.isOpen);
          if (props.hovedOrganisasjon.overordnetOrg.Type !== "Enterprise") {
            settUrl(props.hovedOrganisasjon.overordnetOrg.OrganizationNumber);
          }
        }}
      >
        <AriaMenuButton.Button
          className={"virksomhets-velger-niva-2__nedre-button"}
        >
          {!erApen && (
            <>
              <NedChevron className="virksomhets-velger-niva-2__nedre-button-chevron" />
              Vis {props.hovedOrganisasjon.UnderOrganisasjoner.length}{" "}
              underenheter
            </>
          )}
          {erApen && (
            <>
              <OppChevron className="virksomhets-velger-niva-2__nedre-button-chevron" />
              Skjul {props.hovedOrganisasjon.UnderOrganisasjoner.length}{" "}
              underenheter
            </>
          )}
        </AriaMenuButton.Button>

        <div className="virksomhets-velger-niva-2__meny-wrapper">
          <Collapse isOpened={true || false}>
            <AriaMenuButton.Menu className={"virksomhets-velger-niva-2"}>
              {OrganisasjonsMenyKomponenter}
            </AriaMenuButton.Menu>
          </Collapse>
        </div>
      </AriaMenuButton.Wrapper>
    </div>
  );
};

export default withRouter(AndreNivaDropDown);
