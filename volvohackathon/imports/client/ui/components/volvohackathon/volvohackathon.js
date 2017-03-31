import angular from "angular";
import angularMeteor from 'angular-meteor';
import uiRouter from "angular-ui-router";
import ngSanitize from "angular-sanitize";
import ngAnimate from "angular-animate";
import template from "./volvohackathon.html";
import {name as MainMenuView} from "../MainMenuView/MainMenuView";
class Volvohackathon {

    constructor($scope, $rootScope, $state, $reactive) {
        let reactiveContext = $reactive(this).attach($scope);
        this.state = $state;
        var commands = {
            'hello': function () {
                console.log('mam to ');
                alert('Hello world!');
            }
        };

// Add our commands to annyang
        annyang.addCommands(commands);

// Start listening.
        annyang.start();
    }
}

const name = 'volvohackathon';

export default angular.module(name, [
    angularMeteor,
    ngSanitize,
    ngAnimate,
    uiRouter,
    MainMenuView,
]).component(name, {
    template,
    controllerAs: name,
    controller: Volvohackathon
}).config(config);

function config($locationProvider, $urlRouterProvider, $stateProvider) {
    'ngInject';
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider
        .state('MainMenuView', {
            url: '/MainMenuView',
            templateUrl: '../MainMenuView/MainMenuView.html',
            template: '<main-menu-view></main-menu-view>'

        });
}


function onReady() {
    angular.bootstrap(document, ['volvohackathonapp']);
}

if (Meteor.isCordova) {
    angular.element(document).on("deviceready", onReady);
} else {
    angular.element(document).ready(onReady);
}