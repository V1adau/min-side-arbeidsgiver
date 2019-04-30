import React, {FunctionComponent, useEffect} from "react";
import syfoikon from "./syfoikon.svg";
import { syfoLink } from "../../../lenker";
import Undertittel from "nav-frontend-typografi/lib/undertittel";
import { Normaltekst } from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import Innholdsboks from "../Innholdsboks/Innholdsboks";
import "./Syfoboks.less";

interface Props {
  varseltekst?: string;
}

const Syfoboks: FunctionComponent<Props> = props => {

  return (
    <Innholdsboks className={"syfoboks"}>
      <img className={"syfoboks__icon"} src={syfoikon} />
      <div className={"syfoboks__tekst"}>
        <Undertittel className={"syfoboks__header"}>
          Dine sykemeldte
        </Undertittel>
        {props.varseltekst}
        <Lenke href={syfoLink()}>Gå til dine sykemeldte</Lenke>
      </div>
    </Innholdsboks>
  );
};

export default Syfoboks;
