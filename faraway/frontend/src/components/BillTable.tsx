import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { BillItem } from "@/types";

interface BillTableProps {
  sortOrder: 'newest' | 'oldest';
  typeFilter: string;
}

const BillTable: React.FC<BillTableProps> = ({ sortOrder, typeFilter }) => {
  const data: BillItem[] = [
    {
      service: "Blood Work Panel",
      date: "May 6, 2025",
      amount: "₱1,599.00",
      status: "Outstanding",
      action: "Pay Now"
    },
    {
      service: "Chest X-Ray",
      date: "Feb 1, 2025",
      amount: "₱2,000.00",
      status: "Paid",
      action: "Completed"
    },
    {
      service: "Annual Physical",
      date: "Jan 20, 2025",
      amount: "₱828.25",
      status: "Processing",
      action: "Completed"
    },
    {
      service: "Flu Vaccine",
      date: "",
      amount: "₱1,200.00",
      status: "Paid",
      action: "Completed"
    },
    {
      service: "Diabetes Test",
      date: "",
      amount: "₱2,500.00",
      status: "Paid",
      action: "Completed"
    },
    {
      service: "OB-GYN Consultation",
      date: "",
      amount: "₱1,000.00",
      status: "Paid",
      action: "Completed"
    },
    {
      service: "Follow-up Appointment",
      date: "",
      amount: "₱1,200.00",
      status: "Paid",
      action: "Completed"
    },
    {
      service: "Allergy Test",
      date: "",
      amount: "₱1,750.00",
      status: "Outstanding",
      action: "Pay"
    },
  ];

  const filteredData = typeFilter === 'all' 
    ? data 
    : data.filter(item => item.service.toLowerCase().includes(typeFilter.toLowerCase()));

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.date || "1970-01-01").getTime();
    const dateB = new Date(b.date || "1970-01-01").getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const statusStyles: Record<string, string> = {
    "Paid": "bg-[#EAFFEEFF] text-[#007E30FF]",
    "Processing": "bg-[#FFFEDDFF] text-[#7C7A00FF]",
    "Outstanding": "bg-[#FFF0F0FF] text-[#FF2C2CFF]",
  };

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-[#DCDCDC]">
        <TableHeader className="border-b border-[#DCDCDC]">
          <TableRow className="bg-[#F6F6F6]">
            <TableHead className="text-[#525252] py-5 text-lg font-extralight">SERVICE</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">DATE</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">AMOUNT</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">STATUS</TableHead>
            <TableHead className="text-right text-[#525252] text-lg font-extralight pr-12">ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index} className="border-[#DCDCDC] hover:bg-gray-50">
              <TableCell className="font-bold text-[#525252]">{item.service}</TableCell>
              <TableCell className="text-[#525252]">{item.date}</TableCell>
              <TableCell className="text-[#525252]">{item.amount}</TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${statusStyles[item.status] || ''}`}
                >
                  {item.status}
                </span>
              </TableCell>
              <TableCell
                className="text-right pr-10 text-[#005F92] font-medium cursor-pointer hover:text-[#00446b]"
              >
                {item.action}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BillTable;
