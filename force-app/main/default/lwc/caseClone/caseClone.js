import {LightningElement, wire} from 'lwc';
import {CurrentPageReference} from 'lightning/navigation';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {NavigationMixin} from 'lightning/navigation';
import COLLECT_OPPO_INFO from '@salesforce/apex/CloneCase.collectCaseDetails';

const fieldsToIgnoreList = ['StageName', 'CloseDate', 'Amount'];
export default class OpportunityCustomClone extends NavigationMixin(LightningElement){
    recordId;
    @wire(CurrentPageReference)
    getStateParameters(currentPageReference){
        if(currentPageReference){
            this.recordId = currentPageReference.state.recordId;
        }
    }
    connectedCallback(){
        COLLECT_OPPO_INFO({oppId : this.recordId}).then(record => {
            let defaultValues = 'AccountId='+record.AccountId+','+Object.keys(record).filter(e => !fieldsToIgnoreList.includes(e) && !e.startsWith('SBQQ__')).map(elem => elem+'='+record[elem]).toString()
            this[NavigationMixin.Navigate]({
                type : 'standard__objectPage',
                attributes : {
                    objectApiName : 'Opportunity',
                    actionName : 'new'
                },
                state : {
                    useRecordTypeCheck : '1',
                    nooverride : '1',
                    defaultFieldValues : defaultValues
                }
            })
        }).catch(error => this.displaytoast('error', error.message? (Array.isArray(error.message) ? error.message[0] :  error.message) : error.body.message));
    }
    displaytoast = (type, message) => {
        this.dispatchEvent(new ShowToastEvent({variant : type, title : type.toUpperCase(), message : message})); 
    } 
}