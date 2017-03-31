import template from "./MainMenuView.html";
import {VOICE_RECOGNITION} from '../../../api/VoiceRecoginition';
import '../../../css/animate.css';
class MainMenuView {
    constructor($scope, $reactive, $state) {
        $reactive(this).attach($scope);
        this.state = $state;
        this.helpers({
            impacterOutput() {
                return VOICE_RECOGNITION.getImpacterOutput();
            },
            possibleCommands() {
                return VOICE_RECOGNITION.getPossibleCommands();
            },
            impacterHint() {
                return VOICE_RECOGNITION.getImpacterHint();
            }
        });
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