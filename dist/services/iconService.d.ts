import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
export interface IconResult {
    id: string;
    icon: IconDefinition;
    type: "solid" | "brand";
}
export declare const searchIcons: (query: string) => IconResult[];
