import React, { FunctionComponent, useContext, useState } from "react";

import "./Hovedside.less";
import ArbeidsgiverTelefon from "./ArbeidsgiverTelefon/ArbeidsgiverTelefon";
import KontaktOss from "./KontaktOss/KontaktOss";
import AltinnBoks from "./AltinnBoks/AltinnBoks";
import Pamboks from "./Pamboks/Pamboks";
import Syfoboks from "./Syfoboks/Syfoboks";
import { OrganisasjonsDetaljerContext } from "../../OrganisasjonDetaljerProvider";
import { SyfoTilgangContext } from "../../SyfoTilgangProvider";

const Hovedside: FunctionComponent = () => {
  const { tilgangTilSyfo } = useContext(SyfoTilgangContext);
  const riktigRolleAltinn = true;
  const { tilgangTilPam } = useContext(OrganisasjonsDetaljerContext);

  return (
    <div className="forside">
      <div className={"forside__tjenestebokser"}>
        {tilgangTilSyfo && <Syfoboks />}
        {tilgangTilPam && <Pamboks />}
        <ArbeidsgiverTelefon />
        <KontaktOss />
        <AltinnBoks riktigRolle={riktigRolleAltinn} />
      </div>
    </div>
  );
};

export default Hovedside;
