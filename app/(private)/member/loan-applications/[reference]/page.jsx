"use client";

import React, { use, useMemo } from "react";
import { format } from "date-fns";
import { useFetchLoanApplicationDetail } from "@/hooks/loanapplications/actions";
import MemberLoadingSpinner from "@/components/general/MemberLoadingSpinner";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { AlertCircle, CheckCircle2, FileText } from "lucide-react";

export default function LoanApplicationDetail({ params }) {
    const { reference } = use(params)
    const { data: application, isLoading } = useFetchLoanApplicationDetail(
        reference
    );

    const schedule = useMemo(() => {
        return application?.projection?.schedule || [];
    }, [application]);

    if (isLoading) return <MemberLoadingSpinner />;
    if (!application) return <div className="p-8 text-center text-muted-foreground">Application not found.</div>;

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
            case "Disbursed":
                return "bg-green-100 text-green-700 hover:bg-green-200 border-green-200";
            case "Rejected":
            case "Declined":
                return "bg-red-100 text-red-700 hover:bg-red-200 border-red-200";
            case "In Progress":
                return "bg-blue-100 text-blue-700 hover:bg-blue-200 border-blue-200";
            case "Amended":
                return "bg-amber-100 text-amber-700 hover:bg-amber-200 border-amber-200";
            case "Ready for Submission":
                return "bg-purple-100 text-purple-700 hover:bg-purple-200 border-purple-200";
            default:
                return "bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="mx-auto p-4 sm:p-6 space-y-6">
                {/* Breadcrumb */}
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/member/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/member/loan-applications">
                                Loan Applications
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>{application.reference}</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold text-gray-900">
                                {application.product} Application
                            </h1>
                            <Badge className={getStatusColor(application.status)} variant="outline">
                                {application.status}
                            </Badge>
                        </div>
                        <p className="text-muted-foreground font-mono mt-1">
                            Ref: {application.reference}
                        </p>
                    </div>

                    {/* Action Buttons based on Status would go here (e.g. Accept Amendment) */}
                    {/* Placeholder for future actions */}
                    <div className="flex gap-2">
                        {application.status === 'Amended' && (
                            <>
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                                <Button className="bg-[#045e32] hover:bg-[#034625]">Accept Amendment</Button>
                            </>
                        )}
                        {application.can_submit && (
                            <Button className="bg-[#045e32] hover:bg-[#034625]">Submit Application</Button>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content - Left Column */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Financial Overview */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-[#045e32]">Application Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div>
                                    <p className="text-sm text-muted-foreground">Requested Amount</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {formatCurrency(application.requested_amount)}
                                    </p>
                                </div>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Repayment Frequency:</span>
                                        <span className="font-medium capitalize">{application.repayment_frequency}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Term:</span>
                                        <span className="font-medium">{application.term_months} Months</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Target Start Date:</span>
                                        <span className="font-medium">{application.start_date}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="bg-gray-50/50 border-t p-4">
                                <div className="w-full flex justify-between items-center text-sm">
                                    <span className="text-muted-foreground">Projected Total Interest:</span>
                                    <span className="font-semibold text-gray-900">{formatCurrency(application.total_interest)}</span>
                                </div>
                            </CardFooter>
                        </Card>

                        {/* Repayment Schedule Projection */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Projected Repayment Schedule</CardTitle>
                                <CardDescription>Estimated breakdown of your payments</CardDescription>
                            </CardHeader>
                            <CardContent className="p-0 sm:p-6">
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow className="bg-gray-50/50">
                                                <TableHead>Due Date</TableHead>
                                                <TableHead>Principal</TableHead>
                                                <TableHead>Interest</TableHead>
                                                <TableHead>Total Due</TableHead>
                                                <TableHead className="text-right">Balance</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {schedule.map((row, i) => (
                                                <TableRow key={i}>
                                                    <TableCell className="font-medium whitespace-nowrap">{format(new Date(row.due_date), "MMM dd, yyyy")}</TableCell>
                                                    <TableCell>{formatCurrency(row.principal_due)}</TableCell>
                                                    <TableCell>{formatCurrency(row.interest_due)}</TableCell>
                                                    <TableCell className="font-semibold text-[#045e32]">{formatCurrency(row.total_due)}</TableCell>
                                                    <TableCell className="text-right text-muted-foreground">{formatCurrency(row.balance_after)}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar - Right Column */}
                    <div className="space-y-6">
                        {/* Guarantee Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <CheckCircle2 className="h-5 w-5 text-[#045e32]" />
                                    Coverage Status
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Required Coverage</span>
                                        <span className="font-medium">{formatCurrency(application.requested_amount)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-sm">
                                        <span>Self Guaranteed</span>
                                        <span className="font-medium text-green-700">{formatCurrency(application.self_guaranteed_amount)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Guarantors</span>
                                        <span className="font-medium text-blue-700">{formatCurrency(application.total_guaranteed_by_others)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm font-semibold pt-2 border-t">
                                        <span>Total Coverage</span>
                                        <span>{formatCurrency(application.effective_coverage)}</span>
                                    </div>
                                </div>

                                {application.is_fully_covered ? (
                                    <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700 flex items-start gap-2">
                                        <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0" />
                                        Loan is fully covered and ready for review.
                                    </div>
                                ) : (
                                    <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-700 flex items-start gap-2">
                                        <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
                                        Remaining coverage needed: {formatCurrency(application.remaining_to_cover)}
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Additional Info */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center gap-2">
                                    <FileText className="h-5 w-5 text-gray-500" />
                                    Notes
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-600 italic">
                                    {application.amendment_note || "No additional notes."}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}