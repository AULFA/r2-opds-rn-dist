import { IWithAdditionalJSON, JsonMap } from "r2-lcp-rn/dist/es8-es2017/src/serializable";
import { OPDSAuthenticationLabels } from "./opds2-authentication-labels";
import { OPDSLink } from "./opds2-link";
export declare class OPDSAuthentication implements IWithAdditionalJSON {
    Type: string;
    Links: OPDSLink[];
    Labels: OPDSAuthenticationLabels;
    AdditionalJSON: JsonMap;
    protected _OnDeserialized(): void;
}
