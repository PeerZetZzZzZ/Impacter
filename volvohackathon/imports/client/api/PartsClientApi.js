import {Parts} from '../../both/collections';
import {ReactiveVar} from 'meteor/reactive-var';
class PartsClientApi {
    constructor() {
        this.queryCreator = new ReactiveVar({});
    }

    setName(name) {
        let queryCreator = this.queryCreator.get();
        queryCreator.name = name;
        this.queryCreator.set(queryCreator);
    }

    setVehicle(vehicle) {
        let queryCreator = this.queryCreator.get();
        queryCreator.vehicle = vehicle;
        this.queryCreator.set(queryCreator);
    }

    clear() {
        this.queryCreator.set({});
    }

    /**
     * Accessable for Client to see how looks data to search
     */
    checkQuery() {
        return this.queryCreator.get();
    }

    searchPart() {
        let parts = Parts.find();
        // let parts = Parts.find(this.queryCreator.get());
        // this.queryCreator.set({});
        return parts;
    }

}
export let PARTS_CLIENT_API = new PartsClientApi();