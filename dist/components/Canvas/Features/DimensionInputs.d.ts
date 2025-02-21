import React from "react";
interface DimensionInputsProps {
    objectType: string;
    width: string;
    height: string;
    diameter: string;
    onWidthChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onHeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDiameterChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export declare const DimensionInputs: React.FC<DimensionInputsProps>;
export {};
