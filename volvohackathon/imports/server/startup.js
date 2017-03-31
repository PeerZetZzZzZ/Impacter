import {Parts} from '../both/collections';
Meteor.methods({
    'insertMethod': function () {
        Parts.insert({
            'number': '1F8 007 560-211',
            'name': 'Headlamp chrom',
            'producer': 'Clear Celis',
            'width': '232.5mm',
            'height': '224.4mm',
            'depth': '129.6mm',
            'vehicle': 'Volvo',
            'description': 'Height quality headlamp dedicated for Volvo trucks',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('1.jpg'))
        });
        Parts.insert({
            'number': '1F8 007 560-451',
            'name': 'Headlamp LED Luminator',
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
            'name': 'Headlamp LED Luminator',
            'producer': 'Hella',
            'width': '232.5mm',
            'height': '224.4mm',
            'depth': '129.6mm',
            'vehicle': 'Volvo',
            'description': 'Height quality headlamp dedicated for Volvo trucks',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('3.jpg'))
        });
        Parts.insert({
            'number': '1F8 009 797-101',
            'name': '3003 FF-CLEAR',
            'producer': 'Trendy Rallye',
            'width': '232.5mm',
            'height': '224.4mm',
            'depth': '129.6mm',
            'vehicle': 'Renault',
            'description': 'Height quality headlamp dedicated for Renault',
            'pictureData': 'data:image/png;base64, ' + Base64.encode(Assets.getBinary('4.jpg'))
        });
    }
});
