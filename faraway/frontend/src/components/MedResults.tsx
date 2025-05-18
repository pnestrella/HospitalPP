import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
} from "@/components/ui/table";
import { ArrowLeft } from "lucide-react";

interface PatientDataType {
  title?: string;
  date?: string;
  id?: string;
  doctor?: string;
  dep?: string;
  type?: string;
  status?: string;
  Summary?: string;
  DocNotes?: string;
  // add more fields as needed
}

interface MedResultsProps {
  onBack: () => void;
  PatientData: PatientDataType;
}

const MedResults: React.FC<MedResultsProps> = ({ onBack, PatientData }) => {
  return (
    <div>
        {/* HEADER PART */}
        <div className="p-10 border-b border-[#9E9E9E]">
            <div className="flex flex-col">
                <div className="gap-10">
                    <p
                className="flex gap-2 cursor-pointer items-center text-[#005F92] text-2xl mb-10"
                onClick={onBack}
                    >
                        <ArrowLeft className="text-2xl"/> Back to Medical Records
                    </p>
                    <h1 className="text-[28px] font-medium">{PatientData.title} Results</h1>
                    <p className="text-[16px] text-[#525252]">{PatientData.date ? PatientData.date : "N/A"} | {PatientData.id ? PatientData.id : "N/A"}</p>
                </div> 
            </div>
        </div>

        {/* deets */}
        <div className="px-10 py-3 border-b border-[#9E9E9E]">
            <div className="grid grid-cols-2 gap-y-6">
                {/* Doctor */}
                <div className="flex flex-col">
                <span className="text-[#525252] text-[16px]">Doctor</span>
                <p className="text-[18px]">{PatientData.doctor || "Dr. Patricia Estrella"}</p>
                </div>

                {/* Department */}
                <div className="flex flex-col">
                <span className="text-[#525252] text-[16px]">Department</span>
                <p className="text-[18px]">{PatientData.dep || "Laboratory Services"}</p>
                </div>

                {/* Type */}
                <div className="flex flex-col">
                <span className="text-[#525252] text-[16px]">Type</span>
                <p className="text-[18px]">{PatientData.type || "N/A"}</p>
                </div>

                {/* Status */}
                <div className="flex flex-col">
                    <span className="text-[#525252] text-[16px]">Status</span>
                    <p className={`text-[18px] font-medium ${
                        PatientData.status === "Completed"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}>
                        {PatientData.status === "Completed" ? "Completed" : "Not Complete"}
                    </p>
                </div>
            </div>
        </div>

        {/* SUMMARY */}
        <div className="px-10 py-3 border-b border-[#9E9E9E]">
            <span className="text-[18px]">Summary</span>
            <p className="text-[#525252] text-[16px]">{PatientData.Summary || "Complete blood count, lipid panel, and metabolic panel results."}</p>
        </div>

        {/* TEST RESULTS */}
        <div className="px-10 py-3">
            <span className="text-[18px]">Test Results</span>
            <Table className="border border-[#DCDCDC] mt-5">
                <TableHeader className="bg-[#F6F6F6]">
                    <TableRow>
                        <TableHead className="text-[#525252] text-[14px] font-extralight">
                          TEST
                        </TableHead>
                        <TableHead className="text-[#525252] text-[14px] font-extralight">
                          RESULT
                        </TableHead>
                        <TableHead className="text-[#525252] text-[14px] font-extralight pr-12">
                          NORMAL RANGE
                        </TableHead>
                        <TableHead className="text-[#525252] text-[14px] font-extralight pr-12">
                          STATUS
                        </TableHead>
                      </TableRow>
                </TableHeader>
   
            </Table>
            <div className="mt-5">
                <span className="text-[18px]">Doctor's Notes</span>
                <p className="text-[#525252]">{PatientData.DocNotes || "All values within normal range except slightly elevated cholesterol (215 mg/dL). Recommendation for dietary changes and follow-up in 3 months."}</p>
            </div>
        </div>
    </div>
    
  );
};

export default MedResults;
