import { LightningElement, api } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export default class FeedbackEnquiry extends LightningElement {
    @api objectApiName;
    @api propertyId;

    onSuccess(event){
        this.showToast('Feedback submitted','Success','Success');
    }

    showToast(title,message,variant){
        const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant,
        })
        this.dispatchEvent(evt);
    }
}