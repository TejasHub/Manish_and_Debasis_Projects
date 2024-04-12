import { LightningElement, track, wire } from 'lwc';
import { fireEvent } from 'c/pubsub';
import { CurrentPageReference } from 'lightning/navigation';

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
            { label: 'All', value: 'All' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
        ];
    }

    get noOfBathRoomOptions() {
        return [
            { label: 'All', value: 'All' },
            { label: '1', value: '1' },
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' }
 
        ];
    }
    @wire(CurrentPageReference) pageRef;
    handleLocationChange(event){
        this.location = event.target.value;
        console.log('location selected as===>'+this.location);
        fireEvent(this.pageRef, "handleLocFilterChange",this.location);
    }
    handleBedRoomChange(event){
        this.noOfBedRoom = event.target.value;
        console.log('no of bedrooms selected===>'+this.noOfBedRoom);
        fireEvent(this.pageRef, "handelLocBedRommChange",this.noOfBedRoom);
    }
    handleBathRoomChange(event){
        this.noOfBathRoom = event.target.value;
        console.log('No of bathrooms selected===>'+this.noOfBathRoom);
        fireEvent(this.pageRef, "handelBathRoomFilterChange",this.noOfBathRoom);
    }
    handleBudgetChange(event){
        this.maxBudget = event.target.value;
        console.log('Max budget value===>'+this.maxBudget);
        fireEvent(this.pageRef, "handelBudgetFilterChange",this.maxBudget);
    }
}