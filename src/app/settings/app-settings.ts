export class AppSettings {
    public APIURLHost = "http://easyfis-demo.hi-api.io/api";

    constructor() {
        let hostName = window.location.hostname;

        switch (hostName) {
            case "localhost":
                // this.APIURLHost = "http://easyfis-firstbay.hi-api.io";
                // this.APIURLHost = "http://easyfis-demo.hi-api.io";
                this.APIURLHost = "http://easyfis-demo.hi-api.io";
                // this.APIURLHost = "http://localhost:51111";
                // this.APIURLHost = "http://easyfis-api-enriseglobal.hiro-test.net";
                // this.APIURLHost = "http://easyfis-api.hiro-test.net";
                break;
            case "easyfis-ui.hiro-test.net":
                this.APIURLHost = "http://easyfis-api.hiro-test.net";
                break;
            default:
                break;
        }
    }
}