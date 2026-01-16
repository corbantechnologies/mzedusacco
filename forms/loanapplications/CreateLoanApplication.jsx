"use client"

import { Formik, Form, Field } from "formik"
import { useFetchLoanProducts } from "@/hooks/loanproducts/actions"
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth"
import { useState } from "react"
import { createLoanApplication } from "@/services/loanapplications"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export function CreateLoanApplication({ memberPath }) {
    const { data: loanProducts } = useFetchLoanProducts()
    const token = useAxiosAuth()
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    return (
        <Formik
            initialValues={{
                product: "",
                requested_amount: "",
                term_months: "",
                repayment_frequency: "", // defaults to monthly
                start_date: "",
            }}
            onSubmit={async (values) => {
                setLoading(true)
                try {
                    const response = await createLoanApplication(values, token)
                    toast.success("Loan application created successfully!🎊")
                    router.push(`${memberPath}/loanapplications/${response.data.reference}`)
                } catch (error) {
                    toast.error("Loan application creation failed!❌")
                } finally {
                    setLoading(false)
                }
            }}
        >
            <Form></Form>
        </Formik>
    )
}