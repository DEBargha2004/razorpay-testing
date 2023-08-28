import { NextResponse } from "next/server";
import Razorpay from "razorpay";

const razorpay_instance = new Razorpay({
    key_id : process.env.NEXT_PUBLIC_key_id,
    key_secret : process.env.NEXT_PUBLIC_key_secret
})

export async function POST(request){

    const options = {
        currency : 'INR',
        amount : 100,
        receipt : 'receipt_001'
    }

    try {
        const response = await razorpay_instance.orders.create(options)
        return NextResponse.json({
            id : response.id,
            currency : response.currency,
            amount : response.amount
        })
    } catch (error) {
        return NextResponse.json({err : error})
    }

}