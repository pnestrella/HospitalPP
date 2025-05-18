import React from "react";
import LOGO from '../assets/Group 3.png';
import Rx from '../assets/Vector.png';
import useDecodedToken from '../utils/DecodeToken';

interface PrescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  prescription: {
    meds: { name: string; dosage: string; frequency: string; qty: string }[];
    [key: string]: any;
  };
}

const PrescriptionModal: React.FC<PrescriptionModalProps> = ({ isOpen, onClose, prescription }) => {
  if (!isOpen || !prescription) return null;

  const patient = useDecodedToken();

  if (!patient) {
    return <div className="p-10">Loading profile...</div>;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white w-[600px] min-h-[750px] p-15 rounded-lg relative shadow-xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-2xl hover:cursor-pointer">
          &times;
        </button>

        <div className="text-center mb-6">
            <div className="flex flex-col items-center mb-6">
                <img src={LOGO} alt="St. Ignatius Medical Center Logo" className="h-16 mb-2" />
            </div>
          <h3 className="text-lg font-semibold mt-2">{prescription.doctor}</h3>
          <p className=""><i>General Doctor, St. Ignatius Medical Center</i></p>
        </div>

        <div className="flex justify-between text-xs font-semibold border-t border-b py-2 mb-4">
          <div>
            <p className="mb-2">NAGA CITY</p>
            <p className="text-[10px] font-normal"><i>ST. IGNATIUS MEDICAL <br /> CENTER , ATENEO AVENUE,<br /> NAGA CITY, 4400<br /> PHILIPPINES</i></p>
          </div>
          <div>
            <p className="mb-2">CONTACT INFORMATION</p>
            <p className="text-[10px] font-normal"><i>IGNATIUSMEDICALCENTER@GMAIL.COM<br />09123456789<br />(1) 123 456 78</i></p>
          </div>
        </div>

        <div className="flex justify-between text-sm mb-4">
          <p>Name: <span className="border-b border-black ml-2">{patient.name}</span></p>
          <p>Age: <span className="border-b border-black ml-2">{prescription.age}</span></p>
          <p>Sex: <span className="border-b border-black ml-2">{prescription.gender}</span></p>
        </div>

        <img src={Rx} alt="Rx symbol" className="h-10 w-auto mb-2" />
        <div className="mb-4 flex justify-center">
            <div className="grid grid-cols-2 gap-x-12 text-sm">
                {prescription.meds.map((med, i) => (
                <React.Fragment key={i}>
                    <div className="text-right text-[#525252] font-bold">{med.name} - {med.dosage}</div>
                    <div className="text-left text-[#525252] font-bold">{med.frequency} - {med.qty} Pcs</div>
                </React.Fragment>
                ))}
            </div>
        </div>

        <div className="text-right text-sm mt-15">
          <p className="font-semibold">{prescription.doctor}</p>
          <p>LICENSE NO. <strong>123456</strong></p>
          <p>PTR NO. <strong>723344</strong></p>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionModal;
