import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { MedicalRecord } from "@/types";

interface MedTableProps {
  sortOrder: 'newest' | 'oldest';
  typeFilter: string;
}

const MedicalTable: React.FC<MedTableProps> = ({ sortOrder, typeFilter }) => {
  const [patient, setPatient] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);

  // Safely decode token and extract email
  let email = '';
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode<JwtPayload & { email?: string }>(token);
      if (decoded && typeof decoded === 'object' && decoded.email) {
        email = decoded.email;
      }
    } catch (err) {
      // ignore
    }
  }

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const data = await axios.get('http://localhost:7000/patientData', {
          params: { email }
        });
        setPatient(data.data.data);
      } catch (err) {
        console.log('Cannot fetch Patient Data', err);
      } finally {
        setLoading(false);
      }
    };
    if (email) fetchData();
    else setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email]);

  const typeMap: Record<string, string> = {
    lab: "Lab Results",
    visitnotes: "Visit Notes",
    imaging: "Imaging",
    specialist: "Specialist",
    Vaccination: "Vaccination"
  };

  const filteredData = typeFilter === "all"
    ? patient
    : patient.filter((item) => {
        const mappedType = typeMap[typeFilter];
        return item.type === mappedType;
      });

  const sortedData = [...filteredData].sort((a, b) => {
    const dateA = new Date(a.dateAdmitted || "1970-01-01").getTime();
    const dateB = new Date(b.dateAdmitted || "1970-01-01").getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return <><h1>Loading...</h1></>;
  }

  return (
    <div className="overflow-x-auto">
      <Table className="w-full border border-[#DCDCDC]">
        <TableHeader className="border-b border-[#DCDCDC]">
          <TableRow className="bg-[#F6F6F6]">
            <TableHead className="text-[#525252] py-5 text-lg font-extralight">ADMISSION ID</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">CONDITION</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">DATE</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">STATUS</TableHead>
            <TableHead className="text-[#525252] text-lg font-extralight">PRESCRIPTION DATE</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index} className="border-[#DCDCDC] hover:bg-gray-50">
              <TableCell className="font-bold text-[#525252]">
                {item.patientId}
              </TableCell>
              <TableCell className="font-bold text-[#525252]">
                {item.condition}
              </TableCell>
              <TableCell className="text-[#525252]">
                {new Date(item.dateAdmitted).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${item.status === "Completed"
                    ? "bg-[#D2E6EE] text-[#39614B]"
                    : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status === "Completed" ? "Completed" : "Not Complete"}
                </span>
              </TableCell>
              <TableCell className="text-[#525252]">
                {item.prescriptionDate}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MedicalTable;