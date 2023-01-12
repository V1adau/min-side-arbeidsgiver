import {BodyShort, Button, Checkbox, Label} from "@navikt/ds-react";
import {Hovedenhet as HovedenhetIkon} from "../Virksomhetsikoner/Virksomhetsikoner";
import {Collapse, Expand} from "@navikt/ds-icons";
import React from "react";
import "./HovedenhetCheckbox.css";
import {Hovedenhet} from "./Virksomhetsmeny";

export const HovedenhetCheckbox = ({
                                       hovedenhet,
                                       erÅpen,
                                       toggleÅpen,
                                       children
                                   }: { hovedenhet: Hovedenhet, erÅpen: boolean, toggleÅpen: () => void, children: React.ReactNode }) => {
    const visFlere = hovedenhet.underenheter.some(u => u.søkMatch)
    return <>
        <div className="hovedenhet_container">
            <div className="hovedenhet">
                <Checkbox
                    value={hovedenhet.OrganizationNumber}
                    id={`${hovedenhet.OrganizationNumber}_Virksomhetsmeny_checkbox`}
                    key={`${hovedenhet.OrganizationNumber}_Virksomhetsmeny_list_key`}
                    style={{display: "flex", alignItems: "center"}}
                >
                </Checkbox>
                <label
                    className="hovedenhet_innhold"
                    htmlFor={`${hovedenhet.OrganizationNumber}_Virksomhetsmeny_checkbox`}
                >
                    <HovedenhetIkon/>
                    <div>
                        <Label size="medium" as="span">{hovedenhet.Name}</Label>
                        <BodyShort size="small">Org. nr. {hovedenhet.OrganizationNumber}</BodyShort>
                        <BodyShort size="small">{hovedenhet.underenheter.length} virksomheter</BodyShort>
                    </div>
                </label>

            </div>
            {
                visFlere ? <Button
                        variant="tertiary"
                        style={{width: "100%"}}
                        onClick={() => {
                            toggleÅpen()
                        }}
                        className="hovedenhet_vis-skjul-container"
                    >
                        <BodyShort
                            size="small"
                            className="hovedenhet_vis-skjul"
                        >{erÅpen ? <Collapse/> : <Expand/>} {erÅpen ? "skjul" : "vis"} virksomheter</BodyShort>
                    </Button>
                    : null
            }
        </div>
        {erÅpen ? children : null}
    </>
}