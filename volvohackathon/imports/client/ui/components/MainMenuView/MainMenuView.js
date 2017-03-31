import template from "./MainMenuView.html";

class MainMenuView {
    constructor($scope, $reactive, $state) {
        $reactive(this).attach($scope);
        this.state = $state;
    }
}
const name = 'mainMenuView';
export default angular.module(name, []).component(name, {
    template,
    controllerAs: name,
    controller: MainMenuView
}).config(config);

function config() {
}