"use client";

import React, { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import { useFetchLoanApplications } from "@/hooks/loanapplications/actions";
import MemberLoadingSpinner from "@/components/general/MemberLoadingSpinner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { formatCurrency } from "@/lib/utils";

export default function AdminLoanApplications() {
    const { data: loanApplications, isLoading } = useFetchLoanApplications();

    if (isLoading) return <MemberLoadingSpinner />;

    // Handle initial loading or empty states gracefully
    const applications = loanApplications;

    const getStatusColor = (status) => {
        switch (status) {
            case "Approved":
            case "Disbursed":
                return "bg-green-100 text-green-700 hover:bg-green-200";
            case "Rejected":
            case "Declined":
                return "bg-red-100 text-red-700 hover:bg-red-200";
            case "In Progress":
            case "Amended":
                return "bg-blue-100 text-blue-700 hover:bg-blue-200";
            case "Ready for Submission":
            case "Submitted":
                return "bg-purple-100 text-purple-700 hover:bg-purple-200";
            default:
                return "bg-gray-100 text-gray-700 hover:bg-gray-200";
        }
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="mx-auto p-4 sm:p-6 space-y-6">
                <Breadcrumb>
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/sacco-admin/dashboard">Dashboard</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbPage>Loan Applications</BreadcrumbPage>
                    </BreadcrumbList>
                </Breadcrumb>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Loan Applications</h1>
                        <p className="text-muted-foreground mt-1">
                            Review and manage member loan applications
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Applications</CardTitle>
                        <CardDescription>
                            A comprehensive list of all loan applications.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {!applications || applications?.length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed">
                                <p className="text-muted-foreground">No loan applications found.</p>
                            </div>
                        ) : (
                            <div className="rounded-md border">
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-gray-50">
                                            <TableHead>Reference</TableHead>
                                            <TableHead>Product</TableHead>
                                            <TableHead>Requested Amount</TableHead>
                                            <TableHead>Date Applied</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Action</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {applications.map((app) => (
                                            <TableRow key={app.reference}>
                                                <TableCell className="font-mono text-sm">
                                                    {app.reference}
                                                </TableCell>
                                                <TableCell>{app.product}</TableCell>
                                                <TableCell>
                                                    {formatCurrency(app.requested_amount)}
                                                </TableCell>
                                                <TableCell>
                                                    {format(new Date(app.created_at), "MMM dd, yyyy")}
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={`font-normal ${getStatusColor(
                                                            app.status
                                                        )}`}
                                                        variant="secondary"
                                                    >
                                                        {app.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <Button
                                                        asChild
                                                        variant="ghost"
                                                        size="sm"
                                                        className="text-[#045e32] hover:text-[#045e32] hover:bg-green-50"
                                                    >
                                                        <Link href={`/sacco-admin/loan-applications/${app.reference}`}>
                                                            View
                                                        </Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}