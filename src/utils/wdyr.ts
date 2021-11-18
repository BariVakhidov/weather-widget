import React from "react";
import whyDidYouRender from "@welldone-software/why-did-you-render";

const debugRender = true;
if (debugRender && process.env.NODE_ENV === "development") {
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        trackHooks: true,
    });
}