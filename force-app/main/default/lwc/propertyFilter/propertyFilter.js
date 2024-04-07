import { LightningElement, track } from 'lwc';

export default class PropertyFilter extends LightningElement {
    @track location;
    @track noOfBedRoom;
    @track noOfBathRoom;
    @track maxBudget;

    get locationOptions(){
        return [
            { label: 'All', value: 'All' },
            { label: 'Bangalore', value: 'Bangalore' },
            { label: 'Mumbai', value: 'Mumbai' },
            { label: 'Hyderabad', value: 'Hyderabad' },
            { label: 'Chennai', value: 'Chennai' },
            { label: 'Bhubaneswar', value: 'Bhubaneswar' },
        ];
    }

    get noOfBedRoomOptions(){
        return [
            { label: 'Any', value: 'Any' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
        ];
    }

    get noOfBathRoomOptions() {
        return [
            { label: 'Any', value: 'Any' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' }
 
        ];
    }
}