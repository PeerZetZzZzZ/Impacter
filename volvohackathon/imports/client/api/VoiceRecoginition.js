import {ReactiveVar} from 'meteor/reactive-var';
import {PARTS_CLIENT_API} from './PartsClientApi';
import {TEXT_TO_NUMBER} from './TextToNumber';
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
            "Part :part": that.problemWithPart,
            'Help': that.help,
            'Quit': that.quit,
            'Scroll :index': that.scroll,
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
        console.log('i have problem');
        VOICE_RECOGNITION.impacterOutput.set("What is your problem?");
        VOICE_RECOGNITION.possibleCommands.set(['BROKEN PARTS']);
    }

    brokenParts() {
        console.log('broken parts');
        VOICE_RECOGNITION.impacterOutput.set("Call the part please!");
        VOICE_RECOGNITION.possibleCommands.set([]);
        VOICE_RECOGNITION.impacterHint.set("Name the broken part. Say 'part ...'");
    }

    problemWithPart(part) {
        console.log('problem with part');
        console.log(part);
        VOICE_RECOGNITION.impacterOutput.set("Did you said '" + part + "'? If yes, say again 'part " + part + "'. " +
            "I know it's boring but I need to be sure!");
        VOICE_RECOGNITION.impacterHint.set("Please say again 'part " + part + "' loudly :) Or just 'quit'.");
        VOICE_RECOGNITION.assumedPart.set(part);
        VOICE_RECOGNITION.annyang.removeCommands('Part :part');
        VOICE_RECOGNITION.annyang.addCommands({'Part :part': VOICE_RECOGNITION.confirmProblemWithPart});
        console.log('dodalem');
    }

    confirmProblemWithPart(part) {
        console.log('confirm prblem with part');
        if (VOICE_RECOGNITION.assumedPart.get() === '') {
            VOICE_RECOGNITION.assumedPart.set(part);
        } else if (VOICE_RECOGNITION.assumedPart.get() === part) {
            VOICE_RECOGNITION.impacterOutput.set("Great! So we talk about '" + part + "'. Tell me more about it");
            VOICE_RECOGNITION.impacterHint.set("Provide more specified details and say 'search' when you are ready.");
            VOICE_RECOGNITION.possibleCommands.set(['VEHICLE BRAND ...', 'SEARCH', 'CLEAR', 'QUIT', ]);
            VOICE_RECOGNITION.annyang.addCommands({
                'Vehicle brand :brand': function (brand) {
                    console.log('vehicle brand');
                    PARTS_CLIENT_API.setVehicle(brand);
                }
            });
            VOICE_RECOGNITION.annyang.addCommands({
                'Clear': function () {
                    console.log('vehicle clear');
                    VOICE_RECOGNITION.impacterHint.set('');
                    PARTS_CLIENT_API.clear();
                    VOICE_RECOGNITION.partsFound.set([]);
                }
            });
            VOICE_RECOGNITION.annyang.addCommands({
                'Search': function () {
                    console.log('vehicle search');
                    let partsFound = PARTS_CLIENT_API.searchParts();
                    if (Array.isArray(partsFound)) {
                        VOICE_RECOGNITION.impacterHint.set("There are " + partsFound.length + "  results found.");
                    } else {
                        VOICE_RECOGNITION.impacterHint.set("There are " + partsFound.count() + " results found.");
                    }
                    VOICE_RECOGNITION.partsFound.set(partsFound);
                }
            });
            PARTS_CLIENT_API.setName(part);
        } else {
            console.log(' i am completly lost: remove part :part');
            VOICE_RECOGNITION.impacterOutput.set("Previously you said '" + VOICE_RECOGNITION.assumedPart.get() + "' and now you said '" + part + "'." +
                " I am completly lost, please try again.");
            VOICE_RECOGNITION.impacterHint.set("Choose again.");
            VOICE_RECOGNITION.possibleCommands.set(['BROKEN PARTS', 'QUIT']);
            VOICE_RECOGNITION.assumedPart.set('');
            annyang.removeCommands('Part :part');
            annyang.addCommands({'Part :part': VOICE_RECOGNITION.problemWithPart});
        }
    }

    help() {
        console.log('help');
        VOICE_RECOGNITION.impacterOutput.set("Hey right now I don't have many functions. But here are commands you can use!");
        VOICE_RECOGNITION.possibleCommands.set(['BROKEN PARTS']);
        VOICE_RECOGNITION.impacterHint.set('');
    }

    quit() {
        console.log('quit');
        VOICE_RECOGNITION.impacterOutput.set("Tell me something");
        VOICE_RECOGNITION.possibleCommands.set([]);
        VOICE_RECOGNITION.impacterHint.set('');

        VOICE_RECOGNITION.annyang.removeCommands('Part :part');
        VOICE_RECOGNITION.annyang.removeCommands('Vehicle brand :brand');
        VOICE_RECOGNITION.annyang.removeCommands('Clear');
        VOICE_RECOGNITION.annyang.addCommands({'Part :part': VOICE_RECOGNITION.problemWithPart});

        PARTS_CLIENT_API.clearCompletly();
        VOICE_RECOGNITION.partsFound.set([]);
    }

    /**
     * Public
     */
    getConsideredPart() {
        return VOICE_RECOGNITION.assumedPart.get();
    }

    scroll(index) {
        window.location.hash = index;
    }

}
export let VOICE_RECOGNITION = new VoiceRecognition();
