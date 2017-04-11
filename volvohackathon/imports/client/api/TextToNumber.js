class TextToNumber {
    constructor() {
        this.a;
        this.n;
        this.g;
        this.Small = {
            'zero': 0,
            'one': 1,
            'two': 2,
            'three': 3,
            'four': 4,
            'five': 5,
            'six': 6,
            'seven': 7,
            'eight': 8,
            'nine': 9,
            'ten': 10,
            'eleven': 11,
            'twelve': 12,
            'thirteen': 13,
            'fourteen': 14,
            'fifteen': 15,
            'sixteen': 16,
            'seventeen': 17,
            'eighteen': 18,
            'nineteen': 19,
            'twenty': 20,
            'thirty': 30,
            'forty': 40,
            'fifty': 50,
            'sixty': 60,
            'seventy': 70,
            'eighty': 80,
            'ninety': 90
        };

        this.Magnitude = {
            'thousand': 1000,
            'million': 1000000,
            'billion': 1000000000,
            'trillion': 1000000000000,
            'quadrillion': 1000000000000000,
            'quintillion': 1000000000000000000,
            'sextillion': 1000000000000000000000,
            'septillion': 1000000000000000000000000,
            'octillion': 1000000000000000000000000000,
            'nonillion': 1000000000000000000000000000000,
            'decillion': 1000000000000000000000000000000000,
        };

    }


    feach(w) {
        console.log(TEXT_TO_NUMBER.Small);
        var x = TEXT_TO_NUMBER.Small[w];
        if (x != null) {
            TEXT_TO_NUMBER.g = TEXT_TO_NUMBER.g + x;
        }
        else if (w == "hundred") {
            TEXT_TO_NUMBER.g = TEXT_TO_NUMBER.g * 100;
        }
        else {
            x = TEXT_TO_NUMBER.Magnitude[w];
            if (x != null) {
                TEXT_TO_NUMBER.n = TEXT_TO_NUMBER.n + TEXT_TO_NUMBER.g * x;
                TEXT_TO_NUMBER.g = 0;
            }
            else {
                alert("Unknown number: " + w);
            }
        }
    }

    text2num(s) {
        TEXT_TO_NUMBER.a = s.toString().split(/[\s-]+/);
        TEXT_TO_NUMBER.n = 0;
        TEXT_TO_NUMBER.g = 0;
        TEXT_TO_NUMBER.a.forEach(TEXT_TO_NUMBER.feach);
        return TEXT_TO_NUMBER.n + TEXT_TO_NUMBER.g;
    }
}
export let TEXT_TO_NUMBER = new TextToNumber();