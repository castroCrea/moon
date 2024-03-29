"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoonPlugin = void 0;
// import type fs from 'fs'
// import type path from 'path'
__exportStar(require("./FetchContext.type"), exports);
__exportStar(require("./Fn.type"), exports);
__exportStar(require("./params"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./editor.type"), exports);
class MoonPlugin {
    /**
     * constructor - Create a new instance of the plugin
     *
     * @param settings - The settings of the plugin
     */
    constructor(props) {
        /**
         * name - The name of the plugin
         */
        this.name = 'Plugin name';
        /**
         * logo - The logo of the plugin
         */
        this.logo = 'https://www.image.so/images/favicon.ico';
        /**
         * Describe the settings for the plugin that will appears in the settings modal
         *
         * example
         * {
         *   token: {
         *      type: 'string',
         *      required: true,
         *      label: 'Token',
         *      description: 'The Notion token_v2 cookie value. See <a href="https://developers.notion.com/reference/get-started#authentication" target="_blank">Notion API docs</a> *      for more information.'
         *   },
         * },
         */
        this.settingsDescription = {};
        /**
         * settings - The settings of the plugin
         */
        this.settings = {};
        if (props == null)
            return;
        if (props.settings)
            this.settings = props.settings;
        this.helpers = props.helpers;
    }
}
exports.MoonPlugin = MoonPlugin;
//# sourceMappingURL=index.js.map