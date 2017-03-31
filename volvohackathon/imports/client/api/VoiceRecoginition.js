import {ReactiveVar} from 'meteor/reactive-var';
class VoiceRecognition {
    constructor() {
        this.assumedPart = '';
        this.impacterOutput = new ReactiveVar("Tell me something");
        this.impacterHint = new ReactiveVar("");
        this.possibleCommands = new ReactiveVar([]);
        let that = this;
        let commands = {
            "I have problem": that.iHaveProblem,
            "Broken parts": that.brokenParts,
            "part :part": that.problemWithPart,
            ":anything": that.confirmProblemWithPart,
        };
        annyang.addCommands(commands);
        annyang.start();

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


    iHaveProblem() {
        VOICE_RECOGNITION.impacterOutput.set("What is your problem?");
        VOICE_RECOGNITION.possibleCommands.set(['Broken parts', 'Start again', 'No problem']);
    }

    brokenParts() {
        VOICE_RECOGNITION.impacterOutput.set("Call the part please, like 'part ...'!)");
        VOICE_RECOGNITION.possibleCommands.set([]);
        VOICE_RECOGNITION.impacterHint.set('Call the part');
    }

    problemWithPart(part) {
        VOICE_RECOGNITION.impacterOutput.set("Did you said '" + part + "'? If yes, say again 'part " + part + "'. " +
            "I know it's boring but I need to be sure!");
        VOICE_RECOGNITION.impacterHint.set("Please say again 'part" + part + "' loudly :) ");
        annyang
    }

    confirmProblemWithPart(part) {
        VOICE_RECOGNITION.impacterOutput.set("Hey right now I don't have many functions. But here are commands you can use!");
        VOICE_RECOGNITION.possibleCommands.set(['Broken parts']);
    }

}
export let VOICE_RECOGNITION = new VoiceRecognition();
