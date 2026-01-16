import React from "react";
import { formatCurrency } from "@/lib/utils";

const VentureCard = ({ venture }) => {
    return (
        <div className="flex items-center justify-between p-4 bg-white border rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <div className="space-y-1">
                <p className="text-sm font-medium leading-none text-gray-900">
                    {venture.venture_type}
                </p>
                <p className="text-xs text-muted-foreground font-mono">
                    {venture.account_number}
                </p>
            </div>
            <div className="font-bold text-purple-700">
                {formatCurrency(venture.balance)}
            </div>
        </div>
    );
};

export default VentureCard;
