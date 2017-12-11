import {AuthorizeStep} from "aurelia-auth";

export class App {
  constructor() {
    this.message = 'Hello World!';
  }
  configureRouter(config, router) {
    this.router = router;
    config.addPipelineStep("authorize", AuthorizeStep);
    config.map([
      {
        "route": ["", "home"],
        "moduleId": "./modules/home",
        "name": "Home"
      },
      {
        "route": "List",
        "moduleId": "./modules/list",
        "name": "List",
        "auth": true
      }
    ]);
  }
}
