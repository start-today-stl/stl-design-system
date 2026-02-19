export declare const stlPreset: {
    theme: {
        extend: {
            colors: {
                primary: {
                    foreground: "#ffffff";
                    500: "#002084";
                    400: "#1770ff";
                    300: "#78b2ff";
                    200: "#c4e2fa";
                    100: "#e7f2fa";
                    DEFAULT: "#1770ff";
                };
                danger: {
                    foreground: "#ffffff";
                    500: "#4a0f1a";
                    400: "#9e2f22";
                    300: "#eb3e3a";
                    200: "#ffb1a8";
                    100: "#fbe0dd";
                    DEFAULT: "#eb3e3a";
                };
                gray: {
                    readonly 950: "#000000";
                    readonly 900: "#1a1a1a";
                    readonly 800: "#333333";
                    readonly 700: "#4d4d4d";
                    readonly 600: "#666666";
                    readonly 500: "#808080";
                    readonly 400: "#999999";
                    readonly 300: "#b3b3b3";
                    readonly 200: "#cccccc";
                    readonly 100: "#e6e6e6";
                    readonly 50: "#f5f5f5";
                };
                semantic: {
                    readonly 500: "#094b2a";
                    readonly 400: "#0e794c";
                    readonly 300: "#0fbd00";
                    readonly 200: "#85e97c";
                    readonly 100: "#d6ffb2";
                    readonly DEFAULT: "#0fbd00";
                };
                background: string;
                foreground: string;
                secondary: {
                    DEFAULT: string;
                    foreground: string;
                };
                muted: {
                    DEFAULT: string;
                    foreground: string;
                };
                accent: {
                    DEFAULT: string;
                    foreground: string;
                };
                destructive: {
                    DEFAULT: "#eb3e3a";
                    foreground: "#ffffff";
                };
                border: string;
                input: string;
                ring: string;
                white: "#ffffff";
                black: "#000000";
            };
            borderRadius: {
                sm: "0.25rem";
                md: "0.375rem";
                lg: "0.5rem";
                xl: "0.75rem";
            };
            fontFamily: {
                sans: string[];
                'stl-gothic': string[];
            };
            fontSize: {
                xs: (string | {
                    lineHeight: string;
                    letterSpacing: string;
                })[];
                sm: (string | {
                    lineHeight: string;
                    letterSpacing: string;
                })[];
            };
        };
    };
};
export default stlPreset;
