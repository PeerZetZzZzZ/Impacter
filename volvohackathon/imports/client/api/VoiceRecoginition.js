import {ReactiveVar} from 'meteor/reactive-var';
import {PARTS_CLIENT_API} from './PartsClientApi';
class VoiceRecognition {
    constructor() {
        this.assumedPart = new ReactiveVar('');
        this.impacterOutput = new ReactiveVar("Tell me something");
        this.impacterHint = new ReactiveVar("");
        this.possibleCommands = new ReactiveVar([]);
        this.partsFound = new ReactiveVar([]);
        let that = this;
        this.annyang = annyang;
        let commands = {
            "I have problem": that.iHaveProblem,
            "Broken parts": that.brokenParts,
            "part :part": that.problemWithPart,
            'Help': that.help,
            'Quit': that.quit
        };
        this.annyang.addCommands(commands);
        this.annyang.start();
    }

    getImpacterOutput() {
        return this.impacterOutput.get();
    }

    getImpacterHint() {
        return this.impacterHint.get();
    }

    getPossibleCommands() {
        return this.possibleCommands.get();
    }

    getPartsFound() {
        return this.partsFound.get();
    }


    iHaveProblem() {
        VOICE_RECOGNITION.impacterOutput.set("What is your problem?");
        VOICE_RECOGNITION.possibleCommands.set(['BROKEN PARTS']);
    }

    brokenParts() {
        VOICE_RECOGNITION.impacterOutput.set("Call the part please, like 'part ...'!)");
        VOICE_RECOGNITION.possibleCommands.set([]);
        VOICE_RECOGNITION.impacterHint.set('Call the part');
    }

    problemWithPart(part) {
        VOICE_RECOGNITION.impacterOutput.set("Did you said '" + part + "'? If yes, say again 'part " + part + "'. " +
            "I know it's boring but I need to be sure!");
        VOICE_RECOGNITION.impacterHint.set("Please say again 'part " + part + "' loudly :) Or just 'quit'.");
        VOICE_RECOGNITION.assumedPart.set(part);
        VOICE_RECOGNITION.annyang.removeCommands('part :part');
        VOICE_RECOGNITION.annyang.addCommands({'part :part': VOICE_RECOGNITION.confirmProblemWithPart});
    }

    confirmProblemWithPart(part) {
        if (VOICE_RECOGNITION.assumedPart.get() === '') {
            VOICE_RECOGNITION.assumedPart.set(part);
        } else if (VOICE_RECOGNITION.assumedPart.get() === part) {
            VOICE_RECOGNITION.impacterOutput.set("Great! So we talk about '" + part + "'. Tell me more about it");
            VOICE_RECOGNITION.possibleCommands.set(['VEHCILE BRAND', 'CLEAR', 'QUIT']);
            VOICE_RECOGNITION.annyang.addCommands({
                'Vehicle brand :brand': function (brand) {
                    PARTS_CLIENT_API.setVehicle(brand);
                }
            });
            VOICE_RECOGNITION.annyang.addCommands({
                'Clear': function () {
                    PARTS_CLIENT_API.clear();
                }
            });
            PARTS_CLIENT_API.setName(part);
        } else {
            VOICE_RECOGNITION.impacterOutput.set("Previously you said '" + VOICE_RECOGNITION.assumedPart.get() + "' and now you said '" + part + "'." +
                "I am completly lost, please try again.");
            VOICE_RECOGNITION.assumedPart.set('');
            annyang.addCommands({'part :part': VOICE_RECOGNITION.problemWithPart});
        }
    }

    help() {
        VOICE_RECOGNITION.impacterOutput.set("Hey right now I don't have many functions. But here are commands you can use!");
        VOICE_RECOGNITION.possibleCommands.set(['Broken parts']);
        VOICE_RECOGNITION.impacterHint.set('');
    }

    quit() {
        VOICE_RECOGNITION.impacterOutput.set("Tell me something");
        VOICE_RECOGNITION.possibleCommands.set([]);
        VOICE_RECOGNITION.impacterHint.set('');
        VOICE_RECOGNITION.annyang.removeCommands('part :part');
        VOICE_RECOGNITION.annyang.removeCommands('Vehicle brand :brand');
        VOICE_RECOGNITION.annyang.removeCommands('Clear');
        PARTS_CLIENT_API.clear();
        VOICE_RECOGNITION.annyang.addCommands({'part :part': VOICE_RECOGNITION.problemWithPart});
    }

    /**
     * Public
     */
    getConsideredPart() {
        return VOICE_RECOGNITION.assumedPart.get();
    }

}
export let VOICE_RECOGNITION = new VoiceRecognition();
