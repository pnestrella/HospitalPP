import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import PrescriptionModal from "./PrescripModal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

interface Prescription {
  doctorInformation: string;
  dateOfPrescription: string;
  name: string;
  age: string;
  gender: string;
  inscription: { name: string; dosage: string; frequency: string; qty: string }[];
}

interface PrescripTableProps {
  sortOrder: 'newest' | 'oldest';
}

const PrescripTable: React.FC<PrescripTableProps> = ({ sortOrder }) => {
  const [selectedPrescription, setSelectedPrescription] = useState<Prescription | null>(null);
  const [prescription, setPrescription] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const decoded = jwtDecode<{ email?: string }>(token);
        const email = decoded.email;
        if (!email) {
          setLoading(false);
          return;
        }
        const data = await axios.get('http://localhost:7000/prescription', {
          params: { email }
        });
        setPrescription(data.data.data);
      } catch (err) {
        console.log(err, 'Error fetching prescription data');
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  const sortedData = [...prescription].sort((a, b) => {
    const dateA = new Date(a.dateOfPrescription).getTime();
    const dateB = new Date(b.dateOfPrescription).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  if (loading) {
    return <><h1>Loading....</h1></>;
  }

  if (prescription.length === 0) {
    return <><h1>No prescription to show</h1></>;
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-[#525252] text-xl font-extralight">
              DOCTOR
            </TableHead>
            <TableHead className="text-[#525252] text-xl font-extralight">
              DATE
            </TableHead>
            <TableHead className="text-right text-[#525252] text-xl font-extralight pr-12">
              ACTION
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-bold text-[#525252]">
                {item.doctorInformation}
              </TableCell>
              <TableCell className="text-[#525252]">{item.dateOfPrescription}</TableCell>
              <TableCell
                className="text-right pr-10 text-[#005F92] font-medium cursor-pointer"
                onClick={() => setSelectedPrescription(item)}
              >
                View Details
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal for prescription details */}
      {selectedPrescription && (
        <PrescriptionModal
          isOpen={!!selectedPrescription}
          onClose={() => setSelectedPrescription(null)}
          prescription={{
            ...selectedPrescription,
            meds: selectedPrescription.inscription,
          }}
        />
      )}
    </>
  );
};

export default PrescripTable;
