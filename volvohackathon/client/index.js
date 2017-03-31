import angular from 'angular';
import angularMeteor from 'angular-meteor';
import {name as Volvohackathon} from '../imports/client/ui/components/volvohackathon/volvohackathon';
angular.module('volvohackathonapp', [
    angularMeteor,
    Volvohackathon
]);
