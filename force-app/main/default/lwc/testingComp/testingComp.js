import { LightningElement, track } from 'lwc';
import AccountName from '@salesforce/schema/Account.Name';
import AccountIndustry from '@salesforce/schema/Account.Industry';
import AccountWebsite from '@salesforce/schema/Account.Website';
import AccountAnnualRevenue from '@salesforce/schema/Account.AnnualRevenue';

export default class TestingComp extends LightningElement {
    
    @track recordId;  
    
    fieldsArray=[AccountName,AccountIndustry,AccountWebsite,AccountAnnualRevenue];
    onSuccess(event){
        this.recordId = event.detail.id;
    }

}