import { LightningElement, track, wire } from 'lwc';
import getLatestProperty from '@salesforce/apex/PropertyDetails.getLatestProperty';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class MyPropertyResult extends LightningElement {

    @track properties;
    @track propertiesFound;
    @track feedbackPropId;
    @track propOwnerId;
    @track propOwnerDetails= false;
    @track openFeedbackDetails = false;
      
   
    @wire(getLatestProperty)
    wiredProperties({data,error}){
        if(data){
            this.properties = data;
            //this.propertiesFound = true;
        }
        else if(error){
            this.showToast('Error',error.body.message,'error');
           // this.propertiesFound = false;
        }
    }
    propertiesFound(){
        if(this.properties){
            return true;
        }
        return false;
    }
    
    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title: title,
            message:message,
            variant:variant,
        });  
        this.dispatchEvent(evt);  
    }
    ownerDetailsClick(event){
        this.propOwnerId = event.target.value;
        this.propOwnerDetails = true;
    }
    closeOwnerModal(){
        this.propOwnerDetails = false;
    }
    feedbackClicked(event){
        this.openFeedbackDetails = true;
        this.feedbackPropId = event.target.value;
    }
    closeFeedbackModal(){
        this.openFeedbackDetails = false;
    }
}
    