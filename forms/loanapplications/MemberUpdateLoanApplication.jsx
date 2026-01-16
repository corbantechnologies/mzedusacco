// This will be a modal form inside the loan application details page
// It is used to update the loan application details by the member
// Only available when the loan application is in the Pending stage
// Limited to the fields that can be updated by the member
// The member can only update the requested amount, term months and start date

"use client"

import { Formik, Form, Field } from "formik"
import { updateLoanApplication } from "@/services/loanapplications"
import toast from "react-hot-toast"
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth"
import { useState } from "react"

export function MemberUpdateLoanApplication({ closeModal, reference, loanApplication }) {
    const token = useAxiosAuth()
    const [loading, setLoading] = useState(false)

    return (
        <Formik
            initialValues={{
                requested_amount: loanApplication?.requested_amount || "",
                term_months: loanApplication?.term_months || "",
                start_date: loanApplication?.start_date || "",
            }}
            onSubmit={async (values) => {
                setLoading(true)
                try {
                    await updateLoanApplication(reference, values, token)
                    toast.success("Loan application updated successfully!🎊")
                    closeModal()
                } catch (error) {
                    toast.error("Loan application update failed!❌")
                } finally {
                    setLoading(false)
                }
            }}
        >
            <Form></Form>
        </Formik>
    )
}