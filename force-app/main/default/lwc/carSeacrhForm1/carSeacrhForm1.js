import { LightningElement, track, wire } from 'lwc';
//Import the method mentioned of getCarTypes from server using Apex Class
import getCarTypes from '@salesforce/apex/CarSearchFormController.getCarTypes';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';

export default class CarSeacrhForm1 extends NavigationMixin(LightningElement) {
    //Create a carTypes property. Here carTypes prop is a List 
    @track carTypes;
    
    //Wire this getCarTypes adapter
    @wire(getCarTypes)
    //Assigning wired results to one function called wiredCarType
    wiredCarType({data,error}){
        if(data){ 
            /*Here carType should be of type Label & Value becoz the Combobox accepts
            only Label & Value pairs but from server we are getting an array of Id and Name*/
            //Modify the array to accept all types of arrays into list
            this.carTypes = [{value:'',label:'All Types'}];
            data.forEach(element => {
                //create a new carType object assign it to carTypes array
                const carType = {};
                carType.label = element.Name;
                carType.value = element.Id;
                this.carTypes.push(carType);
            });
        }
        else if(error){
            this.showToast('ERROR',error.body.message,'error');
        }
    }

    carTypeChangeHandler(event){
        const carTypeId = event.detail.value;
        const carTypeSelectionChangeEvent = new CustomEvent('cartypeselect',{detail:carTypeId});
        this.dispatchEvent(carTypeSelectionChangeEvent);
    }

    createNewCarType(){
        this[NavigationMixin.Navigate]({
            type:'standard__objectPage',
            attributes:{
                objectApiName: 'Car_Type__c',
                actionName: 'new'
            }
        })
    }

    showToast(title, message, variant){
        const evt = new ShowToastEvent({
            title:title,
            message:message,
            variant: variant,
        })
        this.dispatchEvent(evt);
    }
}