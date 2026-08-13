import { ObjectId } from "mongodb";
import { getCustomerCollection } from "../db.js";
import type { Customer, CustomerInput } from "../types/customer.js";

type CustomerDocument = {
    _id: ObjectId;
    name: string;
    email: string;
    password: string
};

const collection = () => getCustomerCollection();

//  Helper function to convert document to Customer object
function toCustomer(document: CustomerDocument): Customer {
    return {
        id: document._id.toString(),
        name: document.name,
        email: document.email,
        password: document.password
    };
}

export async function createCustomer(customerDetails: CustomerInput): Promise<Omit<Customer, "password">> {
    const result = await collection().insertOne({
        name: customerDetails.name,
        email: customerDetails.email,
        password: customerDetails.password
    });

    return {
        name: customerDetails.name,
        email: customerDetails.email,
        id: result.insertedId.toString(),
    };
}

export async function getCustomers(): Promise<Omit<Customer, "password">[]> {
    const customers = await collection().find<CustomerDocument>({}).toArray();
    return customers.map(toCustomer);
}

export async function findCustomerById(id: string): Promise<Customer | null> {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const customer = await collection().findOne<CustomerDocument>({ _id: new ObjectId(id) });
    return customer ? toCustomer(customer) : null;
}

export async function findCustomerByEmail(email: string): Promise<Customer | null> {
    const customer = await collection().findOne<CustomerDocument>({ email });
    return customer ? toCustomer(customer) : null;
}

export async function updateCustomer(id: string, input: CustomerInput): Promise<Customer | null> {
    if (!ObjectId.isValid(id)) {
        return null;
    }

    const result = await collection().findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: input },
        { returnDocument: "after" }
    );

    const updatedDocument = result as CustomerDocument | null;
    return updatedDocument ? toCustomer(updatedDocument) : null;
}

export async function deleteCustomer(id: string): Promise<boolean> {
    if (!ObjectId.isValid(id)) {
        return false;
    }

    const result = await collection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
}
