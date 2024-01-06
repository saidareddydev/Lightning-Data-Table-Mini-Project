import { LightningElement,wire } from 'lwc';
import getContactForDataTable from '@salesforce/apex/ContactDetailsHandler.getContactForDataTable';

const columns = [
    {   
        label: 'Name', 
        type : "customNameType",
        typeAttributes :{
            ContactName : {
            fieldName : "Name"
        }
    } 
},
    { label: 'Account Name', fieldName: 'accountlink', type:'url',typeAttributes:{
        label :{
            fieldName : "accountName"
        },
        target : "_blank"
    } },
    { label: 'Title', fieldName: 'Title', cellAttributes : {
        class : {
            fieldName : "titlecolor"
        }
    }
},
    { label: 'Rank', 
      fieldName: 'Rank__c', 
      type: 'customRank',
      typeAttributes :{
        rankIcon : {
            fieldName : "rankIcon"
        }
    } 
},
    { label: 'Phone', fieldName: 'Phone', type: 'phone' },
    { label: 'Email', fieldName: 'Email', type: 'email' },
    { label: 'Picture', 
      type: 'customImage', 
      typeAttributes :{
        pictureUrl : {
            fieldName : "Image__c"
        }
    } ,
    cellAttributes :{
        alignment : "center"
    }
}
    
];

export default class CustomStyleDatabaseTable extends LightningElement {
    contacts;
    columns = columns;
    @wire(getContactForDataTable) wirecontacts({data,error}){
        if(data){
            //this.contacts = data;
            this.contacts = data.map((result)=>{
                let accountlink = "/" + result.AccountId;
                let accountName = result.Account.Name;
                let titlecolor = "slds-text-color_success slds-text-heading_small";
                let rankIcon = result.Rank__c > 5 ? "standard:reward" : "";
                return {
                    ...result,
                    accountlink : accountlink,
                    accountName : accountName,
                    titlecolor : titlecolor,
                    rankIcon : rankIcon 

                };
            });
            console.log(data);
        }else{
            console.log(error);
        }
    }
}