import {Parts} from '../both/collections';
Meteor.methods({
    'insertMethod': function () {
        Parts.insert({
            'number': '1F8 007 560-211',
            'name': 'Headlight chrom',
            'producer': 'Clear Celis',
            'width': '232.5mm',
            'height': '224.4mm',
            'depth': '129.6mm',
            'vehicle': 'Volvo',
            'description': 'Height quality headlamp dedicated for Headlight.',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('1.jpg'))
        });
        Parts.insert({
            'number': '1F8 007 560-451',
            'name': 'Headlight LED Luminator',
            'producer': 'Clear Celis',
            'width': '232.5mm',
            'height': '224.4mm',
            'depth': '129.6mm',
            'vehicle': 'Volvo',
            'description': 'Height quality headlamp dedicated for Volvo trucks',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('2.jpg'))
        });
        Parts.insert({
            'number': '1F8 011 002-001',
            'name': 'Headlight LED Luminator',
            'producer': 'Hella',
            'width': '234.5mm',
            'height': '222.4mm',
            'depth': '129.6mm',
            'vehicle': 'Volvo',
            'description': 'Height quality headlamp dedicated for Volvo trucks',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('3.jpg'))
        });
        Parts.insert({
            'number': '1F8 009 797-101',
            'name': 'Headlight 323 FF-CLEAR',
            'producer': 'Trendy Rallye',
            'width': '235.5mm',
            'height': '224.4mm',
            'depth': '121.6mm',
            'vehicle': 'Renault',
            'description': 'Height quality headlamp dedicated for Renault',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('4.jpg'))
        });
        Parts.insert({
            'number': '1F8 009 797-101',
            'name': 'Headlight 3003 FF-CLEAR',
            'producer': 'Modern Light',
            'width': '232.5mm',
            'height': '115.4mm',
            'depth': '129.6mm',
            'vehicle': 'Renault',
            'description': 'Height quality headlamp dedicated for Renault',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('5.jpg'))
        });
    }
});
