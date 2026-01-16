// This will be a modal form inside the loan application details page
// It is used to update the loan application details by the admin
// Admin cannot update their own loan application
// Only available when the loan application is in the Ready for Amendment stage
// Limited to the fields that can be updated by the admin
// The admin is required to write an amendment note whether the loan application is changed or not
// The admin can only update the requested amount

"use client"

import { Formik, Form, Field } from "formik"
import { updateLoanApplication } from "@/services/loanapplications"
import toast from "react-hot-toast"
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth"
import { useState } from "react"

export function AdminAmendLoanApplication({ closeModal, reference, loanApplication }) {
    const token = useAxiosAuth()
    const [loading, setLoading] = useState(false)

    return (
        <Formik
            initialValues={{
                requested_amount: loanApplication?.requested_amount || "",
                amendment_note: "", // required whether the loan application is changed or not
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