import {Parts} from '../../both/collections';
import {ReactiveVar} from 'meteor/reactive-var';
class PartsClientApi {
    constructor() {
        this.query = {};
        this.queryCreator = new ReactiveVar({});
    }

    setName(name) {
        let formattedName = name.charAt(0).toUpperCase() + name.slice(1);
        let queryCreator = this.queryCreator.get();
        queryCreator.name = formattedName;
        this.query.name = {'$regex': formattedName};
        this.queryCreator.set(queryCreator);
    }

    setVehicle(vehicle) {
        let formattedVehicle = vehicle.charAt(0).toUpperCase() + vehicle.slice(1);
        let queryCreator = this.queryCreator.get();
        queryCreator.vehicle = formattedVehicle;
        this.query.vehicle = {'$regex': formattedVehicle};
        this.queryCreator.set(queryCreator);
    }

    clear() {
        let name = this.queryCreator.get().name;
        this.queryCreator.set({'name': name});
        this.query = {'name': {'$regex': name}};
    }

    clearCompletly() {
        this.queryCreator.set({});
        this.query = {};
    }


    /**
     * Accessable for Client to see how looks data to search
     */
    checkQuery() {
        return this.queryCreator.get();
    }

    searchParts() {
        console.log(this.query);
        return Parts.find(this.query);
    }

}
export let PARTS_CLIENT_API = new PartsClientApi();