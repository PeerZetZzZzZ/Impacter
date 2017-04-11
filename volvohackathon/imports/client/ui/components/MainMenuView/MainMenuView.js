import template from "./MainMenuView.html";
import {VOICE_RECOGNITION} from '../../../api/VoiceRecoginition';
import {PARTS_CLIENT_API} from '../../../api/PartsClientApi';
import '../../../css/animate.css';
import '../../../css/global.css';
class MainMenuView {
    constructor($scope, $reactive, $state) {
        $reactive(this).attach($scope);
        this.state = $state;
        this.screenHeight = screen.height;
        this.helpers({
            impacterOutput() {
                return VOICE_RECOGNITION.getImpacterOutput();
            },
            possibleCommands() {
                return VOICE_RECOGNITION.getPossibleCommands();
            },
            impacterHint() {
                return VOICE_RECOGNITION.getImpacterHint();
            },
            partsFound() {
                return  VOICE_RECOGNITION.getPartsFound();
            },
            consideredPart() {
                return VOICE_RECOGNITION.getConsideredPart();
            },
            partsFoundCount() {
                let partsFound = VOICE_RECOGNITION.getPartsFound();
                if (Array.isArray(partsFound)) {
                    return partsFound.length;
                } else {
                    return partsFound.count();
                }
            },
            partsSearchQuery() {
                let a = PARTS_CLIENT_API.checkQuery();
                console.log(a);
                return a;
            }
        });
        // Meteor.call('insertMethod');
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