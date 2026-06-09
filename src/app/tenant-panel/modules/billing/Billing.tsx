"use client";

import { useState } from "react";
import { CreditCard, FileText, Download, Calendar, DollarSign } from "lucide-react";
import { Card, Button } from "@heroui/react";

interface ActionProps {
  onAlert: (msg: string) => void;
}

export default function Billing({ onAlert }: ActionProps) {
  const [invoices, setInvoices] = useState([
    { id: "INV-2026-004", date: "Jun 04, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-003", date: "May 04, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-002", date: "Apr 04, 2026", amount: "$49.00", status: "Paid" },
    { id: "INV-2026-001", date: "Mar 04, 2026", amount: "$19.00", status: "Paid" }
  ]);

  const handleDownload = (invId: string) => {
    onAlert(`Downloading invoice PDF: ${invId}`);
  };

  const handleUpdateCard = () => {
    onAlert("Credit card details editor drawer launched.");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in duration-200">
      {/* Title */}
      <div className="flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-bold text-[#111827] tracking-tight">Billing & Invoices</h2>
          <p className="text-xs text-[#6B7280] mt-0.5">Manage credit card details, billing emails, and download historical invoice receipts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Payment Profile */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <Card className="p-6 border border-[#E5E7EB] bg-white" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-4 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#4F46E5]" />
              Payment Profile
            </h3>

            <div className="bg-gradient-to-tr from-[#1E1B4B] to-[#4F46E5] p-5 rounded-2xl text-white flex flex-col justify-between h-40 shadow-lg relative overflow-hidden select-none mb-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold tracking-wider uppercase opacity-80">Apex Business</span>
                <span className="text-xs font-bold">VISA</span>
              </div>
              <div>
                <span className="text-sm font-semibold tracking-wider font-mono block">••••  ••••  ••••  4820</span>
                <div className="flex justify-between items-baseline mt-4">
                  <div>
                    <span className="text-[7px] font-bold uppercase opacity-60 block">Card Holder</span>
                    <span className="text-[10px] font-bold">John Doe</span>
                  </div>
                  <div>
                    <span className="text-[7px] font-bold uppercase opacity-60 block">Expires</span>
                    <span className="text-[10px] font-bold font-mono">12/29</span>
                  </div>
                </div>
              </div>
            </div>

            <Button
              onPress={handleUpdateCard}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-[#F8FAFC] border border-[#E5E7EB] text-[#4F46E5] text-xs font-bold transition-colors cursor-pointer"
            >
              Update Credit Card
            </Button>
          </Card>
        </div>

        {/* Invoice Receipts */}
        <div className="lg:col-span-8">
          <Card className="p-6 border border-[#E5E7EB] bg-white overflow-visible" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-bold text-[#111827] uppercase tracking-wider mb-6">Receipt History</h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-[#6B7280] font-bold uppercase tracking-wider">
                    <th className="pb-4">Invoice ID</th>
                    <th className="pb-4">Date Billed</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                    <th className="pb-4 text-right">Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="border-b border-[#F3F4F6] hover:bg-[#F8FAFC]">
                      <td className="py-4 font-bold text-[#111827] font-mono flex items-center gap-2">
                        <FileText className="w-4 h-4 text-[#6B7280]" />
                        {inv.id}
                      </td>
                      <td className="py-4 text-[#6B7280] font-mono">{inv.date}</td>
                      <td className="py-4 font-bold text-[#111827]">{inv.amount}</td>
                      <td className="py-4">
                        <span className="px-2.5 py-1 bg-[#ECFDF5] text-[#10B981] rounded-full text-[9px] font-bold uppercase">
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <Button
                          isIconOnly
                          size="sm"
                          onPress={() => handleDownload(inv.id)}
                          className="bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] text-[#4F46E5] rounded-lg min-w-8 w-8 h-8 cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
