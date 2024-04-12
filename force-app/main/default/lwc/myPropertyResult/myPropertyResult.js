import { LightningElement, track, wire } from 'lwc';
import getLatestProperty from '@salesforce/apex/PropertyDetails.getLatestProperty';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import { CurrentPageReference } from 'lightning/navigation';
import getSearchedProperty from '@salesforce/apex/PropertyDetails.getSearchedProperty';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { NavigationMixin } from 'lightning/navigation';

export default class MyPropertyResult extends NavigationMixin(LightningElement) {

    @track properties;
    @track propertiesFound;
    @track propOwnerId;
    @track feedbackPropId;
    @track propOwnerDetails= false;
    @track openFeedbackDetails = false;
    @track locFilter;
    @track bedroomFilter;
    @track bathroomFilter;
    @track budgetFilter;
    //for Property Details button functionality
    @track propId;
      
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
    @wire(CurrentPageReference) pageRef;
    connectedCallback(){
        registerListener("handleLocFilterChange",this.handleLocFilterChange,this);
        registerListener("handelLocBedRommChange",this.handelLocBedRoomChange,this);
        registerListener("handelBathRoomFilterChange",this.handleBathRoomChange,this);
        registerListener("handelBudgetFilterChange",this.handleBudgetChange,this);
        //The first one is the event name
        //The second one is the callback function that has to be invoked when the event got fired
        //The third one is the payload that has to carried i.e., locchange inside paranthesis
    }
    disconnectedCallback(){
        unregisterAllListeners(this);
    }
    //Here we are writing the handler to listen to the custom event that got fired from propertyFilter
    handleLocFilterChange(locchange){
        this.locFilter = locchange;
        //Now the below method is the imperative call being made to fetch data using apex class
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error=>{
            this.showToast('Error',error.body.message,'error');
        })
    }
    //Here we are writing the handler to listen to the custom event that got fired from propertyFilter
    handelLocBedRoomChange(bedroomChange){
        this.bedroomFilter = bedroomChange;
        //Now the below method is the imperative call being made to fetch data using apex class
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error=>{
            this.showToast('Error',error.body.message,'error');
        })
    }
    //Here we are writing the handler to listen to the custom event that got fired from propertyFilter
    handleBathRoomChange(bathroomChange){
        this.bathroomFilter = bathroomChange;
        //Now the below method is the imperative call being made to fetch data using apex class
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error=>{
            this.showToast('Error',error.body.message,'error');
        })
    }
    //Here we are writing the handler to listen to the custom event that got fired from propertyFilter
    handleBudgetChange(budgetChange){
        this.budgetFilter = budgetChange;
        //Now the below method is the imperative call being made to fetch data using apex class
        getSearchedProperty({
            location: this.locFilter,
            bedroom: this.bedroomFilter,
            bathroom: this.bathroomFilter,
            maxbudget: this.budgetFilter
        })
        .then(result=>{
            this.properties = result;
        })
        .catch(error=>{
            this.showToast('Error',error.body.message,'error');
        })
    }
    /*Whenever you click the PropertyDetails button it will open up a Tabset
    using NavigationMixin which consists of LWC inside Aura Component*/ 
    NavigateToPropDetails(event){
        this.propId = event.target.value;
        console.log('Property ID===>'+this.propId);
        this[NavigationMixin.Navigate]({
                type: 'standard__component',
                attributes: {
                    componentName: 'c__MyProperty360View'
                },
    //If you want to pass any property value then use state attribute 
                state: {
                    c__propertyId: this.propId
                }
        })
    }
}
    