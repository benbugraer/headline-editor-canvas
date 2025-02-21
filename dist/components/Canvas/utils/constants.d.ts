export declare const HEADLINE_SIZES: {
    readonly square: {
        readonly label: "Kare Manşet";
        readonly width: 547;
        readonly height: 574;
    };
    readonly wide: {
        readonly label: "Geniş Manşet";
        readonly width: 979;
        readonly height: 550;
    };
    readonly default: {
        readonly label: "Varsayılan(20'lik Manşet)";
        readonly width: 868;
        readonly height: 488;
    };
};
export declare const CANVAS_DEFAULT_CONFIG: {
    readonly width: 868;
    readonly height: 488;
    readonly backgroundColor: "#fff";
};
export declare const SNAPPING_CONFIG: {
    readonly snappingDistance: 10;
};
export declare const GUIDELINE_STYLES: {
    readonly stroke: "blue";
    readonly strokeWidth: 1;
    readonly selectable: false;
    readonly evented: false;
    readonly strokeDashArray: number[];
    readonly opacity: 0.8;
};
export declare const LAYER_ACTIONS: readonly [{
    readonly action: "up";
    readonly icon: import("react-icons").IconType;
    readonly label: "Up";
}, {
    readonly action: "down";
    readonly icon: import("react-icons").IconType;
    readonly label: "Down";
}, {
    readonly action: "top";
    readonly icon: import("react-icons").IconType;
    readonly label: "To forward";
}, {
    readonly action: "bottom";
    readonly icon: import("react-icons").IconType;
    readonly label: "To bottom";
}];
export declare const ALIGN_ACTIONS: readonly [{
    readonly align: "left";
    readonly icon: import("react-icons").IconType;
}, {
    readonly align: "center";
    readonly icon: import("react-icons").IconType;
}, {
    readonly align: "right";
    readonly icon: import("react-icons").IconType;
}, {
    readonly align: "top";
    readonly icon: import("react-icons").IconType;
}, {
    readonly align: "middle";
    readonly icon: import("react-icons").IconType;
}, {
    readonly align: "bottom";
    readonly icon: import("react-icons").IconType;
}];
