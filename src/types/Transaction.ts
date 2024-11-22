// src/types/Transaction.ts
//
// The 'Transaction' interface specifies the properties of object will have.
// Each property in the interface explained below

interface Transaction {
  /** 
   * Unique identifier for the Transaction
   * Example: "FT54105"
   * This ID will be used to uniquely identity each Transaction
   * It is typically string that can hold any various format based on the requirement
  **/
  id: string;

  /** 
   * Amount of money in the Transaction
   * Example: 439863
   * This field represent the total money transfered in the transaction
   * It can be used for filter transaction based on the amount
  **/
  amount: number;

  /**
   * Unique code that associated with transaction
   * Example: 524
   * This field is used for any internal purpose that may be needed to further distinguish the transction
  **/
  unique_code: number;

  /**
   * The status of transaction
   * Example: "SUCCESS"
   * This indicate status of the transaction wether it has been completed successfully or if it encountered any errors
   * Other possible value might include: "PENDING"
  **/
  status: string;

  /**
   * The name of the bank that initiated the transaction
   * Example: "bni"
   * This field hold the name of sender bank
   * It can be used for filter transaction based on the sender bank name
  **/ 
  sender_bank: string;

  /**
   * The account number of the entity or person receiving the money
   * Example: "8949351401"
   * This field identifies the recipient of the transaction
  **/
  account_number: string;

  /**
   * The name of the entity or person receiving the money
   * Example: "Jake Castillo"
   * This field identifies the recipient of the transaction
   * It can be used for filter transaction based on the recipient name
  **/
  beneficiary_name: string;

  /**
   * The name of the bank receiving the money
   * Example: "bri"
   * This field indicates the receipient bank
   * It can be used for filter transaction based on beneficiary_bank
  **/
  beneficiary_bank: string;

  /**
   * Additional remark that related to the transaction
   * Example: "sample remark"
   * This field hold value for any notes or comment about the transaction
  **/
  remark: string;

  /**
   * Timestamp indicating when transaction was created
   * Example: "2024-11-20 22:53:15"
   * This field records when the transaction was initially created
   * It can be used for filter transaction based on date
  **/
  created_at: string;

  /**
   * Timestamp indicating when transaction was completed
   * Example: "2024-11-20 22:53:15"
   * This field records when the transaction was completed
   * Other possible value might include: "0" when transaction is still on pending
  **/
  completed_at: string;

  /**
   * Any fee associated with the transaction 
   * Example: 0
   * This field represent fee of the transaction 
   * It is typically a number and can be zero if no fee is involved
  **/
 fee: number;
}

// `Transactions` is a type that represents a collection of transactions. Since in the json response each transaction is unique, 
// we will use a dictionary (or "record") to map each transaction's unique ID to its corresponding `Transaction` object.
export type Transactions = Record<string, Transaction>;
